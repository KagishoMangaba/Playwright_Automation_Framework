# SauceDemo Playwright TypeScript Framework

> A professional automation testing framework for SauceDemo built with TypeScript and Playwright.

---

## 📋 Overview

A professional end-to-end automation testing framework for [SauceDemo](https://www.saucedemo.com), designed to improve test reliability, scalability, and maintainability. Built from the ground up using Playwright and TypeScript, this framework reflects a progression from basic test scripts to a structured, reusable test architecture.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript |
| Automation | Playwright |
| Test Runner | Playwright Test |
| Build Tool | npm / Node.js |
| Design Pattern | Page Object Model (POM) |
| Reporting | Playwright HTML Reports |
| Logging | Built-in Playwright tracing & console logs |
| CI/CD | Jenkins |

---

## ✨ Features

- ✅ **Page Object Model (POM)** architecture for clean separation of concerns
- ✅ **Valid and invalid login test coverage**
- ✅ **Reusable base fixtures** for consistent setup and teardown
- ✅ **Automatic screenshots and videos** captured on test failure
- ✅ **Retry logic** for unstable tests
- ✅ **Parallel test execution** enabled out of the box
- ✅ **Data-driven testing** using JSON or external test data files
- ✅ **Playwright HTML Reports** for detailed execution reports
- ✅ **CI/CD ready** — runs remotely with Jenkins
- ✅ **Runs on command terminal**

---

## 📁 Project Structure

```
saucedemo-playwright/
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── ...
├── tests/                  # Test specs
│   ├── login.spec.ts
│   └── ...
├── test-data/              # JSON test data files
│   └── users.json
├── utils/                  # Helper utilities
│   └── helpers.ts
├── playwright.config.ts    # Playwright configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- A modern browser (Chromium, Firefox, or WebKit — installed via Playwright)

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/saucedemo-playwright.git
cd saucedemo-playwright
```

**2. Install dependencies:**

```bash
npm install
```

**3. Install Playwright browsers:**

```bash
npx playwright install
```

---

## ▶️ Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run a specific test file:**

```bash
npx playwright test tests/login.spec.ts
```

**Run tests in headed mode (see the browser):**

```bash
npx playwright test --headed
```

**Run tests in a specific browser:**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run tests in parallel:**

```bash
npx playwright test --workers=4
```

**Run with retries:**

```bash
npx playwright test --retries=2
```

---

## 📊 Reports

**Open the HTML report after a test run:**

```bash
npx playwright show-report
```

Reports include test results, screenshots, videos, and traces for failed tests.

---

## ⚙️ Configuration

Key settings in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});
```

---

## 🔐 Test Coverage

### Login Tests (`login.spec.ts`)

| Scenario | Status |
|---|---|
| Valid user login | ✅ |
| Invalid username | ✅ |
| Invalid password | ✅ |
| Locked out user | ✅ |
| Empty credentials | ✅ |



## 🔄 CI/CD — Jenkins

This framework is CI/CD ready and can be executed via Jenkins pipeline:

## 🔧 Areas for Improvement

- Further reduce flakiness and improve test reliability
- Add enhanced logging and debugging support
- Expand negative and edge-case test coverage
- Improve test data management
- Optimise CI execution and reporting

---

## 🚀 Future Enhancements

- Increase API test coverage using Playwright's request context
- Add visual regression testing
- Improve framework scalability and reusability
- Apply additional design patterns as the framework evolves
- Docker integration for containerised test runs

---

## 🎯 Why QA Automation

I chose QA automation because I enjoy understanding systems end-to-end, identifying failure points, and improving product quality through structured testing. Automation allows me to combine problem-solving with clean, maintainable code while delivering real value to development teams.

---

## 👤 Author

**Kagisho Prince Mangaba**  
Software Development Engineer in Test  
[LinkedIn](https://www.linkedin.com/in/kagisho-mangaba/)

---

## 📄 License

This project is for educational and portfolio purposes.
