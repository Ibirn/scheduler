describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt='Add']")
      .first()
      .click()
      .get("[data-testid=student-name-input]")
      .type("Rustybells Kringlebag")
      .get("[alt='Tori Malcolm']")
      .click();
    cy.contains(/save/i).click();
    cy.contains(/Saving/i).should("not.exist");
    cy.contains("Rustybells Kringlebag");
    cy.contains("Tori Malcolm");
  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']")
      .first()
      .click({ force: true })
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Rustybells Kringlebag")
      .get("[alt='Tori Malcolm']")
      .click();
    cy.contains(/save/i).click();
    cy.contains(/Saving/i).should("not.exist");
    cy.contains("Rustybells Kringlebag");
    cy.contains("Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").first().click({ force: true });
    cy.contains(/Confirm/i).click();
    cy.contains(/Deleting/i).should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
