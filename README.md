To run the Playwright test suite from the Bash terminal, use the following command:
npx playwright test
________________________________________
To generate and view the Allure report, follow these steps:

Generate the Allure results from the Bash terminal: npx allure generate allure-results --clean

Serve the report by running this command in the Bash terminal: npx allure open

This will open a web interface displaying detailed test results, including any misspelled words identified during the test.
________________________________________
To Run Base url from Bash command
$ BASE_URL=https://example.com npx playwright test
