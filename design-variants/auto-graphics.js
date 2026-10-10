const body = document.body;
const themeButtons = [...document.querySelectorAll('.theme-button')];
const cards = [...document.querySelectorAll('.graphic-card')];
const detailTitle = document.querySelector('#detail-title');
const detailCopy = document.querySelector('#detail-copy');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.theme;
    body.classList.remove('theme-orbit', 'theme-aurora', 'theme-signal');
    body.classList.add(`theme-${theme}`);
    themeButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  });
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    if (detailTitle) detailTitle.textContent = card.dataset.title || '';
    if (detailCopy) detailCopy.textContent = card.dataset.copy || '';
  });
});
