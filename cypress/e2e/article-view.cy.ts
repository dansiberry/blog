describe('Article page', () => {
    it('Displays the article page headline', () => {
        cy.intercept('/api/article/*').as('getArticle');
        cy.visit('/article/getting-started-with-cloud-computing');
        cy.wait('@getArticle').then(() => {
            cy.contains('h1', 'Getting Started with Cloud Computing');
        });
    });
});
