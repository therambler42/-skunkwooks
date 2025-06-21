// Inventory Management Module - Clean and Optimized
import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { inventoryService } from '../services/inventoryService';
import { useAuth } from '../hooks/useAuth';
import InventoryTable from '../components/InventoryTable';
import InventoryForm from '../components/InventoryForm';
import StockAlert from '../components/StockAlert';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchInput from '../components/common/SearchInput';
import FilterDropdown from '../components/common/FilterDropdown';
import { toast } from '../utils/toast';
import { formatCurrency } from '../utils/formatters';

const InventoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Fetch inventory items
  const {
    data: inventoryData,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['inventory', currentPage, pageSize, searchTerm, categoryFilter, stockFilter],
    () => inventoryService.getInventoryItems({
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
      stockStatus: stockFilter !== 'all' ? stockFilter : undefined
    }),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  // Fetch categories for filter
  const { data: categories } = useQuery(
    ['inventory-categories'],
    inventoryService.getCategories,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Create item mutation
  const createItemMutation = useMutation(inventoryService.createItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      setIsModalOpen(false);
      setSelectedItem(null);
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create item');
    }
  });

  // Update item mutation
  const updateItemMutation = useMutation(inventoryService.updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      setIsModalOpen(false);
      setSelectedItem(null);
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update item');
    }
  });

  // Delete item mutation
  const deleteItemMutation = useMutation(inventoryService.deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete item');
    }
  });

  // Update stock mutation
  const updateStockMutation = useMutation(inventoryService.updateStock, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      toast.success('Stock updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update stock');
    }
  });

  // Handlers
  const handleCreateItem = useCallback(() => {
    setSelectedItem(null);
    setIsModalOpen(true);
  }, []);

  const handleEditItem = useCallback((item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleDeleteItem = useCallback(async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItemMutation.mutate(itemId);
    }
  }, [deleteItemMutation]);

  const handleSubmitItem = useCallback((itemData) => {
    if (selectedItem) {
      updateItemMutation.mutate({ id: selectedItem.id, ...itemData });
    } else {
      createItemMutation.mutate(itemData);
    }
  }, [selectedItem, updateItemMutation, createItemMutation]);

  const handleStockUpdate = useCallback((itemId, newQuantity, reason) => {
    updateStockMutation.mutate({ itemId, quantity: newQuantity, reason });
  }, [updateStockMutation]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  const handleStockFilterChange = useCallback((value) => {
    setStockFilter(value);
    setCurrentPage(1);
  }, []);

  // Computed values
  const lowStockItems = useMemo(() => {
    return inventoryData?.items?.filter(item => 
      item.quantity <= item.reorderLevel
    ) || [];
  }, [inventoryData?.items]);

  const totalValue = useMemo(() => {
    return inventoryData?.items?.reduce((total, item) => 
      total + (item.quantity * item.unitPrice), 0
    ) || 0;
  }, [inventoryData?.items]);

  // Check permissions
  const canCreateItem = currentUser?.permissions?.includes('inventory:create');
  const canEditItem = currentUser?.permissions?.includes('inventory:edit');
  const canDeleteItem = currentUser?.permissions?.includes('inventory:delete');
  const canUpdateStock = currentUser?.permissions?.includes('inventory:stock');

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Inventory</h2>
        <p>{error.message}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="inventory-management">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <div className="inventory-stats">
          <div className="stat-card">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">{inventoryData?.totalItems || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Value</span>
            <span className="stat-value">{formatCurrency(totalValue)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Low Stock</span>
            <span className="stat-value warning">{lowStockItems.length}</span>
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <StockAlert items={lowStockItems} />
      )}

      <div className="inventory-controls">
        <div className="filters">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search items..."
          />
          <FilterDropdown
            value={categoryFilter}
            onChange={handleCategoryChange}
            options={[
              { value: 'all', label: 'All Categories' },
              ...(categories?.map(cat => ({ value: cat.id, label: cat.name })) || [])
            ]}
          />
          <FilterDropdown
            value={stockFilter}
            onChange={handleStockFilterChange}
            options={[
              { value: 'all', label: 'All Stock Levels' },
              { value: 'in-stock', label: 'In Stock' },
              { value: 'low-stock', label: 'Low Stock' },
              { value: 'out-of-stock', label: 'Out of Stock' }
            ]}
          />
        </div>
        {canCreateItem && (
          <Button
            variant="primary"
            onClick={handleCreateItem}
            disabled={createItemMutation.isLoading}
          >
            Add Item
          </Button>
        )}
      </div>

      <InventoryTable
        items={inventoryData?.items || []}
        isLoading={isLoading}
        onEdit={canEditItem ? handleEditItem : null}
        onDelete={canDeleteItem ? handleDeleteItem : null}
        onStockUpdate={canUpdateStock ? handleStockUpdate : null}
        currentPage={currentPage}
        totalPages={inventoryData?.totalPages || 1}
        onPageChange={setCurrentPage}
        isDeleting={deleteItemMutation.isLoading}
        isUpdatingStock={updateStockMutation.isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        title={selectedItem ? 'Edit Item' : 'Add Item'}
        size="large"
      >
        <InventoryForm
          item={selectedItem}
          categories={categories || []}
          onSubmit={handleSubmitItem}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          isLoading={createItemMutation.isLoading || updateItemMutation.isLoading}
        />
      </Modal>
    </div>
  );
};

export default InventoryManagement;

