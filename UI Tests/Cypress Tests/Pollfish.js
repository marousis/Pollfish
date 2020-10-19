const uniqueEmail = require("./registration-email");
const loginRequest = require("./login");
describe("Pollfish UI Tests", function() {
  it("User completes the registration, succesfully", function() {
    // Cypress.config("chromeWebSecurity", false);
    // cy.viewport(2880, 1800);
    cy.visit("https://www.pollfish.com");
    cy.contains("Register").click();
    cy.get(".pf-form__textfield__input").type(uniqueEmail);
    cy.contains("Register").click();
    cy.get(".pf-form__textfield__input").type("marousispassword");
    cy.contains("Next").click();
    cy.get(".pf-form__textfield__input").type("Panagiotis Marousis");
    cy.contains("Next").click();
    cy.get(".pf-form__textfield__input").type("MyOwnCompany");
    cy.contains("Next").click();
    cy.get(":nth-child(1) > .radio-button__input").click();
    cy.contains("Next").click();
    cy.get(".css-bg1rzq-control").click();
    cy.contains("Other").click();
    cy.contains("Next").click();
    cy.get(".checkbox__active-state").click();
    cy.get(".pf-form__textfield-button--submit").click();
    cy.request("https://www.pollfish.com/dashboard/surveys/")
      .its("body")
      .should("include", "Pollfish - Researcher Dashboard");
  });
  it("User creates a survey", function() {
    // Cypress.config("chromeWebSecurity", false);
    // cy.viewport(2880, 1800);
    loginRequest.loginRequest({
      email: "fasfasfas@sadfasdf.gr",
      password: "fadfasdfasd"
    });
    cy.visit("https://www.pollfish.com/dashboard/surveys/");
    cy.get("[data-testid=open-create-survey-modal]").click();
    cy.get(".flex > .ant-input").type("Cypress-test");
    cy.get("[data-testid=create-regular-survey]").click();
    cy.wait(2000);
    cy.go("back");
    cy.get(".pf-layout-without-sidebar > :nth-child(2)").should(
      "contain",
      "Cypress-test"
    );
  });
  it("User loges out", function() {
    // Cypress.config("chromeWebSecurity", false);
    // cy.viewport(2880, 1800);
    loginRequest.loginRequest({
      email: "fasfasfas@sadfasdf.gr",
      password: "fadfasdfasd"
    });
    cy.visit("https://www.pollfish.com/dashboard/surveys/");
    cy.get(".pf-header__drop-down > .ant-btn").click();
    cy.contains("Logout").click();
    cy.get(".header").should("contain", "Log in");
  });
});
