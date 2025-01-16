To run the Playwright test suite from the Bash terminal, use the following command:
npx playwright test
________________________________________
To generate and view the Allure report, follow these steps:

Generate the Allure results from the Bash terminal: npx allure generate allure-results --clean

Serve the report by running this command in the Bash terminal: npx allure open

This will open a web interface displaying detailed test results, including any misspelled words identified during the test.
________________________________________
*********** Run and open allure reports from localhost *******************************

To Run Base url from Bash command

    $ URL="https://www.wpp.com" DIC_FILENAME="wpp" npx playwright test
            Explanation of the Code: This example demonstrates how to pass environment variables—URL="https://www.wpp.com" and DIC_FILENAME="wpp"—when running the npx playwright test command, ensuring that the test uses the wpp custom dictionary.

    $ npx allure generate allure-results --clean

    $ allure open or npx allure open allure-report

      **** Miscellaneous to clear terminal history in Bash : $ history -c or $ clear ***

To Run Commands in Powershell
   1st execute: $env:URL="https://www.wpp.com"; $env:DIC_FILENAME="wpp"; npx playwright test
            Explanation:
                $env:URL="https://www.wpp.com": This sets the environment variable URL to "https://www.wpp.com".
                $env:DIC_FILENAME="wpp": This sets the environment variable DIC_FILENAME to "wpp".
                npx playwright test: This runs the Playwright test with the specified environment variables.

    2nd execute:  npx allure generate allure-results --clean

    3rd execute: allure open or npx allure open allure-report

    **** Miscellaneous to clear terminal history in powershell : Clear-History  or  clear-Host ***

##########################################################################################################
    Miscellaneous Notes:
    1)  To generate a report, use one of the following methods:

          Option 1: Specify all reporter parameters directly in the command line:
                    bash commands
                    $ npx playwright spellcheck.test.js --headed --project='chromium' --reporter=line,allure-playwright ?? needs to check this
          Option 2: Configure the reporter in the playwright.config.js file with the following syntax:
                    reporter: [['html'], ['line'], ['allure-playwright']]




