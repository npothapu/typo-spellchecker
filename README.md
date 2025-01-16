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

    $ URL=https://www.teenvoice.com npx playwright test or $ URL=https://www.vml.com npx playwright test
    
    $ npx allure generate allure-results --clean

    $ allure open or npx allure open allure-report

      **** Miscellaneous to clear terminal history in Bash : $ history -c or $ clear ***

To Run Commands in Powershell

    1st execute: $env:URL="https://www.teenvoice.com"; or $env:URL="https://www.vml.com"; 

    2nd execute: npx playwright test

    3rd execute: npx allure generate allure-results --clean

    4th execute: allure open or npx allure open allure-report

    **** Miscellaneous to clear terminal history in powershell : Clear-History  or  clear-Host ***

##########################################################################################################
    Miscellaneous Notes:
    1)  To generate a report, use one of the following methods:

          Option 1: Specify all reporter parameters directly in the command line:
                    bash commands
                    $ npx playwright spellcheck.test.js --headed --project='chromium' --reporter=line,allure-playwright ?? needs to check this
          Option 2: Configure the reporter in the playwright.config.js file with the following syntax:
                    reporter: [['html'], ['line'], ['allure-playwright']]




