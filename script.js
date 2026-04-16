document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const contactForm = document.querySelector('#contact-form');
  const themeToggle = document.querySelector('#theme-toggle');
  const musicToggle = document.querySelector('#music-toggle');
  const bgMusic = document.querySelector('#bg-music');

  // Music toggle
  if (musicToggle && bgMusic) {
    // Restore music state
    const musicWasPlaying = localStorage.getItem('musicPlaying') === 'true';
    if (musicWasPlaying) {
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.querySelector('i').classList.replace('bi-music-note-beamed', 'bi-pause-fill');
      }).catch(() => {});
    }

    musicToggle.addEventListener('click', () => {
      const icon = musicToggle.querySelector('i');
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        icon.classList.replace('bi-music-note-beamed', 'bi-pause-fill');
        localStorage.setItem('musicPlaying', 'true');
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        icon.classList.replace('bi-pause-fill', 'bi-music-note-beamed');
        localStorage.setItem('musicPlaying', 'false');
      }
    });
  }

  // Theme toggle
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.querySelector('i').classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const icon = themeToggle.querySelector('i');
      if (document.body.classList.contains('light-theme')) {
        icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        localStorage.setItem('theme', 'light');
      } else {
        icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    revealObserver.observe(element);
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id || link.getAttribute('href').endsWith('#' + id)) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const updateScrollState = () => {
    const passedThreshold = window.scrollY > 60;

    if (navbar) {
      navbar.classList.toggle('scrolled', passedThreshold);
    }

    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 300);
    }

    updateActiveNav();
  };

  window.addEventListener('scroll', updateScrollState);
  updateScrollState();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');

      let isValid = true;

      if (!name || name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        clearError(name);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        showError(email, 'Enter a valid email address');
        isValid = false;
      } else {
        clearError(email);
      }

      if (!message || message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      } else {
        clearError(message);
      }

      if (!isValid) {
        event.preventDefault();
        return;
      }

      // Allow form to submit to Formspree
      return true;
    });
  }
});

function showError(input, message) {
  if (!input) return;
  input.classList.add('is-invalid');

  let error = input.parentElement.querySelector('.error-msg');
  if (!error) {
    error = document.createElement('small');
    error.className = 'error-msg';
    input.parentElement.appendChild(error);
  }

  error.textContent = message;
}

function clearError(input) {
  if (!input) return;
  input.classList.remove('is-invalid');

  const error = input.parentElement.querySelector('.error-msg');
  if (error) {
    error.remove();
  }
}