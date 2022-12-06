/**
 * Workshop #22
 * Task #1. Delete recently created issue. Create new issue for tests in beforeEach().
 * 
 * Task #2. Start deletion process for recently created issue, but cancel it.
 * 
 * Task #3. Push your newly created spec file with all today’s tests to your repository master. 
 * 
 */

 import IssueEditDetails from "../../pages/IssueEditDetails";

describe('Deleting issue and Cancel deletion', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('This is an issue of type: Task.').click();
    });

    it('Should delete an issue successfully', () => {
        IssueEditDetails.findAndClickTrashIcon(); // finds Trash icon in the issue modal and clicks on it
        IssueEditDetails.deleteIssueAndAssert(); // clicks on Delete button to confirm and asserts deleting
        cy.log('Result: An opened issue was deleted');
    });

    it('Start deletion process but cancel it', () => {
        IssueEditDetails.findAndClickTrashIcon(); // finds Trash icon in the issue modal and clicks on it
        IssueEditDetails.cancelDeletingAndAssert(); // clicks on Cancel button and asserts that the issue modal is visible
        cy.log('Result: Issue modal is visible');
    });

});
