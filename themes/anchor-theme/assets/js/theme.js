// Theme JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize the event carousel if it exists on the page
    initEventCarousel();
    
    // Initialize the events list page functionality if it exists
    initEventsList();
});

/**
 * Initializes the events list page functionality
 */
function initEventsList() {
    const eventsPage = document.querySelector('.events-page');
    if (!eventsPage) return;
    
    // Check for expired events client-side
    const removeExpiredEvents = () => {
        const now = new Date();
        let hasRemoved = false;
        
        // Get all event elements
        const eventElements = document.querySelectorAll('.events-page [id^="event-"]');
        
        eventElements.forEach(eventElement => {
            try {
                // Get the expiry date from the data attribute
                const expiryDateStr = eventElement.getAttribute('data-event-expiry');
                if (!expiryDateStr) return;
                
                const expiryDate = new Date(expiryDateStr);
                if (expiryDate < now) {
                    eventElement.style.display = 'none';
                    hasRemoved = true;
                }
            } catch (e) {
                console.error('Error parsing expiry date:', e);
            }
        });
        
        // Show "No upcoming events" message if all events are expired
        const noEventsMessage = document.querySelector('.events-page .text-center');
        if (hasRemoved && noEventsMessage) {
            const visibleEvents = document.querySelectorAll('.events-page [id^="event-"]:not([style*="display: none"])');
            if (visibleEvents.length === 0) {
                noEventsMessage.style.display = 'block';
            } else {
                noEventsMessage.style.display = 'none';
            }
        }
    };
    
    // Check on load and periodically
    removeExpiredEvents();
    setInterval(removeExpiredEvents, 60000); // Check every minute
}

/**
 * Initializes the event carousel functionality
 */
function initEventCarousel() {
    const carousel = document.querySelector('.event-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelector('.event-slides');
    const allSlides = carousel.querySelectorAll('.event-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevArea = carousel.querySelector('.carousel-click-area.carousel-prev');
    const nextArea = carousel.querySelector('.carousel-click-area.carousel-next');
    let currentSlide = 0;
    const slideCount = allSlides.length;
    
    // Track touch/mouse events for swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Auto-rotation control
    let autoRotateInterval = null;
    let userInteracted = false;
    
    function showSlide(index) {
        // Handle wrapping
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        // Update current index
        currentSlide = index;
        slides.dataset.current = currentSlide;
        
        // Update slides
        allSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.querySelector('span').classList.toggle('bg-brand-dark', i === currentSlide);
            dot.querySelector('span').classList.toggle('bg-gray-400', i !== currentSlide);
        });
    }
    
    // Function to handle user interaction
    function handleUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            // Stop auto-rotation when user interacts
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        }
    }
    
    // Set up dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            handleUserInteraction();
            const slideIndex = parseInt(dot.dataset.slide);
            showSlide(slideIndex);
        });
    });
    
    // Set up click area navigation
    if (prevArea) {
        prevArea.addEventListener('click', () => {
            handleUserInteraction();
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextArea) {
        nextArea.addEventListener('click', () => {
            handleUserInteraction();
            showSlide(currentSlide + 1);
        });
    }
    
    // Set up touch/swipe navigation
    if (slideCount > 1) {
        // Touch events for mobile
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Mouse events for desktop
        let isMouseDown = false;
        
        carousel.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            touchStartX = e.screenX;
            // Prevent text selection during swipe
            e.preventDefault();
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault(); // Prevent text selection
        });
        
        carousel.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            touchEndX = e.screenX;
            isMouseDown = false;
            handleSwipe();
        });
        
        carousel.addEventListener('mouseleave', (e) => {
            if (!isMouseDown) return;
            touchEndX = e.screenX;
            isMouseDown = false;
            handleSwipe();
        });
        
        // Handle the swipe direction
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            if (touchEndX + threshold < touchStartX) {
                // Swipe left - go to next slide
                handleUserInteraction();
                showSlide(currentSlide + 1);
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right - go to previous slide
                handleUserInteraction();
                showSlide(currentSlide - 1);
            }
        }
        
        // Auto advance slides every 8 seconds
        autoRotateInterval = setInterval(() => {
            if (!userInteracted) {
                showSlide(currentSlide + 1);
            }
        }, 8000);
    }
    
    // Check for expired events client-side
    const removeExpiredEvents = () => {
        let hasRemoved = false;
        const now = new Date();
        
        allSlides.forEach(slide => {
            try {
                // Get the expiry date from the data attribute
                const expiryDateStr = slide.dataset.eventExpiry;
                if (!expiryDateStr) return;
                
                const expiryDate = new Date(expiryDateStr);
                if (expiryDate < now) {
                    slide.style.display = 'none';
                    hasRemoved = true;
                }
            } catch (e) {
                console.error('Error parsing expiry date:', slide.dataset.eventExpiry, e);
            }
        });
        
        // Hide entire section if all events expired
        if (hasRemoved && document.querySelectorAll('.event-slide:not([style*="display: none"])').length === 0) {
            document.getElementById('upcoming-events').style.display = 'none';
        }
    };
    
    // Check on load and periodically
    removeExpiredEvents();
    setInterval(removeExpiredEvents, 60000); // Check every minute
} 

// Search functionality
class Search {
    constructor() {
        this.searchIndex = null;
        this.searchInputs = {
            desktop: document.getElementById('search-input'),
            mobile: document.getElementById('search-input-mobile')
        };
        this.searchResults = {
            desktop: document.getElementById('search-results'),
            mobile: document.getElementById('search-results-mobile')
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
            <a href="${result.path}" class="search-result">
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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize search
    new Search();

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown button');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    mobileDropdowns.forEach(button => {
        button.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('hidden');
        });
    });
});