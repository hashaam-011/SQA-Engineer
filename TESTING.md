# TaskMaster Pro - Testing Guide

This document provides comprehensive instructions for running both UI Automation (Cypress) and API Automation (Supertest/Jest) tests for the TaskMaster Pro application.

## 🏗️ Project Structure

```
qaengineer/
├── client/                    # React Frontend
│   ├── cypress/              # Cypress UI Tests
│   │   ├── e2e/
│   │   │   └── ui-tests.spec.js
│   │   └── cypress.config.js
│   └── package.json
├── server/                   # Express Backend
│   ├── __tests__/
│   │   └── api.test.js      # Jest API Tests
│   ├── api-tests.js         # Alternative API tests
│   ├── jest.config.js
│   └── package.json
└── TESTING.md               # This file
```

## 🎯 UI Automation with Cypress

### Prerequisites
- Node.js installed
- Frontend and backend servers running

### Installation
```bash
cd client
npm install cypress --save-dev
```

### Running UI Tests

#### 1. Start the Application
```bash
# Terminal 1: Start backend server
cd server
npm start

# Terminal 2: Start frontend server
cd client
npm start
```

#### 2. Run Cypress Tests

**Option A: Interactive Mode (Recommended for development)**
```bash
cd client
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- See all test files
- Run tests individually or all at once
- Watch tests execute in real-time
- Debug failed tests

**Option B: Headless Mode (CI/CD)**
```bash
cd client
npm run cypress:run
```

**Option C: Run specific test file**
```bash
cd client
npm run test:e2e
```

### UI Test Coverage

The Cypress tests cover:

#### 🔐 Login Functionality
- ✅ Display login page with proper elements
- ✅ Login with valid credentials
- ✅ Show error with invalid credentials
- ✅ Loading state during login

#### 📊 Dashboard Functionality
- ✅ Display dashboard with all elements
- ✅ Create new todos
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Toggle completion status
- ✅ Statistics updates
- ✅ Empty state display

#### 🎨 Theme & UI Features
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Logout functionality

#### 📱 Responsive Testing
- ✅ Mobile viewport testing
- ✅ Cross-browser compatibility

## 🔌 API Automation with Supertest/Jest

### Prerequisites
- Node.js installed
- Backend server code

### Installation
```bash
cd server
npm install supertest jest --save-dev
```

### Running API Tests

#### 1. Run Jest Tests (Recommended)
```bash
cd server
npm test
```

#### 2. Run Tests in Watch Mode
```bash
cd server
npm run test:watch
```

#### 3. Run Alternative API Tests
```bash
cd server
npm run test:api
```

### API Test Coverage

The API tests cover:

#### 🏥 Health Check Endpoints
- ✅ GET / - Server status
- ✅ GET /api/test - API test status

#### 🔐 Authentication Endpoints
- ✅ POST /api/login - Valid credentials (Positive)
- ✅ POST /api/login - Invalid username (Negative)
- ✅ POST /api/login - Invalid password (Negative)
- ✅ POST /api/login - Missing credentials (Negative)
- ✅ POST /api/login - Empty credentials (Negative)

#### 📝 Todo CRUD Operations
- ✅ GET /api/items - Retrieve all todos
- ✅ POST /api/items - Create todo (Positive & Negative)
- ✅ PUT /api/items/:id - Update todo (Positive & Negative)
- ✅ DELETE /api/items/:id - Delete todo (Positive & Negative)

#### 🛡️ Error Handling
- ✅ Invalid JSON handling
- ✅ Non-existent endpoints
- ✅ Unsupported HTTP methods

#### 🔒 Data Integrity
- ✅ CRUD operation consistency
- ✅ Data persistence verification

## 📊 Test Results & Reports

### Cypress Reports
- **Screenshots**: Automatically captured on test failures
- **Videos**: Recorded test execution (disabled by default)
- **Console Logs**: Available in Cypress Test Runner

### Jest Reports
- **Coverage Reports**: Generated in `server/coverage/`
- **Console Output**: Detailed test results
- **HTML Coverage**: Open `server/coverage/lcov-report/index.html`

## 🚀 Continuous Integration Setup

### GitHub Actions Example
```yaml
name: Test TaskMaster Pro
on: [push, pull_request]

jobs:
  ui-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd client && npm install
      - run: cd server && npm install
      - run: cd server && npm start &
      - run: cd client && npm start &
      - run: cd client && npm run cypress:run

  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd server && npm install
      - run: cd server && npm test
```

## 🐛 Debugging Tests

### Cypress Debugging
1. **Open Cypress Test Runner**: `npm run cypress:open`
2. **Use `.debug()`**: Add `cy.debug()` in test code
3. **Pause Execution**: Add `cy.pause()` in test code
4. **Screenshots**: Automatically saved on failures

### Jest Debugging
1. **Verbose Output**: `npm test -- --verbose`
2. **Watch Mode**: `npm run test:watch`
3. **Single Test**: `npm test -- --testNamePattern="test name"`
4. **Debug Mode**: `node --inspect-brk node_modules/.bin/jest --runInBand`

## 📝 Best Practices

### UI Testing
- ✅ Use data attributes for selectors
- ✅ Test user workflows, not implementation details
- ✅ Handle async operations properly
- ✅ Clean up test data
- ✅ Use meaningful test descriptions

### API Testing
- ✅ Test both positive and negative cases
- ✅ Verify response structure and status codes
- ✅ Test edge cases and error conditions
- ✅ Use descriptive test names
- ✅ Group related tests together

### General
- ✅ Keep tests independent
- ✅ Use proper assertions
- ✅ Handle test data cleanup
- ✅ Document test scenarios
- ✅ Maintain test readability

## 🔧 Configuration Files

### Cypress Configuration (`client/cypress.config.js`)
```javascript
{
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  }
}
```

### Jest Configuration (`server/jest.config.js`)
```javascript
{
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testTimeout: 10000,
  verbose: true
}
```

## 📈 Test Metrics

### Coverage Goals
- **UI Tests**: 90%+ user interaction coverage
- **API Tests**: 95%+ endpoint coverage
- **Integration Tests**: 100% critical path coverage

### Performance Targets
- **UI Tests**: < 2 minutes for full suite
- **API Tests**: < 30 seconds for full suite
- **Individual Tests**: < 5 seconds each

## 🆘 Troubleshooting

### Common Issues

#### Cypress Issues
- **Element not found**: Check if element exists and is visible
- **Timeout errors**: Increase `defaultCommandTimeout`
- **Cross-origin errors**: Ensure CORS is properly configured

#### Jest Issues
- **Port conflicts**: Use different ports for test server
- **Async test failures**: Ensure proper async/await usage
- **Module not found**: Check import paths and dependencies

### Getting Help
1. Check the test logs for detailed error messages
2. Review the application logs for server-side issues
3. Verify all dependencies are installed
4. Ensure servers are running on correct ports

---

## 🎉 Success Criteria

Tests are considered successful when:
- ✅ All UI tests pass in Cypress
- ✅ All API tests pass in Jest
- ✅ Coverage meets minimum thresholds
- ✅ No critical bugs are introduced
- ✅ Performance targets are met

Happy Testing! 🧪✨