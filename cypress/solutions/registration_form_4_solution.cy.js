beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #10 analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        cy.get('#username').type(' ');
        cy.window().scrollTo('bottom');
        cy.get('h2').contains('Password section').click();
        cy.get('#input_error_message').should('be.visible');
        cy.get('#success_message').should('not.be.visible');
        cy.get('#password_error_message').should('have.css', 'display', 'none');
    });

    it('Username tooltip changes depending on input value', () => {
        // Step 1: Validate that username input has red highlight around and title is expected: "Please add username"
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username');
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)');
        // Step 2: Add username and remove it, so that validation will change title to "Input field contains not supported character"
        // Click outside the input field to trigger the update
        cy.get('#username').type('Test{enter}').clear();
        cy.get('body').click(0,0);
        // Step 3: Validate that username has expected title
        cy.get('#username').should('have.attr', 'title', 'Input field contains not supported character');
        cy.get('input[name="username"]:invalid').invoke('prop', 'validationMessage').should('contain', 'fill in this field');
    });

    it('Username support only string characters', () => {
        // Step 1: Validate initial state of username field and add symbolic input (field accepts only numbers and string)
        // Click outside the input field to trigger the update
        cy.get('input[name="username"]:invalid')
            .invoke('prop', 'validationMessage').should('not.contain', 'fill out this field');
        cy.get('input[name="username"]').type('?????');
        cy.get('body').click(0,0);
        // Step 2: Validate that username input has red highlight, that input is not correct and user sees error message
        cy.get('input[name="username"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)');
        cy.get('#input_error_message').should('be.visible').should('have.css', 'display', 'block');
        cy.get('.submit_button').should('not.be.enabled');
    });

    it('Username should have max length of 50 characters', () => {
        // Step 1: Validate min value is equal to 1
        cy.get('#username').should('have.attr', 'min', '1');
        // Step 1: Validate max value is equal to 50
        cy.get('#username').should('have.attr', 'max', '50');
    })

    it('Username should support only lower letters and numbers', () => {
        // check with regex supporter format
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        // Step 1: Validate email field has correct pattern regex (in other words: rules for the field)
        cy.get('#email').should('have.attr', 'pattern').should('contain', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$');
        cy.get('#email:invalid').invoke('prop', 'validationMessage').should('contain', 'Please fill in this field.');
        // Step 2: Type in incorrect format of email and click outside to trigger update
        cy.get('#email').type('invalid');
        cy.get('body').click(0,0);
        // Step 3: Validate email input field has red highlight and submit button is not enabled
        cy.get('#email').should('have.css', 'box-shadow').should('eq', 'rgb(255, 0, 0) 0px 0px 5px 1px');
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('Passwords cannot be empty string', () => {
        // Step 1: Enter form data, so we can check validation of password and submit button being enabled
        enterValidDataToField('username', 'John', 'Doe', 'validemail@yeap.com', '10203040', 'Hello');

        // Step 2: Clear out previously filled password field and validate that submit button is not enabled anymore
        cy.get('#password').clear();
        cy.get('#confirm').clear();
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('User cannot submit empty registration form', () => {
        cy.get('.submit_button').should('not.be.enabled');
    });

    it('HTML should be present in Web Languages radio buttons list', () => {
        // get list
        // check that at least one of elements is HTML
        cy.get('input[type=radio]').next().then(labelsOfRadioButtons => {
            console.log('Here will be radio buttons:' + `${labelsOfRadioButtons}`);
            const actual = [...labelsOfRadioButtons].map(singleRadioButtonLabel => singleRadioButtonLabel.innerText);
            // check that at least one of elements is HTML
            expect(actual).to.contain('HTML');
            // check full comparison by deeply equality check
            expect(actual).to.deep.eq(['HTML', 'CSS', 'JavaScript', 'PHP']);
        });
    });

    it('BMW should not be listed in cars list', () => {
        // Step 1: Validate the amount of options in select dropdown menu
        cy.get('#cars').children().should('have.length', 4);
        // Step 2: Validate that options is equal to expected cars options, not BMW
        cy.get('#cars').find('option').first().should('have.not.text', 'Bayerische Motoren Werke');
        cy.get('#cars').find('option').first().should('have.text', 'Volvo');
        cy.get('#cars').find('option').first().next().should('have.not.text', 'Bayerische Motoren Werke');
        cy.get('#cars').find('option').first().next().should('have.text', 'Saab');
        cy.get('#cars').find('option').first().next().next().should('have.not.text', 'Bayerische Motoren Werke');
        cy.get('#cars').find('option').first().next().next().should('have.text', 'Opel');
        cy.get('#cars').find('option').first().next().next().next().should('have.not.text', 'Bayerische Motoren Werke');
        cy.get('#cars').find('option').first().next().next().next().should('have.text', 'Audi');

        // Can be done a bit differently in a clearer way:
        cy.get('#cars').find('option').invoke('text').then((options) => {
            const expectedListOfCars = ['Volvo', 'Saab', 'Opel', 'Audi'];
            // This step transforms our options into object that we can use to assert against
            // Split method splits the whole string based on the split rule (in our case we split words when new word with uppercase started)
            // Copy this link to browser and play around this method (click on "Run" button to see results):
            // https://www.typescriptlang.org/play?#code/MYewdgzgLgBMCGAnCMC8MDkA1EAbAbiAMrzwBGAggK4AmAlgPIAOAprhgNwBQoksCyAExpMOAsVKVajVrgCy8AF414nHuGgwAtiEQsAwkhTpseQiXLV6zNgCE5AdTXq+MPRCq5Y6ARAB0EEy4dFAAFAD0oQD8qADaFAC0AFoAugCU4WncvJrunlDCPkaCAUEhEdFxiakZWS65LB5eAMwiOnqGyKXBYZEx8cnpmdz1eCx+uCAA5qEYAGJ0yLCBPW6N+QBcmDAA1GtNUHU5YxPTs0QsvDQwKyH7m9t7eV6CRxonkzMYF1c3ZbDPKBbDC7e4tLJAA
            const result = options.split(/(?=[A-Z])/);
            expect(result).to.deep.eq(expectedListOfCars);
            expect(result).to.not.contain('BMW');
            expect(result).to.not.contain('Bayerische Motoren Werke');
        });
    });

    function enterValidDataToField(userName, firstName, lastName, email, phone, password) {
        cy.get('input[data-testid="user"]').type(userName);
        cy.get('[data-cy="name"]').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('#email').type(email);
        cy.get('[data-testid="phoneNumberTestId"]').type(phone);
        cy.get('#password').type(password);
        cy.get('#confirm').type(password);
        cy.get('body').click(0,0);
        cy.get('.submit_button').should('be.enabled');
    }
})