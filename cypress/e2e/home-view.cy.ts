describe('Homepage', () => {
    it('Displays the homepage hero component', () => {
        // Visit the homepage
        cy.visit('/');
        // Check that the hero is showing
        cy.contains('.hero', 'Welcome to the computer science blog');
    });

    it('Displays latest blog articles', () => {
        cy.intercept('/api/articles*').as('getArticles');
        // Visit homepage
        cy.visit('/');
        // Wait for the articles to load
        cy.wait('@getArticles').then(() => {
            // Check that the 3 recent articles are showing
            cy.get('.CardList').children().should('have.length', 3);
        });
    });
});
