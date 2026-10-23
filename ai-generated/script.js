// Progressive enhancement: all content and project details work without JavaScript.
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const smallScreen = window.matchMedia('(max-width: 760px)');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.hidden = smallScreen.matches;
}
menu.hidden = false;
closeMenu();
smallScreen.addEventListener('change', closeMenu);
menu.addEventListener('click', () => {
  const opening = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opening));
  navigation.hidden = !opening;
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.querySelector('.project-controls').hidden = false;
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.project-card')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let visible = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown. The featured project remains visible.`;
}));

if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-18% 0px -52% 0px', threshold: 0 });
  links.forEach(link => observer.observe(document.querySelector(link.hash)));
}
