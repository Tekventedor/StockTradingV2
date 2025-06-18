document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    const searchHistory = document.querySelector('.search-history');
    const searchResults = document.querySelector('.search-results');
    const clearHistoryBtn = document.querySelector('.clear-history');

    // Load search history from localStorage
    let searchHistoryItems = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    function updateSearchHistoryUI() {
        const historyContainer = document.querySelector('.search-history-items');
        if (searchHistoryItems.length === 0) {
            historyContainer.innerHTML = `
                <div class="px-4 py-3 text-sm text-gray-500 italic">
                    No recent searches
                </div>
            `;
            return;
        }

        const template = `
            <div class="search-history-item px-4 py-3 hover:bg-gray-50 cursor-pointer group flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span class="text-sm text-gray-900">ITEM_PLACEHOLDER</span>
                </div>
                <button class="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        historyContainer.innerHTML = searchHistoryItems
            .map(item => template.replace('ITEM_PLACEHOLDER', item))
            .join('');

        // Add click handlers to history items
        document.querySelectorAll('.search-history-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.closest('button')) {
                    e.stopPropagation();
                    const searchText = this.querySelector('span').textContent.trim();
                    searchHistoryItems = searchHistoryItems.filter(item => item !== searchText);
                    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryItems));
                    updateSearchHistoryUI();
                    return;
                }
                
                const searchText = this.querySelector('span').textContent.trim();
                searchInputs.forEach(input => {
                    input.value = searchText;
                    input.dispatchEvent(new Event('input'));
                });
            });
        });
    }

    // Add search to history
    function addToSearchHistory(searchTerm) {
        if (searchTerm.length < 2) return;
        
        // Remove any existing instance of the search term to avoid duplicates
        searchHistoryItems = searchHistoryItems.filter(item => item !== searchTerm);
        // Add new term to the beginning
        searchHistoryItems.unshift(searchTerm);
        // Keep only last 5 searches
        searchHistoryItems = searchHistoryItems.slice(0, 5);
        
        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryItems));
        updateSearchHistoryUI();
    }

    // Clear history
    clearHistoryBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        searchHistoryItems = [];
        localStorage.removeItem('searchHistory');
        updateSearchHistoryUI();
        searchHistory.classList.add('hidden');
    });

    // Search input handlers
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.value.length < 2) {
                searchResults.classList.add('hidden');
                searchHistory.classList.remove('hidden');
                updateSearchHistoryUI();
            }
        });

        input.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                searchHistory.classList.remove('hidden');
                return;
            }

            // Fuzzy search function
            function fuzzyMatch(str, pattern) {
                pattern = pattern.toLowerCase();
                str = str.toLowerCase();
                
                let patternIdx = 0;
                let strIdx = 0;
                let match = false;
                let matches = [];

                while (strIdx < str.length) {
                    if (str[strIdx] === pattern[patternIdx]) {
                        matches.push(strIdx);
                        patternIdx++;
                        if (patternIdx >= pattern.length) {
                            match = true;
                            break;
                        }
                    }
                    strIdx++;
                }

                return match ? matches : false;
            }

            // Calculate relevance score
            function getRelevanceScore(page, query) {
                query = query.toLowerCase();
                let score = 0;
                
                // Exact title match (highest priority)
                if (page.title.toLowerCase() === query) {
                    score += 100;
                }
                // Title contains query
                else if (page.title.toLowerCase().includes(query)) {
                    score += 50;
                }
                // Fuzzy match in title
                else if (fuzzyMatch(page.title, query)) {
                    score += 25;
                }

                // Keyword exact matches
                page.keywords.forEach(keyword => {
                    if (keyword.toLowerCase() === query) {
                        score += 30;
                    }
                    else if (keyword.toLowerCase().includes(query)) {
                        score += 20;
                    }
                    else if (fuzzyMatch(keyword, query)) {
                        score += 10;
                    }
                });

                return score;
            }

            // Show search results instead of history
            searchHistory.classList.add('hidden');
            
            // Only include verified existing pages and sections
            const pages = [
                // Main navigation sections
                {
                    title: 'Learn',
                    url: '/learn/',
                    type: 'Section',
                    keywords: ['learn', 'education', 'articles']
                },
                {
                    title: 'Sectors',
                    url: '/sectors/',
                    type: 'Section',
                    keywords: ['sector', 'sectors', 'industries']
                },
                {
                    title: 'Stocks',
                    url: '/stocks/',
                    type: 'Section',
                    keywords: ['stock', 'stocks', 'companies', 'equities']
                },
                {
                    title: 'Glossary',
                    url: '/glossary/',
                    type: 'Section',
                    keywords: ['glossary', 'terms', 'definitions']
                },
                // Learn section articles (verified)
                { 
                    title: 'Stock Market Basics', 
                    url: '/learn/article/stock-market-basics/', 
                    type: 'Article', 
                    keywords: ['basics', 'introduction', 'fundamentals']
                },
                { 
                    title: 'Market Capitalization', 
                    url: '/learn/article/market-capitalization/', 
                    type: 'Article', 
                    keywords: ['market cap', 'company size', 'valuation']
                },
                { 
                    title: 'Trading Strategies', 
                    url: '/learn/article/trading-strategies/', 
                    type: 'Article', 
                    keywords: ['trading', 'strategies', 'techniques']
                }
            ];

            // Get scored results
            const results = pages
                .map(page => ({
                    ...page,
                    score: getRelevanceScore(page, query)
                }))
                .filter(page => page.score > 0)
                .sort((a, b) => b.score - a.score);

            console.log('Search query:', query);
            console.log('Search results:', results);

            const resultsContainer = document.querySelector('.search-results');
            
            if (results.length > 0) {
                resultsContainer.innerHTML = `
                    <div class="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                        <span class="text-xs font-medium text-gray-500">Results for "${query}"</span>
                    </div>
                    <div class="py-2 divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                        ${results.map(page => `
                            <a href="${page.url}" 
                               class="flex items-center px-4 py-2.5 hover:bg-gray-50 group transition-colors duration-150"
                               onclick="addToSearchHistory('${page.title}')">
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium text-gray-900 truncate">${page.title}</div>
                                    <div class="text-xs text-gray-500 mt-0.5 truncate">${page.type}</div>
                                </div>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        `).join('')}
                    </div>
                `;
                resultsContainer.classList.remove('hidden');
            } else {
                resultsContainer.innerHTML = `
                    <div class="px-4 py-3 text-sm text-gray-500">
                        <div class="font-medium text-gray-900 mb-1">No results found</div>
                        <p class="text-gray-500 text-xs">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                `;
                resultsContainer.classList.remove('hidden');
            }

            // Show suggestions while typing
            if (query.length >= 1) {
                const suggestions = pages
                    .filter(page => !results.find(r => r.title === page.title))
                    .filter(page => 
                        fuzzyMatch(page.title, query) || 
                        page.keywords.some(k => fuzzyMatch(k, query))
                    )
                    .slice(0, 3);

                if (suggestions.length > 0) {
                    resultsContainer.innerHTML += `
                        <div class="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50/50 border-t border-gray-100">
                            Suggestions
                        </div>
                        ${suggestions.map(page => `
                            <a href="${page.url}" 
                               class="flex items-center px-4 py-2.5 hover:bg-gray-50 group transition-colors duration-150"
                               onclick="addToSearchHistory('${page.title}')">
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium text-gray-900 truncate">${page.title}</div>
                                    <div class="text-xs text-gray-500 mt-0.5 truncate">${page.type}</div>
                                </div>
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        `).join('')}
                    `;
                }
            }
        });

        // Add keypress event listener for Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length >= 2) {
                    addToSearchHistory(query);
                    // If there are search results, click the first one
                    const firstResult = results.querySelector('a');
                    if (firstResult) {
                        firstResult.click();
                    }
                }
            }
        });
    });

    // Handle clicks outside search
    document.addEventListener('click', function(e) {
        const isSearchContainer = e.target.closest('.search-container');
        const isSearchHistory = e.target.closest('.search-history');
        const isSearchResults = e.target.closest('.search-results');
        
        if (!isSearchContainer && !isSearchHistory && !isSearchResults) {
            searchHistory.classList.add('hidden');
            searchResults.classList.add('hidden');
        }
    });

    // Handle form submission
    document.addEventListener('submit', function(e) {
        if (e.target.querySelector('input[type="text"]')) {
            e.preventDefault();
            const searchTerm = e.target.querySelector('input[type="text"]').value;
            if (searchTerm.length >= 2) {
                addToSearchHistory(searchTerm);
                // Here you would typically also handle the search submission
            }
        }
    });

    // Initialize search history
    updateSearchHistoryUI();
}); 