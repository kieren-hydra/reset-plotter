describe('App Initialization', () => {

    it('should load the map and the dashboard', () => {

        cy.visit('http://localhost:5173');
        cy.get('[data-cy="google-map"]').should('exist');
        cy.get('[data-cy="dashboard"]').should('exist');
    })
});

describe('Dashboard Interactions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
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


});

describe('Map Interactions',  () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('should show clickable vertices for the site boundary', () => {

        cy.enterEditorMode();
        cy.get('div[role="button"]').first().within(() => {
            cy.get('img').should('exist');
        }).should('exist').and('be.visible');
    });

    it("should add a vertex when the map is clicked", () => {

        cy.enterEditorMode();
        cy.getVertexCount().then((initialVertexCount) => {
            cy.addVertex();
            cy.verifyVertexCount(initialVertexCount + 1);
        });
    });

    it('should remove the last vertex if the undo button is clicked', () => {

        cy.enterEditorMode();
        cy.addVertex();
        cy.getVertexCount().then((initialVertexCount) => {
            cy.get('[data-cy="undo-btn"]')
                .should('exist')
                .click();
            cy.verifyVertexCount(initialVertexCount - 1);

            cy.get('div[role="button"]').last().within(() => {
                cy.get('img').should('exist');
            });
        });
    });

    it('should not remove a vertex that has not just been added', () => {

        cy.enterEditorMode();
            cy.addVertex();
            cy.undoAddVertex();
            cy.get('[data-cy="undo-btn"]')
                .should('be.disabled')
    })

    it('should open a pin editor when a vertex is clicked', () => {

        cy.openPinEditor().click({force: true});
        cy.get('[data-cy="pin-editor"]').should('exist');
    });

    it('should close the pin editor when clicked away', () => {

        cy.openPinEditor().click({force: true});
        cy.get('[data-cy="pin-editor"]').should('exist');
        cy.get('[data-cy="google-map"]')
            .should('exist')
            .click('topLeft');
        cy.get('[data-cy="pin-editor"]').should('not.exist');

    });
});

// describe('Error Handling', () => {
//
//     it('should show a loader then an error message if the dashboard fails to load', () => {
//
//         cy.intercept('GET', '/api/test', {
//             statusCode: 500, // Simulate a server error
//             body: {error: 'Simulated Failure'},
//         });
//
//         cy.visit('http://localhost:5173');
//
//         cy.get('[data-cy="loader"]').should('exist');
//
//         cy.get('[data-cy="error"]', {timeout: 12000}).should('exist');
//     })
// });




