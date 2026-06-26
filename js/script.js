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
const locationError = document.querySelector('[data-location-error]');

if (locationSearch && locationGroups && locationEmpty && locationError) {
  const locationLoadStates = {
    loading: 'loading',
    complete: 'complete',
    failed: 'failed',
  };
  let locationCategories = [];
  let locationLoadState = locationLoadStates.loading;
  let locationsWebDataPromise;

  locationSearch.disabled = true;
  locationGroups.setAttribute('aria-busy', 'true');

  const getLocationId = (category, name) => `location-${category}-${name}`
    .toLocaleLowerCase('en-GB')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const renderLocations = () => {
    if (locationLoadState !== locationLoadStates.complete) {
      return;
    }

    const query = locationSearch.value.trim().toLocaleLowerCase('en-GB');
    let matchingLocationCount = 0;

    locationGroups.replaceChildren();

    locationCategories.forEach(({ category, locations }) => {
      const matchingLocations = locations.filter(({ name }) => (
        name.toLocaleLowerCase('en-GB').includes(query)
      ));

      if (!matchingLocations.length) {
        return;
      }

      matchingLocationCount += matchingLocations.length;

      const group = document.createElement('details');
      const groupHeading = document.createElement('summary');
      const list = document.createElement('ul');

      group.className = 'location-group card';
      groupHeading.className = 'location-group__heading';
      groupHeading.textContent = category;
      list.className = 'location-list';

      matchingLocations.forEach(({ name }) => {
        const locationId = getLocationId(category, name);
        const item = document.createElement('li');
        const link = document.createElement('a');

        item.id = locationId;
        link.href = `#${locationId}`;
        link.textContent = name;
        item.append(link);
        list.append(item);
      });

      group.append(groupHeading, list);
      locationGroups.append(group);
    });

    locationEmpty.hidden = matchingLocationCount > 0;
  };

  locationSearch.addEventListener('input', renderLocations);

  const loadLocationsWebData = () => {
    if (!locationsWebDataPromise) {
      locationsWebDataPromise = fetch('data/locations-web.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Location data could not be loaded.');
          }

          return response.json();
        });
    }

    return locationsWebDataPromise;
  };

  loadLocationsWebData()
    .then((response) => {
      if (!response || !Array.isArray(response.categories)) {
        throw new Error('Location data is invalid.');
      }

      locationCategories = response.categories
        .filter((categoryGroup) => (
          categoryGroup
          && typeof categoryGroup.category === 'string'
          && Array.isArray(categoryGroup.locations)
        ))
        .map((categoryGroup) => ({
          category: categoryGroup.category,
          locations: categoryGroup.locations.filter((location) => (
            location
            && typeof location.name === 'string'
          )),
        }))
        .filter((categoryGroup) => categoryGroup.locations.length > 0);

      locationLoadState = locationLoadStates.complete;
      locationSearch.disabled = false;
      locationGroups.setAttribute('aria-busy', 'false');
      locationError.hidden = true;
      renderLocations();
    })
    .catch(() => {
      locationCategories = [];
      locationLoadState = locationLoadStates.failed;
      locationSearch.disabled = true;
      locationGroups.setAttribute('aria-busy', 'false');
      locationGroups.replaceChildren();
      locationEmpty.hidden = true;
      locationError.hidden = false;
    });
}

document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
