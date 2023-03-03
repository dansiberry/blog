// Tests for the article search page
describe('Article search page', () => {
    it('Displays the filter and search interface', () => {
        // Visit the search page 
        cy.visit('/search');
        // Check that the filters elements are on the page.
        cy.get('.filters').should('exist');
    });

    it('Displays default view of latest blog articles', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/search');
        // Wait for articles to load on page
        cy.wait('@getArticles').then(() => {
            // Check that there are 6 cards showing (first page of results)
            cy.get('.CardList').children().should('have.length', 6);
        });
    });

    it('Sorts articles chronologically (Desc.) by default', () => {
        cy.intercept('/api/articles*').as('getArticles');
        cy.visit('/search');
        cy.wait('@getArticles').then(() => {
            // Get all blog cards
            cy.get('.BlogCard').then(($elements) => {
                // Check that every card has a date that is more recent than the next.
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
                        // Check that each title is correctly ordered in relation to the following title. 
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
            // Wait for API to return results
            cy.wait('@searchArticles').then(() => {
                cy.get('.BlogCard h3').then(($elements) => {
                    // Check that all card titles contain the query
                    const containsQuery = $elements.get().every((heading) => {
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
                    // Check that all cards contain the category that was selected
                    const containsCategory = $elements.get().every((list) => {
                        return list.querySelector('li[data-id="3"');
                    });
                    expect(containsCategory).to.eq(true);
                });
            });
        });
    });
});
