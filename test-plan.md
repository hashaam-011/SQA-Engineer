# TaskMaster Pro - Test Plan Documentation

## 📋 Overview

This document outlines the comprehensive testing strategy for TaskMaster Pro, a full-stack task management application. The testing approach covers both UI automation and API testing to ensure complete functionality and reliability.

## 🎯 What is Being Tested

### **UI Testing (Frontend)**
- **Login Functionality**
  - Login page element display
  - Successful authentication with valid credentials
  - Error handling for invalid credentials
  - Loading states during authentication

- **Dashboard CRUD Operations**
  - Todo creation and validation
  - Todo editing and cancellation
  - Todo deletion with proper state management
  - Todo completion status toggling
  - Statistics updates and calculations
  - Empty state handling

- **User Interface Features**
  - Dark/Light theme toggle
  - Logout functionality
  - Responsive design (mobile viewport)
  - Message notifications and error handling

### **API Testing (Backend)**
- **Authentication Endpoints**
  - POST /api/login - Valid and invalid credential scenarios
  - Error handling for missing/malformed requests

- **Todo CRUD Endpoints**
  - GET /api/items - Retrieve all todos
  - POST /api/items - Create new todos (positive/negative cases)
  - PUT /api/items/:id - Update existing todos
  - DELETE /api/items/:id - Delete todos

- **Health Check Endpoints**
  - GET / - Server status verification
  - GET /api/test - API functionality verification

## 📊 Test Coverage

### **UI Test Coverage (Cypress)**
- **15 Active Test Cases** covering complete user workflows
- **Login Flow**: 4 test scenarios
- **Dashboard Operations**: 9 test scenarios
- **UI Features**: 2 test scenarios
- **Cross-browser compatibility** with Electron/Chrome
- **Responsive design** testing on multiple viewports

### **API Test Coverage (Jest + Supertest)**
- **21 Test Cases** with 88.46% code coverage
- **Authentication**: 5 test scenarios (positive/negative)
- **CRUD Operations**: 12 test scenarios
- **Error Handling**: 2 test scenarios
- **Data Integrity**: 2 test scenarios

## 🛠️ Testing Tools

### **UI Automation**
- **Cypress v14.5.3** - End-to-end testing framework
- **Test Runner**: Electron browser (headless mode)
- **Assertions**: Cypress built-in assertions
- **Custom Commands**: Login, CRUD operations helpers

### **API Testing**
- **Jest v29.7.0** - Testing framework
- **Supertest v7.1.4** - HTTP assertion library
- **Coverage Reporting**: LCOV, HTML reports
- **Test Environment**: Node.js

## 🚀 How to Run Tests

### **Prerequisites**
```bash
# Install dependencies
cd server && npm install
cd client && npm install
```

### **Start Application Servers**
```bash
# Terminal 1: Start backend server
cd server
npm start
# Server runs on http://localhost:5000

# Terminal 2: Start frontend server
cd client
npm start
# Client runs on http://localhost:3000
```

### **Run UI Tests (Cypress)**

**Interactive Mode (Recommended for Development):**
```bash
cd client
npx cypress open
```

**Headless Mode (CI/CD):**
```bash
cd client
npx cypress run --spec cypress/e2e/ui-tests.spec.js
```

**Alternative Command:**
```bash
cd client
npm run test:e2e
```

### **Run API Tests (Jest + Supertest)**

**Full Test Suite:**
```bash
cd server
npm test
```

**Watch Mode:**
```bash
cd server
npm run test:watch
```

**Alternative API Tests:**
```bash
cd server
node api-tests.js
```

## 📁 Test File Structure

```
qaengineer/
├── client/
│   ├── cypress/
│   │   ├── e2e/
│   │   │   └── ui-tests.spec.js      # Main UI test suite
│   │   ├── support/
│   │   │   ├── commands.js           # Custom Cypress commands
│   │   │   └── e2e.js               # Test configuration
│   │   └── cypress.config.js         # Cypress configuration
│   └── package.json
├── server/
│   ├── __tests__/
│   │   └── api.test.js              # Jest API test suite
│   ├── api-tests.js                 # Alternative API tests
│   ├── jest.config.js               # Jest configuration
│   └── package.json
├── TESTING.md                       # Detailed testing guide
└── test-plan.md                     # This document
```

## 🎯 Test Scenarios

### **Critical User Journeys**
1. **Complete Login Flow** - Authentication from login to dashboard
2. **Todo Management Lifecycle** - Create, edit, complete, delete todos
3. **Error Handling** - Invalid inputs and network failures
4. **UI Responsiveness** - Cross-device compatibility
5. **Data Persistence** - State management and API synchronization

### **Edge Cases Covered**
- Empty todo creation attempts
- Invalid authentication credentials
- Non-existent resource operations (404 scenarios)
- Malformed API requests
- Concurrent user operations
- Network timeout handling

## 🏗️ Test Environment Setup

### **Local Development Environment**
- **Node.js**: v18+ required
- **Browser**: Chrome/Electron for Cypress tests
- **Ports**:
  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000
  - Test Server: http://localhost:5001

### **Test Data Management**
- **In-memory storage** for consistent test runs
- **Dynamic test data** using timestamps for uniqueness
- **Automatic cleanup** between test runs
- **Isolated test environment** to prevent cross-test interference

## 📋 Assumptions and Dependencies

### **Environment Assumptions**
- ✅ **Localhost setup** with standard HTTP ports available
- ✅ **Node.js environment** with npm package manager
- ✅ **Modern browser** support (Chrome, Firefox, Safari)
- ✅ **Network connectivity** for package installation

### **Functional Assumptions**
- ✅ **Basic CRUD functionality** working as designed
- ✅ **RESTful API** following standard HTTP conventions
- ✅ **React frontend** with standard component lifecycle
- ✅ **Express backend** with middleware support

### **Test Dependencies**
- Backend server must be running for UI tests
- Frontend application must be accessible for end-to-end tests
- API endpoints must be responsive within timeout limits
- Test data should not persist between test runs

## 📊 Success Criteria

### **Acceptance Criteria**
- ✅ **All UI tests pass** (15/15 test cases)
- ✅ **All API tests pass** (21/21 test cases)
- ✅ **Code coverage** ≥ 85% for critical paths
- ✅ **No critical bugs** in core functionality
- ✅ **Performance targets** met (< 2min for full UI suite)

### **Quality Gates**
- Zero failing tests in CI/CD pipeline
- All error scenarios properly handled
- Cross-browser compatibility verified
- Responsive design validated
- Security best practices followed

## 🔧 Maintenance and Updates

### **Regular Maintenance Tasks**
- Update test data when application changes
- Review and update test scenarios for new features
- Maintain test environment dependencies
- Monitor test execution performance
- Update documentation for new team members

### **Test Evolution**
- Add new test cases for feature additions
- Refactor tests for improved maintainability
- Implement additional browser support as needed
- Enhance error reporting and debugging capabilities

---

## 📞 Support and Documentation

For detailed testing instructions and troubleshooting, refer to:
- **TESTING.md** - Comprehensive testing guide
- **Cypress Dashboard** - Visual test results and debugging
- **Jest Coverage Reports** - Located in `server/coverage/`

**Last Updated**: January 2025
**Version**: 1.0
**Maintained by**: QA Engineering Team