# Enterprise Playwright Automation Framework

A production-grade test automation framework built with **Playwright** and **TypeScript**, implementing industry best practices for API and UI automation testing.

## 📋 Features

✅ **Page Object Model (POM)** - Clean separation of test logic and UI interactions  
✅ **API Automation** - Dedicated API client with base client pattern  
✅ **TypeScript** - Full type safety and IntelliSense support  
✅ **Custom Fixtures** - Reusable test fixtures for pages and API clients  
✅ **Centralized Config** - Environment-based configuration management  
✅ **Logging & Reporting** - Structured logging and comprehensive HTML reports  
✅ **Multi-browser Testing** - Chromium, Firefox, WebKit support  
✅ **CI/CD Ready** - Built-in support for continuous integration pipelines  

---

## 📁 Project Structure

```
.
├── src/
│   ├── api/
│   │   ├── clients/
│   │   │   ├── baseApiClient.ts       # Base class for all API clients
│   │   │   └── userApiClient.ts       # Example: User API client
│   │   └── models/
│   │       └── userModel.ts           # Data models/interfaces
│   ├── ui/
│   │   └── pages/
│   │       ├── basePage.ts            # Base page with common actions
│   │       ├── loginPage.ts           # Login page object
│   │       └── homePage.ts            # Home page object
│   └── utils/
│       ├── testData.ts                # Centralized test data
│       ├── logger.ts                  # Logging utility
│       └── configLoader.ts            # Configuration management
├── tests/
│   ├── api/
│   │   └── user.spec.ts               # API tests example
│   ├── ui/
│   │   └── auth/
│   │       └── login.spec.ts          # UI tests example
│   └── fixtures/
│       └── testFixtures.ts            # Custom test fixtures
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to project
cd "c:\Automation\Playwright with TS"

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

Create a `.env` file in the project root (optional):

```env
ENV=dev
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001/api
HEADLESS=true
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure
TRACE=on-first-retry
```

---

## 📝 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# UI tests only
npm run test:ui:tests

# API tests only
npm run test:api:tests

# Specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Interactive & Debug Modes
```bash
# UI mode (visual test runner)
npm run test:ui

# Headed mode (see browser)
npm run test:headed

# Debug mode (step through tests)
npm run test:debug

# Generate test code
npm run test:codegen
```

### View Results
```bash
# Open HTML report
npm run test:report

# View trace
npm run test:trace
```

---

## 🏗️ Architecture Overview

### Page Object Model (POM)

All UI interactions are encapsulated in page objects that extend `BasePage`:

```typescript
// Usage in tests
test('should login successfully', async ({ loginPage }) => {
  await loginPage.navigateToLogin();
  await loginPage.login('user@example.com', 'password');
  expect(await loginPage.isLoginSuccessful()).toBeTruthy();
});
```

**Benefits:**
- Reduced test maintenance
- Improved readability
- Centralized UI locators
- Easy to scale and modify

### API Client Pattern

API clients extend `BaseApiClient` for common HTTP operations:

```typescript
// Usage in tests
test('should fetch users', async ({ userApiClient }) => {
  const users = await userApiClient.getAllUsers();
  expect(users.length).toBeGreaterThan(0);
});
```

**Features:**
- Automatic error handling
- Request/response validation
- Reusable across tests
- Type-safe with TypeScript

### Custom Fixtures

Fixtures provide pre-configured page objects and API clients to tests:

```typescript
test('should perform complete flow', async ({ loginPage, homePage, userApiClient }) => {
  // All ready to use!
  await loginPage.login('user@example.com', 'password');
  const users = await userApiClient.getAllUsers();
});
```

---

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

- **Test timeout**: 30s
- **Expect timeout**: 5s
- **Retries**: 2 on CI, 0 locally
- **Reporters**: HTML, JSON, JUnit (for CI/CD)
- **Screenshots/Videos**: Automatic on failure
- **Trace**: Recorded on first retry

### Environment-based Config (`src/utils/configLoader.ts`)

Supports multiple environments with automatic URL selection:

```typescript
// Environment variables
ENV=dev|staging|prod

// Or explicit URLs
BASE_URL=https://example.com
API_URL=https://api.example.com
```

---

## 📚 Best Practices Implemented

### 1. **Separation of Concerns**
- API logic separate from UI logic
- Page objects handle UI interactions
- API clients handle HTTP requests
- Tests focus on behavior

### 2. **DRY Principle**
- Base classes for common functionality
- Centralized test data in `testData.ts`
- Reusable fixtures
- Helper utilities

### 3. **Type Safety**
- Full TypeScript support
- Interfaces for data models
- Generic methods in base classes
- IDE IntelliSense support

### 4. **Maintainability**
- Clear naming conventions
- Comprehensive comments
- Organized folder structure
- Easy to extend and modify

### 5. **Scalability**
- Modular architecture
- Custom fixtures for new pages/APIs
- Environment-based config
- CI/CD integration ready

---

## 🧪 Writing New Tests

### Creating a New Page Object

```typescript
// src/ui/pages/productPage.ts
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  private readonly addToCartButton = 'button[data-testid="add-to-cart"]';

  async addProductToCart(): Promise<void> {
    await this.clickElement(this.addToCartButton);
  }
}
```

### Creating a New API Client

```typescript
// src/api/clients/productApiClient.ts
import { BaseApiClient } from './baseApiClient';

export class ProductApiClient extends BaseApiClient {
  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>('/products');
  }
}
```

### Adding a New Fixture

```typescript
// tests/fixtures/testFixtures.ts
productPage: async ({ page }, use) => {
  const productPage = new ProductPage(page);
  await use(productPage);
},
```

### Writing Tests

```typescript
// tests/ui/shopping/checkout.spec.ts
import { test, expect } from '../fixtures/testFixtures';

test('should complete purchase', async ({ loginPage, productPage }) => {
  await loginPage.login('user@example.com', 'password');
  await productPage.addProductToCart();
  // ... more steps
});
```

---

## 🔍 Debugging

### Debug Mode
```bash
npm run test:debug
```

### View Traces
Automatically saved on first retry. View with:
```bash
npx playwright show-trace path/to/trace.zip
```

### Headed Mode
See the browser while tests run:
```bash
npm run test:headed
```

### Slow Motion
Add delays to see what's happening:
```bash
npx playwright test --slow-mo=1000
```

---

## 📊 Reporting

### HTML Report
```bash
npm run test:report
```

### Supported Formats
- **HTML** - Interactive visual report
- **JSON** - Machine-readable results
- **JUnit** - CI/CD integration
- **Console** - Terminal output

---

## 🚦 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📦 Dependencies

- `@playwright/test` - Testing framework
- `typescript` - Type safety
- `@types/node` - Node.js types

---

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Add tests for new features
4. Update documentation
5. Follow naming conventions

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [API Testing Guide](https://playwright.dev/docs/api-testing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 License

ISC

---

## ✨ Key Takeaways

This framework provides:
- **Clean code** through Page Object Model
- **Reusability** via custom fixtures and base classes
- **Maintainability** with centralized configs and data
- **Scalability** to support enterprise-level testing needs
- **Type safety** with full TypeScript support
- **Professional results** with detailed reporting

Start writing tests with confidence! 🚀
