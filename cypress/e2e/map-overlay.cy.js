describe('Map Overlay', () => {

    beforeEach(() => {
        cy.visit('/');

    });

    afterEach(() => {
        cy.clearLocalStorage('reset-plottr-store');
    });

    describe('In boundary editor mode', () => {

        beforeEach(() => {
            cy.enterEditorMode();
        });

        it('should remove the last vertex if the "Undo Add Pin" button is clicked', () => {

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

        it('should possible to reload from live if vertex has been added', () => {

            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('be.disabled');

            cy.addVertex();
            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('not.be.disabled')
        });

        it('should show a warning modal when reloading from live', () => {
            cy.addVertex();
            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('not.be.disabled')
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("exist")
                .and("be.visible")
        });
        //see modals.cy.js for testing of modal actions - KACM
    });

    describe('In pin editor mode', () => {

        beforeEach(() => {
            cy.openPinEditor();
        });

        it('should move the pin if "Move Pin" is clicked and then the map is clicked', () => {
            cy.getPinPosition().then(initialPosition => {

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

                cy.get('[data-cy="undo-btn"]')
                    .should('exist')
                    .and('be.visible')
                    .click();

                // Compare the new top and left properties
                cy.get('div[role="button"]').first().then(($pin) => {
                    const newPosition = {
                        top: $pin.css('top'),
                        left: $pin.css('left'),
                    };

                    // Assert that the top and left properties have not changed
                    expect(newPosition.top).to.equal(initialPosition.top);
                    expect(newPosition.left).to.equal(initialPosition.left);
                });
            });
        });

        it('should possible to reload from live if a pin has been moved', () => {

            cy.get('[data-cy="pin-move"]')
                .should('exist')
                .and('be.visible')
                .click({force: true});

            cy.get('[data-cy="pin-editor"]').should('not.exist');

            // Click on the map
            cy.get('[data-cy="google-map"]')
                .should('exist')
                .click(200, 350);

            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('not.be.disabled')

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

        it('should possible to reload from live if a pin has been deleted', () => {

            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('be.disabled');

            cy.get('[data-cy="pin-delete"]')
                .should('exist')
                .and('be.visible')
                .click({force: true});

            cy.get('[data-cy="reload-btn"]')
                .should('exist')
                .and('be.visible')
                .and('not.be.disabled')
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