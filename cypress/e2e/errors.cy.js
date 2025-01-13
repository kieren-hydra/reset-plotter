describe('Error Handling', () => {

    it.skip('should show a loader then an error message if the dashboard fails to load', () => {

        cy.intercept('GET', '/api/test', {
            statusCode: 500, // Simulate a server error
            body: {error: 'Simulated Failure'},
        });

        cy.visit('/');

        cy.get('[data-cy="loader"]').should('exist');

        cy.get('[data-cy="error"]', {timeout: 12000}).should('exist');
    });

    it('should return to homepage if a non-existent page is navigated to',  () => {

        cy.visit("some-wrong-route")

        cy.url().should("equal", "http://localhost:5173/?map_mode=view")
    });
});