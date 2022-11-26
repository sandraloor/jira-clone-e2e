import IssueEditDetails from "../pages/IssueEditDetails";

/**
 * Workshop #15
 * 1. Start creating classes for testable objects, such as "Issue"
 * 2. Move test actions into functions as we did on demo previously
 *    2.1 Update issue type, description etc.
 * 3. Use those functions in the spec file
 *
 * Expected result:
 * 1. New class with methods for updating title, description etc.
 * 2. Variables correctly stored
 *    Bonus: used random data generator library (faker.js)
 */

/**
 * Workshop #16
 * Task #1
 * 1. Look for previously created method for validating information in the field (any field)
 *    1.1 One of them was: cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
 * 2. Define an object with expected information in the style: selector/it's value
 * 3. Update method to go over this object and assert information in the field using "for..of" loop
 *
 * Expected result:
 * 1. You will have defined object with at least priority, status and reporter selectors and their values
 * 2. Your method runs X amount of times and assert information in the field without code duplication
 *
 * Task #2
 * Most of the field in this file are using should('have.text') assertion, however, there are some which uses should('contain')
 * From the previous task expand the solution with "if" check which would allow us to assert using different should assertion but still keep all the code inside one loop without creating separated assertion
 *
 * Expected result:
 * 1. Previously created method will have more selectors included in the object (for example, assignees are added)
 */

describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project/').then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
      IssueEditDetails.updateIssue(); // changes issue type to Story and issue status to Done, adds Lord Gaben and Baby Yoda as assignees, then changes reporter to Pickle Rick and priority to Medium
      cy.log('Result: Issue type should be Story, status Done, Lord Gaben and Baby Yoda should be added as assignees, reporter Pickle Rick and priority Medium');
  });

  it('Should update title, description successfully', () => {
      IssueEditDetails.updateIssueTitleDescription(); // updates the issue title and description fields, clears and submits description, then saves description, and then asserts title and description fields
      cy.log('Result: Title field should display an adjective from @faker-js/faker and description field should display a hacker phrase from @faker-js/faker');
  });

  it('Should delete an issue successfully', () => {
      IssueEditDetails.deleteIssueFindTrashIcon(); // finds Trash icon in the issue modal and clicks on it
      IssueEditDetails.deleteIssueAndAssert(); // clicks on Delete button to confirm and asserts deleting
      cy.log('Result: An opened issue was deleted');
  });

  });