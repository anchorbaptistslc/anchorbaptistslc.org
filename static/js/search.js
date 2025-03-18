// Search functionality
class Search {
    constructor() {
        this.searchIndex = null;
        this.searchInputs = {
            desktop: document.getElementById('search-input'),
            mobile: document.getElementById('mobile-search-input')
        };
        this.searchResults = {
            desktop: document.getElementById('search-results'),
            mobile: document.getElementById('mobile-search-results')
        };
        this.loadSearchIndex();
        this.bindEvents();
    }

    async loadSearchIndex() {
        try {
            const response = await fetch('/index.json');
            const data = await response.json();
            this.searchIndex = data.pages;
        } catch (error) {
            console.error('Error loading search index:', error);
        }
    }

    bindEvents() {
        // Bind events for both desktop and mobile inputs
        Object.entries(this.searchInputs).forEach(([device, input]) => {
            if (input) {
                // Handle input changes
                input.addEventListener('input', () => this.performSearch(device));
                
                // Handle Enter key
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const results = document.querySelectorAll(`#${device}-search-results .search-result`);
                        if (results.length > 0) {
                            // Navigate to the first result
                            window.location.href = results[0].getAttribute('href');
                        }
                    }
                });

                // Handle focus
                input.addEventListener('focus', () => {
                    if (this.searchResults[device]) {
                        this.performSearch(device);
                    }
                });
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            Object.entries(this.searchResults).forEach(([device, results]) => {
                const input = this.searchInputs[device];
                if (results && input && !results.contains(e.target) && !input.contains(e.target)) {
                    results.style.display = 'none';
                }
            });
        });
    }

    performSearch(device) {
        const input = this.searchInputs[device];
        const results = this.searchResults[device];
        
        if (!input || !results || !this.searchIndex) return;

        const query = input.value.toLowerCase().trim();
        if (query.length < 2) {
            results.innerHTML = '';
            results.style.display = 'none';
            return;
        }

        const searchResults = this.searchIndex.filter(page => {
            const titleMatch = page.title.toLowerCase().includes(query);
            const descriptionMatch = page.description?.toLowerCase().includes(query);
            const contentMatch = page.content.toLowerCase().includes(query);
            return titleMatch || descriptionMatch || contentMatch;
        }).slice(0, 10); // Limit to 10 results

        this.displayResults(searchResults, device);
    }

    displayResults(results, device) {
        const resultsContainer = this.searchResults[device];
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-no-results">No results found</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        const html = results.map(result => `
            <a href="${result.permalink}" class="search-result">
                <h3>${this.highlight(result.title, this.searchInputs[device].value)}</h3>
                ${result.description ? 
                    `<p class="description">${this.highlight(result.description, this.searchInputs[device].value)}</p>` : 
                    ''}
            </a>
        `).join('');

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
    }

    highlight(text, query) {
        if (!query) return text;
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    truncate(text, length) {
        if (text.length <= length) return text;
        return text.substr(0, length) + '...';
    }
} 