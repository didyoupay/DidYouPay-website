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

const faqItems = Array.from(document.querySelectorAll('.faq-item'));

if (faqItems.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let faqIsTransitioning = false;

  const setFaqState = (item, isOpen) => {
    const question = item.querySelector('.faq-question');

    question.setAttribute('aria-expanded', String(isOpen));
  };

  const animateFaqItem = (item, shouldOpen) => new Promise((resolve) => {
    const answer = item.querySelector('.faq-answer');
    const duration = prefersReducedMotion.matches ? 0 : 200;

    if (shouldOpen) {
      item.open = true;
    }

    setFaqState(item, shouldOpen);

    if (!duration || typeof answer.animate !== 'function') {
      item.open = shouldOpen;
      resolve();
      return;
    }

    const startHeight = shouldOpen ? 0 : answer.scrollHeight;
    const endHeight = shouldOpen ? answer.scrollHeight : 0;
    answer.style.overflow = 'hidden';

    const animation = answer.animate(
      [
        { height: `${startHeight}px`, opacity: shouldOpen ? 0 : 1 },
        { height: `${endHeight}px`, opacity: shouldOpen ? 1 : 0 },
      ],
      { duration, easing: 'ease' },
    );

    animation.addEventListener('finish', () => {
      if (!shouldOpen) {
        item.open = false;
      }

      answer.style.removeProperty('overflow');
      resolve();
    }, { once: true });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    setFaqState(item, false);

    question.addEventListener('click', async (event) => {
      event.preventDefault();

      if (faqIsTransitioning) {
        return;
      }

      faqIsTransitioning = true;

      if (item.open) {
        await animateFaqItem(item, false);
      } else {
        const openItems = faqItems.filter((otherItem) => otherItem !== item && otherItem.open);

        for (const openItem of openItems) {
          await animateFaqItem(openItem, false);
        }

        await animateFaqItem(item, true);
      }

      faqIsTransitioning = false;
    });
  });
}

const locationSearch = document.querySelector('[data-location-search]');
const locationGroups = document.querySelector('[data-location-groups]');
const locationEmpty = document.querySelector('[data-location-empty]');

if (locationSearch && locationGroups && locationEmpty) {
  const locationCategories = [
    ['Airport', 'Airports'],
    ['Barrier-Free Car Park', 'Barrier-Free Car Parks'],
    ['Bridge', 'Bridges'],
    ['Toll Road', 'Toll Roads'],
    ['Tunnel', 'Tunnels'],
  ];
  const allowedCategories = new Set(locationCategories.map(([category]) => category));
  let locations = [];

  const renderLocations = () => {
    const query = locationSearch.value.trim().toLocaleLowerCase('en-GB');
    const matchingLocations = locations.filter(({ name }) => (
      name.toLocaleLowerCase('en-GB').includes(query)
    ));

    locationGroups.replaceChildren();

    locationCategories.forEach(([category, heading]) => {
      const categoryLocations = matchingLocations.filter((location) => location.category === category);

      if (!categoryLocations.length) {
        return;
      }

      const group = document.createElement('section');
      const groupHeading = document.createElement('h2');
      const list = document.createElement('ul');

      group.className = 'location-group card';
      groupHeading.className = 'card__heading';
      groupHeading.textContent = `${heading} (${categoryLocations.length})`;
      list.className = 'location-list';

      categoryLocations.forEach(({ name }) => {
        const item = document.createElement('li');
        item.textContent = name;
        list.append(item);
      });

      group.append(groupHeading, list);
      locationGroups.append(group);
    });

    locationEmpty.hidden = matchingLocations.length > 0;
  };

  locationSearch.addEventListener('input', renderLocations);

  fetch('data/locations.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Location data could not be loaded.');
      }

      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        return;
      }

      locations = data
        .filter((location) => (
          location
          && typeof location.name === 'string'
          && allowedCategories.has(location.category)
        ))
        .sort((first, second) => first.name.localeCompare(second.name, 'en-GB', { sensitivity: 'base' }));

      renderLocations();
    })
    .catch(() => {
      locations = [];
      renderLocations();
    });
}

document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
