describe("Booking Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.contains("No reservations have been booked; add an item");
  });

  it("adds a booking correctly", () => {
    cy.get(`[data-testid="fab-button"]`).click();
    // adding booking and select first option: santos
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();
    cy.contains("Santos");
  });

  it("edits a booking correctly", () => {
    // open the modal
    cy.get(`[data-testid="fab-button"]`).click();

    // adding a booking
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();
    cy.contains("Santos");

    // clicking item and editing name
    cy.get('[data-testid="card-item-container"]').click();
    cy.get('[role="combobox"]').click().get('[data-value="2"]').click();
    cy.get("button").contains("Edit").click();
    cy.contains("Miami");
  });

  it("deletes a booking item correctly", () => {
    // adding a item
    cy.get(`[data-testid="fab-button"]`).click();
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();

    // clicking and delete
    cy.get('[data-testid="card-item-container"]').click();
    // delete
    cy.get("button").contains("Delete").click();
    cy.contains("No reservations have been booked; add an item");
  });

  it("disables confirm button when selecting overlapping date range in a booking and show the error label", () => {
    cy.get(`[data-testid="fab-button"]`).click();
    // adding booking and select first option: santos
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();

    cy.get(`[data-testid="fab-button"]`).click();
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();

    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("17")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("22")
      .click();
    cy.contains("Incorrect entry.");
    cy.get("button").contains("Confirm").should("have.attr", "disabled");
  });

  it("search bookings correctly", () => {
    cy.get(`[data-testid="fab-button"]`).click();
    // adding booking and select first option: santos
    cy.get('[role="combobox"]').click().get('[data-value="1"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();

    cy.get(`[data-testid="fab-button"]`).click();
    // adding booking and select first option: miami
    cy.get('[role="combobox"]').click().get('[data-value="2"]').click();
    cy.get('input[name="from"]')
      .click()
      .get('[role="option"]')
      .contains("18")
      .click();
    cy.get('input[name="to"]')
      .click()
      .get('[role="option"]')
      .contains("21")
      .click();
    cy.get("button").contains("Confirm").click();

    // checking 2 items
    cy.get("#list-booking > li").should("have.length", 2);

    cy.get("#input-search").type("santos");
    // checking 1 item after filter
    cy.get("#list-booking > li").should("have.length", 1);
  });
});
