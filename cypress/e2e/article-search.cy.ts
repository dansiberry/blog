describe('Article search page', () => {
    it('Displays the filter and search interface', () => {
        cy.visit('/search');
        cy.get('.filters').should('exist');
    });

    it('Displays default view of latest blog articles', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            cy.get('.CardList').children().should('have.length', 6);
        });
    });

    it('Sorts articles chronologically by default', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            cy.get('.BlogCard').then(($elements) => {
                const correctOrder = $elements.get().every((card, index) => {
                    const nextCard = $elements.get()[index + 1];
                    if (!nextCard) return true;
                    const timestamp = card.dataset.timestamp;
                    const nextTimestamp = nextCard.dataset.timestamp;
                    return timestamp && nextTimestamp && new Date(timestamp) > new Date(nextTimestamp);
                });
                expect(correctOrder).to.eq(true);
            });
        });
    });

    it('Sorts articles by alphabetically when option is selected', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            cy.get('.order-by')
                .select('Title')
                .then(() => {
                    cy.get('.BlogCard h3').then(($elements) => {
                        const correctOrder = $elements.get().every((heading, index) => {
                            const nextHeading = $elements.get()[index + 1];
                            if (!nextHeading) return true;
                            return heading.innerText < nextHeading.innerText;
                        });
                        expect(correctOrder).to.eq(true);
                    });
                });
        });
    });

    it('Searches articles by query', () => {
        cy.intercept('/api/articles.json?category-id=&query=&*').as('getArticles');
        cy.intercept('/api/articles.json?category-id=&query=web&*').as('searchArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            cy.get('#search-input').type('web');
            cy.get('#search-submit').click();
            cy.wait('@searchArticles').then(() => {
                cy.get('.BlogCard h3').then(($elements) => {
                    const containsQuery = $elements.get().every((heading) => {
                        console.log('here');
                        console.log(heading.innerText);
                        return heading.innerText.toLowerCase().includes('web');
                    });
                    expect(containsQuery).to.eq(true);
                });
            });
        });
    });

    it('Filters by category', () => {
        cy.intercept('/api/articles.json?category-id=&query=&*').as('getArticles');
        cy.intercept('/api/articles.json?category-id=3*').as('filterArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            cy.get('.categories-filter li[data-id="3"').click();
            cy.wait('@filterArticles').then(() => {
                cy.get('.BlogCard ul').then(($elements) => {
                    const containsCategory = $elements.get().every((list) => {
                        return list.querySelector('li[data-id="3"');
                    });
                    expect(containsCategory).to.eq(true);
                });
            });
        });
    });
});
