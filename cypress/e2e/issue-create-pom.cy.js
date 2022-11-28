import IssueModal from "../pages/IssueModal";

describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.wait('@currentUserApiRequest')
        cy.visit(url + '/settings?modal-issue-create=true');
      });
    });
  
    it('Should create an issue and validate it successfully', () => {
        IssueModal.createIssue('TITLE', 'DESCRIPTION');
    });
  });
  