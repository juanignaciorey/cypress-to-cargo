class CargoCLP {

    productsSelectSelector = '#products-dropdown'
    // Locators
    getSelectOfProducts = () => {
        return cy.get(productsSelectSelector);
    }
    getOptionSelectOfProducts() {
        return cy.get(' #products-dropdown option')
    }    
    getSlectedProducts() {
        return cy.get('.shipment-item')
    }

    // Actions
    deleteFiltersInStorage() {
        cy.clearLocalStorage('products_filters_key')
    }

    navigateToCLP() {
        cy.url().should('eq', Cypress.config().baseUrl + '/containerList')
        cy.title().should('eq', 'Cargo Containers List')
    }

    chooseProductsFromSelect(listOfProducts) {
        this.elements.selectProducts.select(listOfProducts);
    }

}

export default CargoCLP