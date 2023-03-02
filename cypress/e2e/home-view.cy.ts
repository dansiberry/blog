describe('Homepage', () => {
    it('Displays the homepage hero component', () => {
        cy.visit('/');
        cy.contains('.hero', 'Welcome to the computer science blog');
    });

    it('Displays latest blog articles', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/');
        cy.wait('@getArticles').then(() => {
            cy.get('.CardList').children().should('have.length', 3);
        });
    });
});
