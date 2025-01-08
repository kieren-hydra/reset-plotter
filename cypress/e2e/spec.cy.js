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

//TODO remove .only() when running full suite - KACM
describe.only('Map Interactions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    afterEach(() => {
        cy.clearLocalStorage('reset-plottr-store');
    });

    describe('In boundary editor mode', () => {
        beforeEach(() => {
            cy.enterEditorMode();
        })

        it('should show clickable vertices for the site boundary', () => {

            cy.get('div[role="button"]').first().within(() => {
                cy.get('img').should('exist');
            }).should('exist').and('be.visible');
        });


        it("should add a vertex when the map is clicked", () => {

            cy.getVertexCount().then((initialVertexCount) => {
                cy.addVertex();
                cy.verifyVertexCount(initialVertexCount + 1);
            });
        });

        it('should remove the last vertex if the "Undo Add Pin" button is clicked', () => {

            //TODO : Update for new dynamic undo button - KACM
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

            cy.addVertex();
            cy.undoAddVertex();
            cy.get('[data-cy="undo-btn"]')
                .should('be.disabled')
        })

        it('should open a pin editor when a vertex is clicked', () => {

            cy.get('div[role="button"]')
                .first()
                .should('exist')
                .and('be.visible')
                .click({force: true});

            cy.get('[data-cy="pin-editor"]')
                .should('exist');
        });
    });

    describe('In pin editor mode', () => {

        beforeEach(() => {
            cy.openPinEditor();
        });

        it('should close the pin editor when clicked away', () => {

            cy.get('[data-cy="pin-editor"]').should('exist');
            cy.get('[data-cy="google-map"]')
                .should('exist')
                .click('topLeft');

            cy.get('[data-cy="pin-editor"]').should('not.exist');
        });

        it('should move the pin if "Move Pin" is clicked and then the map is clicked', () => {
            let initialPosition = {};

            // Get the initial top and left CSS properties of the pin
            cy.get('div[role="button"]').first()
                .should('exist')
                .and('be.visible')
                .then(($pin) => {
                    initialPosition = {
                        top: $pin.css('top'),
                        left: $pin.css('left'),
                    };
                });

            // Click on the "Move Pin" button
            cy.get('[data-cy="pin-move"]')
                .should('exist')
                .and('be.visible')
                .click({force: true});

            cy.get('[data-cy="pin-editor"]').should('not.exist');

            // Click on the map
            cy.get('[data-cy="google-map"]')
                .should('exist')
                .click(200, 350);

            // Compare the new top and left properties
            cy.get('div[role="button"]').first().then(($pin) => {
                const newPosition = {
                    top: $pin.css('top'),
                    left: $pin.css('left'),
                };

                // Assert that the top and left properties have changed
                expect(newPosition.top).not.to.equal(initialPosition.top);
                expect(newPosition.left).not.to.equal(initialPosition.left);
            });
        });

        it('should undo moving the pin if the Undo Move Pin button is clicked', () => {

            cy.getPinPosition().then(initialPosition => {
                // Click on the "Move Pin" button
                cy.get('[data-cy="pin-move"]')
                    .should('exist')
                    .and('be.visible')
                    .click({force: true});

                // Click on the map
                cy.get('[data-cy="google-map"]')
                    .should('exist')
                    .click(200, 350);

                cy.get('[data-cy="undo-btn"]')
                    .should('exist')
                    .and('be.visible')
                    .click();

                cy.getPinPosition().then((newPosition) => {
                    expect(newPosition.top).to.equal(initialPosition.top);
                    expect(newPosition.left).to.equal(initialPosition.left);
                });
            });
        });

        it('should do nothing if the "Undo Move Pin" button is clicked again', () => {
            // Click on the "Move Pin" button
            cy.get('[data-cy="pin-move"]')
                .should('exist')
                .and('be.visible')
                .click({force: true});

            // Click on the map
            cy.get('[data-cy="google-map"]')
                .should('exist')
                .click(200, 350);

            cy.get('[data-cy="undo-btn"]')
                .should('exist')
                .and('be.visible')
                .click()

            cy.get('[data-cy="undo-btn"]')
                .should('be.disabled');

        });

        it('should delete the pin if the "Delete Pin" button is clicked', () => {

            cy.getVertexCount().then((initialVertexCount) => {
                cy.get('[data-cy="pin-delete"]')
                    .should('exist')
                    .and('be.visible')
                    .click({force: true});
                cy.verifyVertexCount(initialVertexCount - 1);
            });
        });

        it('should return the pin if the "Undo Delete Pin" button is clicked', () => {

            cy.getVertexCount().then((initialVertexCount) => {
                cy.get('[data-cy="pin-delete"]')
                    .should('exist')
                    .and('be.visible')
                    .click({force: true});

                cy.verifyVertexCount(initialVertexCount - 1);

                cy.get('[data-cy="undo-btn"]')
                    .should('exist')
                    .and('be.visible')
                    .click();

                cy.verifyVertexCount(initialVertexCount);
            });
        });

        it('should do nothing if the "Undo Delete Pin" button is clicked again', () => {

            cy.get('[data-cy="pin-delete"]')
                .should('exist')
                .and('be.visible')
                .click({force: true});

            cy.get('[data-cy="undo-btn"]')
                .should('exist')
                .and('be.visible')
                .click();

            cy.get('[data-cy="undo-btn"]')
                .should('be.disabled');
        });
    });
});

describe('Error Handling', () => {

    it('should show a loader then an error message if the dashboard fails to load', () => {

        cy.intercept('GET', '/api/test', {
            statusCode: 500, // Simulate a server error
            body: {error: 'Simulated Failure'},
        });

        cy.visit('http://localhost:5173');

        cy.get('[data-cy="loader"]').should('exist');

        cy.get('[data-cy="error"]', {timeout: 12000}).should('exist');
    });
});




