import Login from "~/pages/login";
import Register from "~/pages/register";
import { signIn } from "next-auth/react";

describe("LoginPage", () => {
  it("Submit Button", () => {
    cy.mount(<Login />);
    cy.get("button").click().should("not.respondTo");
  });
  /* 
  it("Submit Button with input", () => {
    cy.mount(<Login />);
    cy.get('input[name="email"]').type("abc@example.com");
    cy.get('input[name="password"]').type("Password1");
    cy.get("button").click().should('');
  });*/
});

describe("RegisterPage", () => {
  it("Submit Button", () => {
    cy.mount(<Register />);
    cy.get("button").click().should("not.respondTo");
  });
});
