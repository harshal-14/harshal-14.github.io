/**
 * Harshal Bhat Portfolio
 * Main JavaScript
 */

(function() {
  'use strict';

  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const menuBtn = document.getElementById('menuBtn');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const backTopBtn = document.getElementById('backTop');
  const scrollBar = document.querySelector('.scroll-bar');
  const typingEl = document.getElementById('typing');

  // Initialize
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initProjectFilters();
    initTypingEffect();
    initFadeAnimations();
  }

  // Theme Toggle
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
  }

  // Mobile Menu
  function initMobileMenu() {
    menuBtn?.addEventListener('click', () => {
      navList?.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList?.classList.remove('open');
      });
    });
  }

  // Scroll Effects
  function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress bar
      if (scrollBar) {
        scrollBar.style.width = `${(scrollY / docHeight) * 100}%`;
      }

      // Back to top button
      if (backTopBtn) {
        backTopBtn.classList.toggle('show', scrollY > 400);
      }

      // Active nav link
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top click
    backTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Project Filters
  function initProjectFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const categories = card.dataset.category?.split(' ') || [];
          const show = filter === 'all' || categories.includes(filter);
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }

  // Typing Effect
  function initTypingEffect() {
    if (!typingEl) return;

    const roles = [
      'Robotics Engineer',
      'Computer Vision Engineer',
      'Controls Engineer',
      'ML Engineer'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
      const current = roles[roleIdx];

      if (deleting) {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let delay = deleting ? 30 : 70;

      if (!deleting && charIdx === current.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 300;
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 500);
  }

  // Fade-in Animations
  function initFadeAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      elements.forEach(el => observer.observe(el));
    } else {
      elements.forEach(el => el.classList.add('visible'));
    }
  }

})();
