import CargoCLP from "../pages/ContainerListPage"

// PageObjets
const CLP = new CargoCLP();

describe('Multi-Select Dropdown Test Suite', () => {
    

    beforeEach(() => {
        CLP.navigateToCLP()
        CLP.deleteFiltersInStorage()
        cy.viewport(1280, 1000)
        products = cy.fixture('products.json').as('products');
    })

    it('Verify that the drop-down menu has been changed from a single select to a multi-select', () => {
        CLP.selectProducts.should('have.attr', 'multiple', 'multiple');
    });

    it('Verify that the search function is working as expected for the options within the drop-down menu', () => {
        CLP.getSelectOfProducts().select('product1');
        CLP.getOptionSelectOfProducts().should('contain', 'product1');
    });

    it('Verify that the API has changed to receive multiple values to filter the list of shipments/containers', () => {
        cy.server();
        cy.route('GET', '/api/shipments?product=product1&product=product2').as('getShipments');

        CLP.getSelectOfProducts().select(['product1', 'product2']);
        cy.wait('@getShipments');
        cy.get('@getShipments').its('request.url').should('include', 'product=product1&product=product2');
    });

    it('Verify that the search function has been changed to allow for multiple values instead of a single value', () => {
        
        productsToSelect = [this.products[0], this.products[1]]

        CLP.chooseProductsFromSelect(productsToSelect)

        CLP.getOptionSelectOfProducts().should('contain', productsToSelect[0]);
        CLP.getOptionSelectOfProducts().should('contain', productsToSelect[1]);
    });

    it('Test that selecting multiple options from the drop-down menu filters the list of shipments/containers correctly', () => {
        CLP.chooseProductsFromSelect(['product1', 'product2'])
        CLP.getOptionSelectOfProducts().should('have.length', 50);

        cy.get('.shipment-item-available').each(($el) => {
            expect($el).to.have.text('Product A')
            .or($el).to.have.text('Product B');
        });
    });

    describe('Test that the drop-down menu works correctly with all types of products', () => {
        CLP.getSelectOfProducts.select( products );
        CLP.getSlectedProducts().should('have.length', 100);
    });

    it('Test the performance of the drop-down menu with a large number of options', () => {
        const startTime = Cypress.moment();
        chooseProductsFromSelect( products );
        getSlectedProducts().should('have.length', 100);
        const endTime = Cypress.moment();
        const duration = endTime - startTime;
        expect(duration).to.be.lessThan(5000);
    });

})