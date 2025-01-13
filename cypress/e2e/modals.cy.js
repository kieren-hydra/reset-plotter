describe('Modal Interactions', () => {

    beforeEach(() => {
       cy.visit('/');
    });

    afterEach(() => {
        cy.clearLocalStorage();
    });

    describe('Boundary reload from live', () => {

        beforeEach(() => {
            cy.enterEditorMode();
            cy.addVertex();
            cy.get('[data-cy="reload-btn"]').click();
        });

        it('should close the modal if the "X" button is clicked', () => {

            cy.get('[data-cy="close-modal-btn"]')
                .should('exist')
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("not.exist")
        });

        it('should close the modal if the "Back to..." button is clicked', () => {

            cy.get('[data-cy="back-modal-btn"]')
                .should('exist')
                .click();

            cy.get('[data-cy="warning-modal"]')
                .should("not.exist")
        });

        it('should require the checkbox to be ticked to reload', () => {

            cy.get('[data-cy="reload-modal-btn"]')
                .should('be.disabled');
        });

        it('should delete any changes if reloading from live', () => {

            cy.getVertexCount().then((initialVertexCount) => {
                cy.get('[data-cy="modal-checkbox"]')
                    .should('exist')
                    .click();
                cy.get('[data-cy="reload-modal-btn"]')
                    .should('exist')
                    .and('not.be.disabled')
                    .click();

                //the added vertex should have been removed when the boundary is reloaded from live - KACM
                cy.verifyVertexCount(initialVertexCount - 1);
            });
        });
    });
});