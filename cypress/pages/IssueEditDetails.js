import { faker } from '@faker-js/faker';

class IssueEditDetails {
    constructor() {
        this.issueDetailsModal = '[data-testid="modal:issue-details"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTypeStory = '[data-testid="select-option:Story"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.issueStatus = '[data-testid="select:status"]';
        this.statusTypeDone = '[data-testid="select-option:Done"]';
        this.assignee = '[data-testid="select:assignees"]';
        this.assigneeLordGaben = '[data-testid="select-option:Lord Gaben"]';
        this.assigneeBabyYoda = '[data-testid="select-option:Baby Yoda"]';
        this.assigneePickleRick = '[data-testid="select-option:Pickle Rick"]';
        this.reporter = '[data-testid="select:reporter"]';
        this.issuePriority = '[data-testid="select:priority"]';
        this.priorityMedium = '[data-testid="select-option:Medium"]';
        this.shortSummary = 'textarea[placeholder="Short summary"]';
        this.title = faker.word.adjective();
        this.description = faker.hacker.phrase();
        this.descriptionField = '.ql-snow';
        this.editDescription = '.ql-editor';
        this.saveButton = '.dIxFno';
        this.trashIcon = '[data-testid="icon:trash"]'
        this.confirmationModal = '[data-testid="modal:confirm"]'
    }

    getIssueDetailsModal() {
        return cy.get(this.issueDetailsModal);
    }

    getConfirmationModal() {
        return cy.get(this.confirmationModal);
    }

    changeTypeToStory() {
        cy.get(this.issueType).click('bottomRight');
        cy.get(this.issueTypeStory)
            .trigger('mouseover')
            .trigger('click');
        cy.get(this.issueType).should('contain', 'Story');
    }

    changeStatusToDone() {
        cy.get(this.issueStatus).click('bottomRight');
        cy.get(this.statusTypeDone).click();
        cy.get(this.issueStatus).should('have.text', 'Done');
    }

    changeAssigneesToBabyYodaAndLordGaben() {
        cy.get(this.assignee).click('bottomRight');
        cy.get(this.assigneeLordGaben).click();
        cy.get(this.assignee).click('bottomRight');
        cy.get(this.assigneeBabyYoda).click();
        cy.get(this.assignee).should('contain', 'Baby Yoda');
        cy.get(this.assignee).should('contain', 'Lord Gaben');  
    }

    changeReporterToPickleRick() {
        cy.get(this.reporter).click('bottomRight');
        cy.get(this.assigneePickleRick).click();
        cy.get(this.reporter).should('have.text', 'Pickle Rick');
  
    }

    changePriorityToMedium() {
        cy.get(this.issuePriority).click('bottomRight');
        cy.get(this.priorityMedium).click();
        cy.get(this.issuePriority).should('have.text', 'Medium');
    }

    updateIssue() {
        this.getIssueDetailsModal().within(() => {
            this.changeTypeToStory();
            this.changeStatusToDone();
            this.changeAssigneesToBabyYodaAndLordGaben();
            this.changeReporterToPickleRick();
            this.changePriorityToMedium();
        });
    }

    updateTitle() {
        cy.get(this.shortSummary).clear().type(this.title).blur();
    }

    updateDescription() {
        cy.get(this.descriptionField).click().should('not.exist');
    }
    
    typeDescription() {
        cy.get(this.editDescription).clear().type(this.description);
    }

    saveDescription() {
        cy.get(this.saveButton).click().should('not.exist');
    }

    assertTitle() {
        cy.get(this.shortSummary).should('have.text', this.title);
    }

    assertDescription() {
        cy.get(this.descriptionField).should('have.text', this.description);
    }

    updateTitleAndDescription() {
        this.getIssueDetailsModal().within(() => {
            this.updateTitle();
            this.updateDescription();
            this.typeDescription();
            this.saveDescription();
            this.assertTitle();
            this.assertDescription();
        });
    }

    clickTrashIcon() {
        cy.get(`button ${this.trashIcon}`).click();
    }

    deleteIssue() {
        cy.get(this.saveButton).click();
    }

    assertDeleting() {
        cy.get(this.confirmationModal).should('not.exist');
    }

    assertTitleGone() {
        cy.contains('This is an issue of type: Task.').should('not.exist');
    }

    findAndClickTrashIcon() {
        this.getIssueDetailsModal().within(() => {
            this.clickTrashIcon();
        });
    }

    deleteIssueAndAssert() {
        this.getConfirmationModal().within(() => {
            this.deleteIssue();
            this.assertDeleting();
            this.assertTitleGone();
        });
    }

    cancelDeletingAndAssert() {
        cy.get(this.confirmationModal).contains('button', 'Cancel').click();
        cy.get(this.issueDetailsModal).should('be.visible');
    }

}

export default new IssueEditDetails()