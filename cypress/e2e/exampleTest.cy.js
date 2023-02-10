describe('Multi-Select Dropdown Test Suite', () => {

    // Locators
    productsSelect = cy.get('#products-dropdown'),
    optionSelectProducts = cy.get('#products-dropdown option')

    beforeEach(() => {
        cy.url().should('eq', Cypress.config().baseUrl + '/containerList')
        cy.title().should('eq', 'Cargo Containers List')
        cy.RemoveProductFilters()
        cy.viewport(1280, 1000)
        products = cy.fixture('products.json').as('products');
    })

    it('Verify that the drop-down menu has been changed from a single select to a multi-select', () => {
        productsSelect.should('have.attr', 'multiple', 'multiple');
    });

    it('Verify that the search function is working as expected for the options within the drop-down menu', () => {
        producto = products[0]
        productsSelect.select( producto );
        optionSelectProducts.should('contain', producto);
    });

    it('Verify that the API has changed to receive multiple values to filter the list of shipments/containers', () => {
        cy.server();
        cy.route('GET', '/api/shipments?product=product1&product=product2').as('getShipments');

        productsSelect.select(['product1', 'product2']);
        cy.wait('@getShipments');
        cy.get('@getShipments').its('request.url').should('include', 'product=product1&product=product2');
    });

    it('Verify that the search function has been changed to allow for multiple values instead of a single value', () => {
        productsToSelect = [products[3], products[4]]

        optionSelectProducts.should('contain', productsToSelect[0]);
        optionSelectProducts.should('contain', productsToSelect[1]);
    });

    it('Test that selecting multiple options from the drop-down menu filters the list of shipments/containers correctly', () => {
        productsSelect.select( [products[0], products[1]] )
        cy.get('.shipment-item').should('have.length', 50);

        cy.get('.shipment-item-available').each(($el) => {
            expect($el).to.have.text('Product A')
            .or($el).to.have.text('Product B');
        });
    });

    it('Test that the drop-down menu works correctly with all types of products', function () {
        cy.get(products).select(products);
        cy.get('.shipment-item').should('have.length', 100);
    });

    it('Test the performance of the drop-down menu with a large number of options', () => {
        const startTime = Cypress.moment();
        productsSelect.select(products);
        cy.get('.shipment-item').should('have.length', 100);
        const endTime = Cypress.moment();
        const duration = endTime - startTime;
        expect(duration).to.be.lessThan(5000);
    });

})