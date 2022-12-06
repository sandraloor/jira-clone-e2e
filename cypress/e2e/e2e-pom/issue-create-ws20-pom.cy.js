/**
 * Workshop #20
 * Task #1. Observe Jira app and try to add new issue (click on “Create issue” button on issue creation page) without any fields changed. Locate mandatory fields and create new spec file and test for that case. Expected result: Issue is not created, system showed error message and fields are in error state.
 * 
 * Task #2. Choose issue type “Task”, fill all needed mandatory fields with a help of random data plugin, Create new issue. Expected result: Issue is created, issue is visible on the board. Validated issue information is correct (on the board). Bonus task: validated that issue icon is Task icon.
 * 
 * Task #3. Create issue with type “Bug”, priority “Highest”, reporter “Pickle Rick”. All the rest mandatory data should be filled in with random data plugin. Expected result: Issue is created, issue is visible on the board. Validated issue information is correct (on the board). Bonus: validated that issue icon is Bug icon.
 * 
 */

import IssueModal from "../../pages/IssueModal";
import { faker } from '@faker-js/faker';

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
          cy.contains('This is an issue of type: Task.').click();
    });



});
