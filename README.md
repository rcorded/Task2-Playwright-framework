# Playwright UI Automation Framework for Redmine

## Summary of Repo
This repository contains a UI automation testing framework designed for the [Redmine](https://www.redmine.org/) website. It is built using **Playwright** and leverages the **Page Object Model (POM)** design pattern to ensure the code is modular, reusable, and easy to maintain. Additionally, the project integrates **Allure** to generate comprehensive, visual test execution reports.

## Requirements
To set up and run this project, you need to have the following installed on your machine:
* **Node.js** (v20.9.0 or higher is recommended)
* **npm** (Node Package Manager, which comes bundled with Node.js)

## Steps to Install
1. Clone this repository to your local machine.
2. Open your terminal and navigate to the root directory of the project.
3. Install the project dependencies defined in the `package.json`:

   ```bash
   npm install
   ```
5. Install the required Playwright browsers:

   ```Bash
   npx playwright install
   ```
   
## Steps to Launch
You can execute the automated test suite using the pre-configured npm scripts and default commands.

Run tests in Headless mode (Default):

```Bash
npm run test
```

Run tests in Headed mode (with browser UI visible):

```Bash
npm run test:headed
```

Run a specific spec:
```
npx playwright test tests/specs/roadmapPage.spec.ts
```

## Steps to Creating the Report
This framework uses allure-playwright to track test results. After executing your test runs, follow these steps to generate and view the report:

1. Generate the Allure report:

```Bash
npm run report:generate
```
This command processes the raw data in the allure-results folder, cleans any previous artifacts, and builds the HTML report into the allure-report directory.

2. Open the report in your default browser:

```Bash
npm run report:open
```

## Build with
- [Typescript](https://www.typescriptlang.org/) - a strongly typed programming language built on [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and used for this project
- [Playwright](https://playwright.dev/) - a cross-browser, cross-platform and cross-language framework that can be used for Web, API and mobile (to some degree) automation testing.
