document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (id) => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateActiveSection = () => {
    const marker = window.scrollY + 110;
    const active = sections.reduce((current, section) => {
      return section.offsetTop <= marker ? section : current;
    }, sections[0]);

    if (active) {
      setActiveLink(active.id);
    }
  };

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener('resize', updateActiveSection);
  updateActiveSection();
});
