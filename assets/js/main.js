// Main JavaScript file

// Site-specific JavaScript can be added here

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Select all links with the smooth-scroll class or links with hash hrefs
  const smoothScrollLinks = document.querySelectorAll('a.smooth-scroll, a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Only handle links that start with # and aren't just #
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();

          // Calculate offset for sticky navigation
          const navElement = document.querySelector('.academy-subnav');
          const navHeight = navElement ? navElement.offsetHeight : 0;

          // Get target position accounting for sticky nav
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.academy-subnav a[data-section]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          // Remove active class from all nav links
          navLinks.forEach(link => {
            link.classList.remove('text-brand-light', 'font-bold');
          });

          // Add active class to matching nav link
          const activeLink = document.querySelector(`.academy-subnav a[data-section="${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('text-brand-light', 'font-bold');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }
}); 