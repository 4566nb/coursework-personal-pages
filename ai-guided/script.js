// Add optional controls only when JavaScript is available.
const controls = document.querySelector('.filters');
const buttons = [...controls.querySelectorAll('button')];
const projects = [...document.querySelectorAll('.other-project')];
controls.hidden = false;
buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown. Research and publication remain visible.`;
}));
const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map(link => document.querySelector(link.hash));
function updateNavigation() {
  const active = sections.filter(section => section.getBoundingClientRect().top <= 140).pop() || sections[0];
  navLinks.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scheduled = false;
document.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }
}, { passive: true });
updateNavigation();
