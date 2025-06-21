// User Management Module - Clean and Optimized
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { userService } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchInput from '../components/common/SearchInput';
import { toast } from '../utils/toast';

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Fetch users with pagination and search
  const {
    data: usersData,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['users', currentPage, pageSize, searchTerm],
    () => userService.getUsers({
      page: currentPage,
      limit: pageSize,
      search: searchTerm
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Create user mutation
  const createUserMutation = useMutation(userService.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsModalOpen(false);
      setSelectedUser(null);
      toast.success('User created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user');
    }
  });

  // Update user mutation
  const updateUserMutation = useMutation(userService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setIsModalOpen(false);
      setSelectedUser(null);
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user');
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation(userService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user');
    }
  });

  // Handlers
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleSubmitUser = (userData) => {
    if (selectedUser) {
      updateUserMutation.mutate({ id: selectedUser.id, ...userData });
    } else {
      createUserMutation.mutate(userData);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Check permissions
  const canCreateUser = currentUser?.permissions?.includes('user:create');
  const canEditUser = currentUser?.permissions?.includes('user:edit');
  const canDeleteUser = currentUser?.permissions?.includes('user:delete');

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Users</h2>
        <p>{error.message}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users..."
          />
          {canCreateUser && (
            <Button
              variant="primary"
              onClick={handleCreateUser}
              disabled={createUserMutation.isLoading}
            >
              Add User
            </Button>
          )}
        </div>
      </div>

      <UserTable
        users={usersData?.users || []}
        isLoading={isLoading}
        onEdit={canEditUser ? handleEditUser : null}
        onDelete={canDeleteUser ? handleDeleteUser : null}
        currentPage={currentPage}
        totalPages={usersData?.totalPages || 1}
        onPageChange={setCurrentPage}
        isDeleting={deleteUserMutation.isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Create User'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmitUser}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          isLoading={createUserMutation.isLoading || updateUserMutation.isLoading}
        />
      </Modal>
    </div>
  );
};

export default UserManagement;

