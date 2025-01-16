To run the Playwright test suite from the Bash terminal, use the following command:
    npx playwright test
________________________________________
To generate and view the Allure report, follow these steps:
1. Generate the Allure results:
    Run the following command in the Bash terminal:
        npx allure generate allure-results --clean  
2. Serve the report:
    To open the report, run this command in the Bash terminal:
        npx allure open  
This will launch a web interface displaying detailed test results, including any misspelled words identified during the test.

*********** Run and open allure reports from localhost *******************************

Running Tests with Base URL in Bash
To run Playwright tests using a base URL and a custom dictionary file in Bash, follow these steps:

1. Execute the command: $ URL="https://www.wpp.com" DIC_FILENAME="wpp" npx playwright test  
        Explanation of the Code:

            URL="https://www.wpp.com": Sets the environment variable URL to "https://www.wpp.com".
            DIC_FILENAME="wpp": Sets the environment variable DIC_FILENAME to "wpp".
            npx playwright test: Runs the Playwright tests, ensuring that the specified environment variables are utilized (e.g., the custom dictionary).
2. To generate an Allure report:
            $ npx allure generate allure-results --clean  
3. To view the Allure report:
            $ allure open  
            Or use the following if Allure is installed locally:
            $ npx allure open allure-report  
4. Miscellaneous Bash Commands:
            Clear terminal history:
            $ history -c  
            Clear the terminal screen:
            $ clear  

Running Tests with Base URL in PowerShell

To run Playwright tests using PowerShell, follow these steps:

1. Execute the following command to set environment variables and run tests:
            $env:URL="https://www.wpp.com"; $env:DIC_FILENAME="wpp"; npx playwright test  
        Explanation of the Code:
            $env:URL="https://www.wpp.com": Sets the environment variable URL to "https://www.wpp.com".
            $env:DIC_FILENAME="wpp": Sets the environment variable DIC_FILENAME to "wpp".
            npx playwright test: Runs the Playwright tests, ensuring the specified environment variables are used.

2. Alternative Option:
You can pass project-specific values configured in the Playwright configuration file. Append one of the following options to the command:

        For the default project: Append --project="default" to the end of the npx playwright test command.
        For a custom project (e.g., "Ford Tests"): Append --project="Ford Tests" to the end of the npx playwright test command.
        Examples:
            $env:URL="https://www.teenvoice.com"; $env:DIC_FILENAME="teenvoice"; npx playwright test --project="default"  
            $env:URL="https://www.ford.com"; $env:DIC_FILENAME="ford"; npx playwright test --project="Ford Tests"  

3. To generate an Allure report:
        npx allure generate allure-results --clean  

4. To view the Allure report:
        allure open  

    Or, if Allure is installed locally:
        npx allure open allure-report  


 5. Miscellaneous: To clear the terminal history or screen in PowerShell, use the following commands:
        Clear command history: Clear-History
        Clear the terminal screen: Clear-Host

##########################################################################################################
Miscellaneous Notes:
1. Generating a Report:
    Option 1: Specify all reporter parameters directly in the command line:
            $ npx playwright test spellcheck.test.js --headed --project='chromium' --reporter=line,allure-playwright  
            (Ensure the syntax and parameters match your setup; adjust as necessary.)

    Option 2: Configure the reporter in the playwright.config.js file using the following syntax:
            reporter: [
            ['html'], 
            ['line'], 
            ['allure-playwright']
            ]




