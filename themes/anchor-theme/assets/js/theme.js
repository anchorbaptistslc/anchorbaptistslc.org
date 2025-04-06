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
});

/**
 * Initializes the event carousel functionality
 */
function initEventCarousel() {
    const carousel = document.querySelector('.event-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelector('.event-slides');
    const allSlides = carousel.querySelectorAll('.event-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-nav.prev');
    const nextBtn = carousel.querySelector('.carousel-nav.next');
    let currentSlide = 0;
    const slideCount = allSlides.length;
    
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
    
    // Set up dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            showSlide(slideIndex);
        });
    });
    
    // Set up arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Auto advance slides every 8 seconds if more than one
    if (slideCount > 1) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }
    
    // Check for expired events client-side
    const removeExpiredEvents = () => {
        let hasRemoved = false;
        const now = new Date();
        
        allSlides.forEach(slide => {
            try {
                // The data-event-end attribute contains expiryDate or date
                const expiryDate = new Date(slide.dataset.eventEnd);
                if (expiryDate < now) {
                    slide.style.display = 'none';
                    hasRemoved = true;
                }
            } catch (e) {
                console.error('Error parsing expiry date:', slide.dataset.eventEnd, e);
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