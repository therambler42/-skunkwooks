# ERP Frontend

A modern React-based Enterprise Resource Planning (ERP) system frontend built with Vite, React Router, and Tailwind CSS.

## Features

- **Dashboard**: Overview of key business metrics and recent activities
- **Inventory Management**: Track and manage product inventory
- **Sales Management**: Handle sales orders and customer transactions
- **Purchase Management**: Manage purchase orders and supplier relationships
- **Customer Management**: Maintain customer information and relationships
- **Supplier Management**: Track supplier details and communications
- **Reports & Analytics**: Generate business reports and insights
- **Settings**: Configure system preferences and user settings

## Technology Stack

- **React 19**: Modern React with hooks and functional components
- **React Router**: Client-side routing for single-page application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn/UI**: High-quality, accessible UI components
- **Lucide React**: Beautiful, customizable icons
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── Header.jsx      # Application header
│   └── Sidebar.jsx     # Navigation sidebar
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Inventory.jsx   # Inventory management
│   ├── Sales.jsx       # Sales management
│   ├── Purchases.jsx   # Purchase management
│   ├── Customers.jsx   # Customer management
│   ├── Suppliers.jsx   # Supplier management
│   ├── Reports.jsx     # Reports and analytics
│   └── Settings.jsx    # System settings
├── App.jsx             # Main application component
├── index.js            # Application entry point
├── App.css             # Global styles
└── index.css           # Base styles
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
```

The built files will be in the `dist/` directory.

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## Features Overview

### Responsive Design
The application is fully responsive and works on desktop, tablet, and mobile devices.

### Modern UI Components
Built with Shadcn/UI components that provide:
- Consistent design system
- Accessibility features
- Dark/light mode support
- Professional appearance

### Navigation
- Collapsible sidebar navigation
- Mobile-friendly hamburger menu
- Active route highlighting
- Breadcrumb navigation

### Data Management
- Mock data for demonstration
- Table views with sorting and filtering
- CRUD operation interfaces
- Status indicators and badges

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in `App.css`
- Component styles in individual files
- Global styles in `index.css`

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `App.jsx`
3. Add navigation item to `Sidebar.jsx`

### Adding New Components
1. Create component in `src/components/`
2. Import and use in relevant pages
3. Follow existing patterns for consistency

## License

This project is licensed under the MIT License.

