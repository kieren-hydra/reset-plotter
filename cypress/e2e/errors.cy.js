describe('Error Handling', () => {

    it('should show a loader then an error message if the dashboard fails to load', () => {

        cy.intercept('GET', '/api/test', {
            statusCode: 500, // Simulate a server error
            body: {error: 'Simulated Failure'},
        });

        cy.visit('/');

        cy.get('[data-cy="loader"]').should('exist');

        cy.get('[data-cy="error"]', {timeout: 12000}).should('exist');
    });

    it.skip('should show a 404 page if a non-existent page is navigated to',  () => {

        //TODO: Add test logic - KACM
    });
});