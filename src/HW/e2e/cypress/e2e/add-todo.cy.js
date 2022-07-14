describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  
    it("Should add a new todo", () => {
      const newItem = 'Feed the cat';
      cy.get('input#taskInput').type(`${newItem}`);
       cy.get('button#search-icon-legacy').click()
    });



    it("Should add a new pokemon with enter key", () => {
      const newItem = '31';
      cy.get('input#taskInput').type(`${newItem}{enter}`);
    });
  });

 



