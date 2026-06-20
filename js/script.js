document.documentElement.classList.add('js');

const navigationToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-navigation');

if (navigationToggle && navigation) {
  const closeNavigation = () => {
    navigationToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };

  navigationToggle.addEventListener('click', () => {
    const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true';

    navigationToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeNavigation();
      navigationToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 64rem)').matches) {
      closeNavigation();
    }
  });
}

document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
