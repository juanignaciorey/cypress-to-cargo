

## prerequisites that were made to perform it
```
mkdir cypress-to-cargo
cd cypress-to-cargo
npm init
npm install cypress --save -dev
npm install -D @cypress/xpath
npm install
```

# The exercise can be done in two ways.

## With Page Object Model
```
/e2e/examplePOM.cy.js
/pages/productListPage.js
```
_modified files_

## Or with an e2e test
```
/e2e/exampleTest.cy.js
/support/commands.js
```
_modified files_

