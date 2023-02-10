
# Introduction

_This repository is the result of a one hour technical interview for Cargo Produce. As a QA, your job is expected to be to identify test cases for when this functionality is in the QA environment. It will list the tests that will verify that the enhancement works as expected. You will also write several test suites in Cypress to test this enhancement. The environment will be an imaginary environment based on the description described in the markdown._

# Description

```
Enhancement
Modify the existing products drop
-
down, from a single select to a multi select.
Note: the products drop
-
down filters a list of shipments/containers by the products they
contain.
Acceptance criteria:
⁃
the multi select drop
-
down must have a
search function for the options within
the drop
-
down
Developer notes:
⁃
API must change to receive multiple values to filter
⁃
Search functions must also change to allow for multiple instead of single.
Goals:
⁃
Your job as a QA is to identify test cases for
when this functionality is in the QA
environment.
⁃
Enumerate tests that will verify the enhancement works as expected.
⁃
Write as many test suites in Cypress to test this enhancement.
Note: You will have access to a mirror environment with the old version
and the same
data set.
```

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

