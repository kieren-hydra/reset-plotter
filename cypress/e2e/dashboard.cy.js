describe('Dashboard Interactions', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    describe('The search bar', () => {
        //TODO : Add tests for the search bar - KACM
    });

    describe('The main dashboard', () => {

        it('should show a list of sites when a company is clicked', () => {

            cy.selectFirstCompany();
            cy.get('[data-cy="site-list"]').should('exist');
        });

        it('should collapse the list of sites when clicked again', () => {

            cy.selectFirstCompany();
            cy.get('[data-cy="site-list"]').should('exist');
            cy.selectFirstCompany();
            cy.get('[data-cy="site-list"]').should('not.exist');
        });

        it('should show the site editor and terminal list when the site is clicked', () => {

            cy.selectFirstSite();
            cy.get('[data-cy="site-editor"]').should('exist');
            cy.get('[data-cy="terminal-list"]').should('exist');
        });

        it('should hide the site editor and terminal list when the site is clicked again', () => {

            cy.selectFirstSite();
            cy.get('[data-cy="site-item"]').first().click();
            cy.get('[data-cy="site-editor"]').should('not.exist');
            cy.get('[data-cy="terminal-list"]').should('not.exist');
        });

        it('should show the geofence editor when the Geofence Editor button is clicked', () => {

            cy.selectFirstSite();
            cy.get('button').contains('Geofence Editor')
                .should('be.visible')
                .and('not.be.disabled')
                .click();

            cy.get('[data-cy="geofence-editor"]').should('exist');
        });

        it('should still show the boundary on the map when the page is refreshed', () => {
            //TODO : Add test logic - KACM
        });
    });
});