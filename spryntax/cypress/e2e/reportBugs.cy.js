///spryntax/test/reportBug.cy.js
/// <reference types="cypress" />

describe('Report a Bug Feature Tests', () => {
    //
    // 1. "Unit" Test (Unconventional in Cypress)
    //
    // Cypress is typically used for E2E/integration tests. However, you *can* do 
    // a simple "unit-like" test if your code is bundled in a way that you can import it here.
    // This example is purely illustrative.  
    //
    it('Unit Test: validateReportInput function should fail if fields are missing', () => {
      // Example "unit" function (inline):
      function validateReportInput(data) {
        if (!data || !data.name || !data.problem) return false;
        if (data.name.length > 50 || data.problem.length > 1000) return false;
        return true;
      }
  
      expect(validateReportInput({ problem: 'Bug only' })).to.equal(false);
      expect(validateReportInput({ name: 'Tester' })).to.equal(false);
      // Valid data should pass
      expect(validateReportInput({ name: 'Tester', problem: 'Bug desc' })).to.equal(true);
    });
  
    //
    // 2. Validation Test: Required Fields, Character Limits, etc.
    //
    // For validation, we'll do a direct check in the UI + server response.
    //
    it('Validation Test: Submitting empty fields should show an error', () => {
      // Visit the report bug page
      cy.visit('http://localhost:8080/report');   // e.g. http://localhost:3000/report
      // Leave the "Username" or "Bug description" field empty
      cy.get('input#name').clear();
      cy.get('textarea#problem').clear();
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // We expect the page to show a client-side error OR the server to respond with an error
      // If there's a client-side validation message, check it:
      // For example, you might have something like:
      // <div id="error-message">Missing fields</div>
      cy.contains('Missing fields').should('be.visible');
    });
  
    //
    // 3. Integration Test: Full Form Submission => Hitting /report endpoint => DB side
    //
    // This time, we'll fill the form properly and ensure the server responds with success.
    // You can also intercept the network request to confirm the payload or check the DB if you have an API for that.
    //
    it('Integration Test: Submitting valid data calls the /report endpoint and returns success', () => {
      cy.visit('http://localhost:8080/report');
  
      // Fill out form
      cy.get('input#name').type('CypressUser');
      cy.get('textarea#problem').type('Example bug description in Cypress.');
  
      // Optionally, watch the request
      cy.intercept('POST', '/report').as('reportRequest');
  
      // Submit
      cy.get('button[type="submit"]').click();
  
      // Wait for the request, check the response
      cy.wait('@reportRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        // If your server returns a JSON body like { message: 'Report created' },
        // check that:
        expect(interception.response.body).to.have.property('message', 'Report created');
      });
    });
  
    //
    // 4. System Test: End-to-End in a Real Browser
    //
    // Here we test the *entire* flow from the user's perspective.
    // We'll check that the page loads, can be typed into, and
    // after submission, we see a success message or a redirect.
    //
    it('System Test: Visually confirm the UI flow on /report page', () => {
      cy.visit('http://localhost:8080/report');
  
      // 1) Check the form is visible
      cy.get('h1').should('contain', 'Report Bugs');
      cy.get('input#name').should('be.visible');
      cy.get('textarea#problem').should('be.visible');
  
      // 2) Type in data
      cy.get('input#name').type('SystemTestUser');
      cy.get('textarea#problem').type('System test: page not loading on Safari');
  
      // 3) Submit the form
      cy.get('button[type="submit"]').click();
  
      // 4) Confirm success on the UI
      // e.g. if you show "Thank you for reporting this bug" on success
      cy.contains('Thank you for reporting this bug').should('be.visible');
    });
  });
  