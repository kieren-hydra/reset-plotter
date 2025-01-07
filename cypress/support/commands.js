/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('selectFirstCompany', () => {
    cy.get('[data-cy="company-item"]').first().click();
});

Cypress.Commands.add('selectFirstSite', () => {
    cy.selectFirstCompany();
    cy.get('[data-cy="site-item"]').first().click();
});

Cypress.Commands.add('enterEditorMode', () => {
    cy.selectFirstSite();
    cy.get('button').contains('Geofence Editor')
        .should('be.visible')
        .and('not.be.disabled')
        .click();
})

Cypress.Commands.add('openPinEditor', () => {
    cy.enterEditorMode();
    cy.get('div[role="button"]').first().within(() => {
        cy.get('img').should('exist');
    }).should('exist').and('be.visible');
});

Cypress.Commands.add('getVertexCount', () => {
    return cy.get('div[role="button"]').then(($vertices) => $vertices.length);
});

Cypress.Commands.add('verifyVertexCount', (expectedCount) => {
    cy.get('div[role="button"]').should('have.length', expectedCount);
});

Cypress.Commands.add('addVertex', (clickPosition = 'topLeft') => {
    cy.get('[data-cy="google-map"]')
        .should('exist')
        .click(clickPosition);
});