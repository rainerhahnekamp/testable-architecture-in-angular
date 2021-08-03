it('should test the holidays component', () => {
  cy.viewport(1200, 1300);
  cy.visit('http://localhost:4400/iframe.html?path=/story/eternal-component-holidays--default');
  cy.get('[data-test=holiday-1] button').click();
  cy.get('[data-test=address]').type('Domgasse 5, 1010 Wien');
  cy.get('[data-test=btn-submit').click();
  cy.get('.mat-snack-bar-container').should('contain.text', 'Brochure has been sent');
});
