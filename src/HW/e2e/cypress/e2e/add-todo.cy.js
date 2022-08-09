describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  
    it("Should add a new todo", () => {
      const newItem = 'shopping';
      cy.get('input#taskInput').type(`${newItem}`);
       cy.get('button#add-button').click()
    });



    it("Should add a new pokemon with enter key", () => {
      const newItem = '31';
      cy.get('input#taskInput').type(`${newItem}{enter}`);
    });
  });

 



