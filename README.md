# HCSS Admin Dashboard

A Next.js application that enables Healthcare Systems Solution administrators to bulk upload products via CSV or Excel files and manage product details through an intuitive dashboard interface.

## Features

### Bulk Product Upload
- **File Upload**: Support for both `.csv` and `.xlsx` file formats
- **Data Preview**: Parse and display uploaded data for review before submission
- **Validation**: Comprehensive validation for required fields and data formats
- **Error Handling**: Clear error messages for invalid data

### Product Management
- **Data Table**: Responsive, sortable table of all products
- **Editing**: Modal-based editing interface for product details
- **Form Validation**: Input validation for all editable fields
- **Real-time Updates**: Immediate UI updates after successful edits

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: Informative feedback for user actions
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form for form validation and submission
- **Data Parsing**: XLSX and PapaParse for file parsing
- **State Management**: React Hooks
- **API Mocking**: Local storage-based API simulation

## Setup Instructions

1. Clone the repository:
```bash
git clone [your-repo-url]
cd hcss-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## Project Structure

```
/src
  /pages                 # Pages Router entry points
    /index.tsx           # Main dashboard page
    /_app.tsx            # Root app setup with providers
    /_document.tsx       # Custom document
  /components            # Reusable UI components
    /BulkUpload.tsx      # File upload and parsing component
    /ProductTable.tsx    # Product listing and editing component
    /ui/Toaster.tsx      # Toast notification system
  /lib                   # Utility functions and types
    /api.ts              # API service functions
    /types.ts            # TypeScript interfaces
  /mocks                 # API mocking functionality
    /handlers.ts         # Mock API endpoints
    /browser.ts          # Browser mock setup
```

## Testing

The application includes comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Development Approach

This application was developed with a focus on:

1. **User Experience**: Intuitive interface with clear feedback
2. **Code Quality**: Clean, modular code with TypeScript for type safety
3. **Performance**: Efficient rendering and API communication
4. **Maintainability**: Well-organized project structure and comprehensive documentation

## Areas for Future Enhancement

- User authentication and role-based access control
- Advanced filtering and sorting options for the product table
- Bulk export functionality
- Integration with real backend services
- Product category management
- Batch operations for product updates