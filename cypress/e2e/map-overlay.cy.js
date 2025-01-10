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

        it('should only be possible to reload from live if changes have been made', () => {

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