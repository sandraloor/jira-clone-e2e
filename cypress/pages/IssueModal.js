class IssueModal {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTypeStory = '[data-testid="select-option:Story"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.assigneeLordGaben = '[data-testid="select-option:Lord Gaben"]';
        this.submitButton = 'button[type="submit"]';
    }

    getIssueModal() {
        return cy.get(this.issueModal);
    }

    selectIssueType() {
        cy.get(this.issueType).click('bottomRight');
        cy.get(this.issueTypeStory)
            .trigger('mouseover')
            .trigger('click');
    }

    editTitle(title) {
        cy.get(this.issueTitle).type(title);
    }

    editDescription(description) {
        cy.get(this.issueDescription).type(description);
    }

    selectAssignee() {
        cy.get(this.assignee).click('bottomRight');
        cy.get(this.assigneeLordGaben).click();  
    }

    createIssue(title, description) {
        this.getIssueModal().within(() => {
            this.selectIssueType();
            this.editTitle(title);
            this.editDescription(description);
            this.selectAssignee();
            cy.get(this.submitButton).click();
        });
    }
}

export default new IssueModal();