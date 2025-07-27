# TaskMaster Pro - Enterprise QA Engineering Project

[![CI/CD Pipeline](https://github.com/hashaam-011/SQA-Engineer/actions/workflows/ci.yml/badge.svg)](https://github.com/hashaam-011/SQA-Engineer/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/badge/coverage-88.67%25-brightgreen)](./server/coverage)
[![Tests](https://img.shields.io/badge/tests-36%20passing-success)](#test-results)
[![Cypress](https://img.shields.io/badge/e2e-cypress-brightgreen)](./client/cypress)

**Professional-grade task management application with comprehensive test automation, CI/CD integration, and advanced quality assurance practices.**

## Project Highlights

- **Full-Stack Application**: React frontend + Express.js backend
- **Comprehensive Testing**: 36 test cases (15 UI + 21 API)
- **CI/CD Integration**: GitHub Actions with multi-environment testing
- **Advanced Coverage**: Enhanced reporting with nyc
- **Visual Testing**: Cypress snapshots for UI consistency
- **Professional QA**: Industry-standard testing practices

---

## Architecture Overview

```
TaskMaster Pro
├── Frontend (React 19.1.0)
│   ├── Authentication System
│   ├── Todo Management (CRUD)
│   ├── Dark/Light Theme Toggle
│   └── Responsive Design
│
├── Backend (Express.js 5.1.0)
│   ├── RESTful API Endpoints
│   ├── In-Memory Data Storage
│   ├── CORS-Enabled
│   └── Comprehensive Error Handling
│
└── Testing Infrastructure
    ├── Cypress (UI E2E Testing)
    ├── Jest + Supertest (API Testing)
    ├── GitHub Actions (CI/CD)
    └── Visual Regression Testing
```

---

## Features

### Core Application Features
- **User Authentication** - Secure login/logout system
- **Todo Management** - Full CRUD operations
- **Real-time Statistics** - Task completion tracking
- **Theme Switcher** - Dark/Light mode toggle
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Comprehensive user feedback

### Quality Assurance Features
- **Comprehensive Test Suite** - 36 automated test cases
- **CI/CD Pipeline** - Automated testing on every commit
- **Code Coverage Reports** - 88.67% coverage with detailed analytics
- **Visual Testing** - Screenshot comparison for UI consistency
- **Cross-Browser Testing** - Chrome, Firefox, Safari support
- **Performance Monitoring** - Load time and responsiveness checks

---

## Quick Start

### Prerequisites
```bash
Node.js v18+
npm v8+
Git
Modern Browser (Chrome/Firefox/Safari)
```

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/hashaam-011/SQA-Engineer.git
cd SQA-Engineer

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running the Application
```bash
# Terminal 1: Start Backend Server
cd server
npm start
# Server running on http://localhost:5000

# Terminal 2: Start Frontend Server
cd client
npm start
# Client running on http://localhost:3000
```

### **Demo Credentials**
```
Username: testuser
Password: testpass
```

---

## 🧪 **Testing Guide**

### **API Testing (Jest + Supertest)**
```bash
cd server

# Run all API tests
npm test

# Run with enhanced coverage reporting
npm run test:coverage

# Watch mode for development
npm run test:watch

# Generate HTML coverage report
npm run coverage:html
```

**📊 Current API Test Results:**
- ✅ **21 Test Cases** - All passing
- ✅ **88.67% Statement Coverage**
- ✅ **95% Branch Coverage**
- ✅ **90% Function Coverage**

### **UI Testing (Cypress E2E)**
```bash
cd client

# Interactive test runner (recommended)
npx cypress open

# Headless execution (CI/CD)
npx cypress run --spec cypress/e2e/ui-tests.spec.js

# Alternative command
npm run test:e2e
```

**🎭 Current UI Test Results:**
- ✅ **15 Test Cases** - All passing
- ✅ **Complete User Workflows** - Login to logout
- ✅ **Responsive Testing** - Mobile/Desktop/Tablet
- ✅ **Visual Snapshots** - UI consistency verification

### **Running All Tests**
```bash
# Method 1: Manual execution
cd server && npm test
cd client && npx cypress run

# Method 2: CI/CD Pipeline (GitHub Actions)
git push origin main
# Automatically runs all tests in cloud environment
```

---

## 🔄 **CI/CD Pipeline**

Our **GitHub Actions workflow** provides enterprise-grade automation:

### **Pipeline Stages**
1. **🧪 API Testing** - Jest/Supertest execution across Node.js 18.x & 20.x
2. **🎭 UI Testing** - Cypress E2E testing with video/screenshot capture
3. **🔍 Code Quality** - ESLint, security audits, and dependency checks
4. **🚀 Deployment Check** - Build verification and readiness assessment

### **Advanced Features**
- **✅ Multi-Node Testing** - Tests run on Node.js 18.x and 20.x
- **✅ Artifact Collection** - Screenshots/videos on test failures
- **✅ Coverage Reporting** - Automated coverage uploads to Codecov
- **✅ Security Scanning** - Dependency vulnerability assessment
- **✅ Build Verification** - Production readiness confirmation

### **Triggering CI/CD**
```bash
# Trigger on push to main/develop
git push origin main

# Trigger on pull requests
git checkout -b feature/new-feature
git push origin feature/new-feature
# Create PR to main branch
```

---

## 📊 **Test Coverage Details**

### **API Coverage (Enhanced with nyc)**
```
File Coverage Summary:
├── Statements: 88.67% (47/53)
├── Branches: 95% (19/20)
├── Functions: 90% (9/10)
└── Lines: 88.23% (45/51)

Detailed Reports Available:
├── 📄 Text Report: Terminal output
├── 📊 HTML Report: ./server/coverage/lcov-report/index.html
└── 📈 LCOV Report: ./server/coverage/lcov.info
```

### **UI Coverage (Cypress E2E)**
```
Test Scenarios Covered:
├── 🔐 Authentication: 4/4 scenarios
├── 📝 CRUD Operations: 9/9 scenarios
├── 🎨 UI Features: 2/2 scenarios
├── 📱 Responsive Design: 1/1 scenarios
└── 🎭 Visual Testing: Baseline snapshots captured

Browser Coverage:
├── ✅ Chrome/Chromium (Primary)
├── ✅ Electron (CI/CD)
└── 🔄 Firefox/Safari (Configuration ready)
```

---

## 📸 **Visual Testing**

### **Snapshot Testing Features**
- **📸 Automated Screenshots** - Baseline image capture
- **🔍 Visual Comparison** - Pixel-perfect difference detection
- **📱 Responsive Snapshots** - Multi-viewport testing
- **⚙️ Configurable Thresholds** - Customizable sensitivity settings

### **Visual Test Commands**
```javascript
// Basic visual snapshot
cy.visualSnapshot('login-page')

// Responsive testing across viewports
cy.responsiveSnapshot('dashboard', [
  { width: 1920, height: 1080, name: 'desktop-xl' },
  { width: 1280, height: 720, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 375, height: 667, name: 'mobile' }
])

// Enhanced login with visual verification
cy.loginWithVisual('testuser', 'testpass')
```

---

## 📁 **Project Structure**

```
SQA-Engineer/
├── 📂 .github/workflows/         # CI/CD Pipeline
│   └── ci.yml                   # GitHub Actions configuration
├── 📂 client/                   # React Frontend
│   ├── 📂 cypress/              # E2E Testing Suite
│   │   ├── 📂 e2e/              # Test specifications
│   │   ├── 📂 support/          # Custom commands & utilities
│   │   ├── 📂 screenshots/      # Test failure screenshots
│   │   └── 📂 snapshots/        # Visual testing baselines
│   ├── 📂 src/                  # React application source
│   └── 📄 package.json          # Frontend dependencies
├── 📂 server/                   # Express.js Backend
│   ├── 📂 __tests__/            # API test suite
│   ├── 📂 coverage/             # Coverage reports
│   ├── 📄 server.js             # Main server file
│   └── 📄 package.json          # Backend dependencies
├── 📄 test-plan.md              # Comprehensive test documentation
├── 📄 TESTING.md                # Detailed testing instructions
└── 📄 README.md                 # This file
```

---

## 🎯 **Quality Metrics**

### **Test Execution Performance**
| Test Suite | Test Count | Execution Time | Success Rate |
|------------|------------|----------------|--------------|
| API Tests  | 21         | ~5 seconds     | 100%         |
| UI Tests   | 15         | ~77 seconds    | 100%         |
| **Total**  | **36**     | **~82 seconds** | **100%**     |

### **Code Quality Standards**
- ✅ **ESLint Compliance** - JavaScript code standards
- ✅ **Security Auditing** - Dependency vulnerability scanning
- ✅ **Test Coverage** - Minimum 80% requirement exceeded
- ✅ **Documentation** - Comprehensive guides and comments
- ✅ **CI/CD Integration** - Automated quality gates

---

## 🔧 **Advanced Configuration**

### **Environment Variables**
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Cypress Configuration
CYPRESS_baseUrl=http://localhost:3000
CYPRESS_visualTesting=true
CYPRESS_failureThreshold=0.1
```

### **Coverage Thresholds (nyc)**
```json
{
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 75
}
```

### **Visual Testing Settings**
```json
{
  "failureThreshold": 0.1,
  "thresholdType": "percent",
  "experimentalSessionAndOrigin": true
}
```

---

## 🚀 **Deployment & Production**

### **Production Build**
```bash
# Build optimized frontend
cd client
npm run build

# Production server start
cd server
NODE_ENV=production npm start
```

### **Docker Support** (Future Enhancement)
```dockerfile
# Multi-stage Docker build ready
FROM node:18-alpine as builder
# ... build configuration
```

---

## 📚 **Documentation**

- **📋 [Test Plan](./test-plan.md)** - Comprehensive testing strategy
- **🧪 [Testing Guide](./TESTING.md)** - Detailed testing instructions
- **🔄 [CI/CD Documentation](./.github/workflows/ci.yml)** - Pipeline configuration
- **📊 [Coverage Reports](./server/coverage/)** - Detailed analytics

---

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork & Clone** - Create your development environment
2. **Feature Branch** - `git checkout -b feature/amazing-feature`
3. **Test-Driven Development** - Write tests first, then implementation
4. **Quality Checks** - Ensure all tests pass and coverage requirements met
5. **Pull Request** - Submit with comprehensive description

### **Quality Requirements**
- ✅ All existing tests must pass
- ✅ New features require corresponding tests
- ✅ Code coverage must not decrease
- ✅ ESLint standards compliance
- ✅ Documentation updates included

---

## 🏆 **Project Achievements**

- ✅ **100% Test Success Rate** - All 36 tests passing consistently
- ✅ **88.67% Code Coverage** - Exceeding industry standards
- ✅ **Automated CI/CD** - Enterprise-grade deployment pipeline
- ✅ **Visual Testing** - Pixel-perfect UI consistency
- ✅ **Multi-Browser Support** - Cross-platform compatibility
- ✅ **Professional Documentation** - Comprehensive guides and standards

---

## 📞 **Support & Contact**

**Repository**: [https://github.com/hashaam-011/SQA-Engineer](https://github.com/hashaam-011/SQA-Engineer)

**Issues & Bug Reports**: Use GitHub Issues for tracking and resolution

**Professional QA Standards**: This project demonstrates enterprise-level quality assurance practices suitable for production environments.

---

<div align="center">

**⭐ Star this repository if you find it valuable for learning QA engineering practices! ⭐**

*Built with ❤️ for the QA Engineering Community*

</div>