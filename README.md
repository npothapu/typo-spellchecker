# Playwright Test Suite and Allure Report Setup

## Running Playwright Test Suite
To execute the Playwright test suite from the Bash terminal, use the following command:
```bash
npx playwright test
```

---

## Generating and Viewing the Allure Report
Follow these steps to generate and view the Allure report:

1. **Generate the Allure Results:**
   Run the following command in the Bash terminal:
   ```bash
   npx allure generate allure-results --clean
   ```

2. **Serve the Report:**
   To open the report, run:
   ```bash
   npx allure open
   ```
   This will launch a web interface displaying detailed test results, including any misspelled words identified during the test.

---

## Running Tests with Base URL in Bash
To run Playwright tests using a base URL and a custom dictionary file in Bash, follow these steps:

1. Execute the following command:
   ```bash
   URL="https://www.wpp.com" DIC_FILENAME="wpp" npx playwright test
   ```

   **Explanation of the Code:**
   - `URL="https://www.wpp.com"`: Sets the environment variable `URL` to `https://www.wpp.com`.
   - `DIC_FILENAME="wpp"`: Sets the environment variable `DIC_FILENAME` to `wpp`.
   - `npx playwright test`: Runs the Playwright tests, utilizing the specified environment variables (e.g., the custom dictionary).

2. **Generate an Allure Report:**
   ```bash
   npx allure generate allure-results --clean
   ```

3. **View the Allure Report:**
   ```bash
   allure open
   ```
   Or, if Allure is installed locally:
   ```bash
   npx allure open allure-report
   ```

4. **Miscellaneous Bash Commands:**
   - Clear terminal history:
     ```bash
     history -c
     ```
   - Clear the terminal screen:
     ```bash
     clear
     ```

---

## Running Tests with Base URL in PowerShell
To run Playwright tests using PowerShell, follow these steps:

1. Execute the following command to set environment variables and run tests:
   ```powershell
   $env:URL="https://www.wpp.com"; $env:DIC_FILENAME="wpp"; npx playwright test
   ```

   **Explanation of the Code:**
   - `$env:URL="https://www.wpp.com"`: Sets the environment variable `URL` to `https://www.wpp.com`.
   - `$env:DIC_FILENAME="wpp"`: Sets the environment variable `DIC_FILENAME` to `wpp`.
   - `npx playwright test`: Runs the Playwright tests, ensuring the specified environment variables are used.

2. **Alternative Options:**
   Pass project-specific values configured in the Playwright configuration file by appending the appropriate options:
   
   - **For the default project:**
     ```powershell
     $env:URL="https://www.vml.com"; $env:DIC_FILENAME="vml"; npx playwright test --project="default"
     ```
   - **For custom projects:**
     ```powershell
     $env:URL="https://www.ford.com"; $env:DIC_FILENAME="ford"; npx playwright test --project="Ford Tests"
     ```

   **Additional Examples:**
   - Default headless mode:
     ```powershell
     $env:HEADLESS="true"; npx playwright test --project="default"
     ```
   - Custom headless configuration for specific URLs:
     ```powershell
     $env:URL="https://www.ford.com"; $env:DIC_FILENAME="ford"; $env:HEADLESS="false"; npx playwright test --project="Ford Tests"
     ```

3. **Generate an Allure Report:**
   ```powershell
   npx allure generate allure-results --clean
   ```

4. **View the Allure Report:**
   ```powershell
   allure open
   ```
   Or, if Allure is installed locally:
   ```powershell
   npx allure open allure-report
   ```

5. **Miscellaneous PowerShell Commands:**
   - Clear command history:
     ```powershell
     Clear-History
     ```
   - Clear the terminal screen:
     ```powershell
     Clear-Host
     ```

---

## Miscellaneous Notes

1. **Generating a Report:**
   - Option 1: Specify all reporter parameters directly in the command line:
     ```bash
     npx playwright test spellcheck.test.js --headed --project='chromium' --reporter=line,allure-playwright
     ```
   - Option 2: Configure the reporter in the `playwright.config.js` file:
     ```javascript
     reporter: [
         ['html'],
         ['line'],
         ['allure-playwright']
     ]
   
   
  Examples:
        by default Headless= true
        $env:URL="https://www.vml.com"; $env:DIC_FILENAME="vml"; npx playwright test --project="default"
        $env:URL="https://www.teenvoice.com"; $env:DIC_FILENAME="teenvoice"; npx playwright test --project="default" 
        $env:URL="https://www.sherwin-williams.com/"; $env:DIC_FILENAME="sherwin-williams"; npx playwright test --project="default" 
        $env:URL="https://www.unitedsoybean.com"; $env:DIC_FILENAME="unitedsoybean"; npx playwright test --project="default" 
        

        pass headless= true value
        $env:URL="https://www.vml.com"; $env:DIC_FILENAME="vml"; env:HEADLESS="true"; npx playwright test --project="default"
        $env:URL="https://www.teenvoice.com"; $env:DIC_FILENAME="teenvoice"; env:HEADLESS="true"; npx playwright test --project="default" 
        $env:URL="https://www.sherwin-williams.com/"; $env:DIC_FILENAME="sherwin-williams"; $env:HEADLESS="true"; npx playwright test --project="default"  
        $env:URL="https://www.unitedsoybean.com"; $env:DIC_FILENAME="unitedsoybean"; $env:HEADLESS="true"; npx playwright test --project="default" 
        
        pass headless= false only this works for www.ford.com or www.wpp.com     
        $env:URL="https://www.wpp.com"; $env:DIC_FILENAME="wpp"; $env:HEADLESS="false"; npx playwright test --project="Headless Tests" 
        $env:URL="https://www.ford.com"; $env:DIC_FILENAME="ford"; $env:HEADLESS="false"; npx playwright test --project="Headless Tests"

