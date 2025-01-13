describe('Boundary Editor', () => {

    beforeEach(() => {
        cy.visit('/');
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
    });
});