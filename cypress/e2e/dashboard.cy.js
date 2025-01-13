describe('Dashboard Interactions', () => {

    beforeEach(() => {
        cy.visit('/');
    });

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
        cy.get('[data-cy="site-item"]')
            .first()
            .click();
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

    describe('In boundary editor mode', () => {

        it('should show a warning modal when selecting a the SAME company if there is an unsaved boundary', () => {

            cy.enterEditorMode();
            cy.addVertex();
            cy.get('[data-cy="company-item"]')
                .first()
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("exist")
        });

        it('should show a warning modal when selecting a NEW company if there is an unsaved boundary', () => {

            cy.enterEditorMode();
            cy.addVertex();

            //select the second company, whilst the first company/site has been edited
            cy.get('[data-cy="company-item"]')
                .eq(1)
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("exist")
        });

        it('should show a warning modal when selecting a new site if there is an unsaved boundary', () => {

            cy.enterEditorMode();
            cy.addVertex();

            cy.get('[data-cy="site-item"]')
                .eq(1)
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("exist")
        });

        it.skip('should show a warning modal when selecting a terminal if there is an unsaved boundary', () => {

            //TODO : Add test logic - KACM
        });
    });

    describe.skip('In terminal editor mode', () => {

        //TODO: Add relevant tests - KACM
    });
});