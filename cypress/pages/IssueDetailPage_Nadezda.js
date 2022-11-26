class IssueDetailModal {
    constructor() {
        this.issueDetailsModal = '[data-testid="modal:issue-details"]';
        this.type = '[data-testid="select:type"]';
        this.option = '[data-testid="select-option:';
        this.status = '[data-testid="select:status"]';
        this.assignees = '[data-testid="select:assignees"]';
        this.reporter = '[data-testid="select:reporter"]';
        this.priority = '[data-testid="select:priority"]';
        this.title = 'textarea[placeholder="Short summary"]';
        this.descriptionSavedField = '.ql-snow';
        this.descriptionEditingField = '.ql-editor';
        this.deleteIcon = 'button [data-testid="icon:trash"]';
        this.confirmationModal = '[data-testid="modal:confirm"]';

    }

    getIssueDetailModal() {
        return cy.get(this.issueDetailsModal);
    }

    deleteIssue() {
        cy.get(this.deleteIcon).click();
        cy.get(this.confirmationModal).should('be.visible');
        cy.get(this.confirmationModal).contains('button', 'Delete issue')
            .click();
        cy.get(this.confirmationModal).should('not.exist');
    }

    updateIssueTypeTo(type) {
        this.clickOnIssueTypeField();
        this.chooseIssueProperty(type);
        this.ensureIssueTypeIsUpdatedTo(type);
    }

    updateIssueStatusTo(status) {
        this.clickOnIssueStatusField();
        this.chooseIssueProperty(status);
        this.ensureIssueStatusIsUpdatedTo(status);
    }

    addIssueAssignee(assigneeName) {
        this.clickOnIssueAssigneeField();
        this.chooseIssueProperty(assigneeName);
        this.ensureAssigneesListcontains(assigneeName);
    }

    updateIssueReporterTo(reporterName) {
        this.clickOnIssueReporterField();
        this.chooseIssueProperty(reporterName);
        this.ensureIssueReporterIsUpdatedTo(reporterName);
    }

    updateIssuePriorityTo(priority) {
        //the system should update property only, if current value 
        //is not equal to required
        cy.get(this.priority).invoke('text').then((extractedText) => {
            if (extractedText != priority) {
                this.clickOnIssuePriorityFieldIfNotYetChosen(priority);
                this.chooseIssuePriority(priority);
                this.ensureIssuePriorityIsUpdatedTo(priority);
            }
        });

    }

    updateIssueTitleTo(title) {
        cy.get(this.title).clear().type(title).blur();
        this.ensureIssueTitleIsUpdatedTo(title);

    }

    updateIssueDescriptionTo(description) {
        cy.get(this.descriptionSavedField).click().should('not.exist');
        this.ensureDesciptionEditingFieldIsVisible();
        cy.get(this.descriptionEditingField).clear().type(description);
        this.clickOnDescriptionSaveButton();
        this.ensureIssueDescriptionIsUpdatedTo(description);

    }

    clickOnIssueField(selector) {
        cy.get(selector).click('bottomRight');
    }

    clickOnIssueTypeField() {
        this.clickOnIssueField(this.type);
    }

    clickOnIssueStatusField() {
        this.clickOnIssueField(this.status);
    }

    clickOnIssuePriorityFieldIfNotYetChosen() {
        cy.get(this.priority).click('bottomRight');
    }

    clickOnIssueReporterField() {
        this.clickOnIssueField(this.reporter);
    }

    clickOnIssueAssigneeField() {
        this.clickOnIssueField(this.assignees);
    }

    chooseIssueProperty(selectorsPart) {
        cy.get(this.option + selectorsPart + "\"]").trigger('mouseover')
            .trigger('click');
    }


    chooseIssuePriority(priority) {
        cy.get(this.option + priority + "\"]").trigger('mouseover')
            .trigger('click');
    }

    ensureIssueTypeIsUpdatedTo(type) {
        cy.get(this.type).should('contain', type);
    }

    ensureAssigneesListcontains(name) {
        cy.get(this.assignees).should('contain', name);
    }

    ensureIssueStatusIsUpdatedTo(status) {
        cy.get(this.status).should('have.text', status);
    }

    ensureIssueReporterIsUpdatedTo(reporterName) {
        cy.get(this.reporter).should('have.text', reporterName);
    }

    ensureIssuePriorityIsUpdatedTo(priority) {
        cy.get(this.priority).should('have.text', priority);
    }

    ensureIssueTitleIsUpdatedTo(title) {
        cy.get(this.title).should('have.text', title);
    }

    ensureIssueDescriptionIsUpdatedTo(description) {
        cy.get(this.descriptionSavedField).should('have.text', description);
    }

    ensureDesciptionEditingFieldIsVisible() {
        cy.get(this.descriptionEditingField).should('be.visible');
    }

    ensureDesciptionSavedFieldIsNotVisible() {
        cy.get(this.descriptionSavedField).should('not.be.visible');
    }

    clickOnDescriptionSaveButton() {
        cy.contains('button', 'Save')
            .click().should('not.exist');
    }
}

export default new IssueDetailModal();