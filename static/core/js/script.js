document.addEventListener('DOMContentLoaded', () => {
  // --- Loader ---
  const loader = document.getElementById('loader');
  
  // Fake loader timeout (since we don't have heavy assets, just show for a second)
  setTimeout(() => {
    if(loader) {
      loader.classList.add('hidden');
    }
    document.body.classList.add('loaded');
  }, 1000);

  // --- Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const fullMenu = document.getElementById('full-menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  if(menuToggle && fullMenu) {
    menuToggle.addEventListener('click', () => {
      fullMenu.classList.toggle('active');
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(fullMenu) fullMenu.classList.remove('active');
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  const elementsToFade = document.querySelectorAll('.fade-up, .fade-in');
  elementsToFade.forEach(el => observer.observe(el));

  // --- Magnetic Buttons ---
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // Move button slightly
      btn.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
      
      // If it has an icon inside, move it slightly more
      const icon = btn.querySelector('.btn-icon');
      if (icon) {
        icon.style.transform = `translate(${deltaX * 15}px, ${deltaY * 15}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      // Reset transforms
      btn.style.transform = '';
      const icon = btn.querySelector('.btn-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
});
