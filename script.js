// Hamburger menu — works on all pages including navbar--mobile-only variant
document.addEventListener('DOMContentLoaded', () => {
  // Target all hamburger buttons on the page (handles both index and interior pages)
  const hamburgers = document.querySelectorAll('.navbar__hamburger');

  hamburgers.forEach(hamburger => {
    // Each hamburger controls the nav inside the same header
    const header = hamburger.closest('header') || hamburger.closest('.navbar');
    const nav = header ? header.querySelector('.navbar__nav') : null;

    if (!nav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when any nav link is clicked
    nav.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && !e.target.closest('.navbar')) {
      document.querySelectorAll('.navbar__nav.is-open').forEach(nav => {
        nav.classList.remove('is-open');
      });
      document.querySelectorAll('.navbar__hamburger.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Smooth page exit transition when navigating away
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only apply to internal page links, not anchors/mailto/external
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('http') && href.endsWith('.html')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-6px)';
        document.body.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    }
  });
});
