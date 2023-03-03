describe('Article page', () => {
    it('Displays the article page headline', () => {
        cy.intercept('/api/article/*').as('getArticle');
        // Visit an article
        cy.visit('/article/getting-started-with-cloud-computing');
        // Wait for the content to load from the API
        cy.wait('@getArticle').then(() => {
            // Check that the heading content is showing
            cy.contains('h1', 'Getting Started with Cloud Computing');
        });
    });
});
