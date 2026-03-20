/**
 * Portfolio - Main JavaScript
 * Clean, minimal interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollProgress();
  initProjectFilters();
  initTypingEffect();
  initRevealAnimations();
  initBackToTop();
});

/**
 * Theme Toggle
 */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
  }
}

/**
 * Navigation
 */
function initNavigation() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Mobile menu
  mobileBtn?.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks?.classList.toggle('active');
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn?.classList.remove('active');
      navLinks?.classList.remove('active');
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

/**
 * Scroll Progress
 */
function initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const width = (scrollTop / height) * 100;
    if (progress) progress.style.width = `${width}%`;
  });
}

/**
 * Project Filtering
 */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

/**
 * Typing Effect
 */
function initTypingEffect() {
  const element = document.querySelector('.typing-text');
  if (!element) return;

  const roles = [
    'Robotics Engineer',
    'Computer Vision Engineer',
    'Controls Engineer',
    'ML Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/**
 * Reveal Animations
 */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/**
 * Back to Top
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    btn?.classList.toggle('visible', window.scrollY > 400);
  });

  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
