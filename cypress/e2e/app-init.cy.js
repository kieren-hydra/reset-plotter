describe('App Initialization', () => {

    it('should load the map and the dashboard', () => {

        cy.visit('/');
        cy.get('[data-cy="google-map"]').should('exist');
        cy.get('[data-cy="dashboard"]').should('exist');
    })
});




