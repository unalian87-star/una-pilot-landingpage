document.querySelectorAll('[data-tabs]').forEach((group) => {
  const buttons = [...group.querySelectorAll('.tab')];
  const panels = [...group.querySelectorAll('.tab-panel')];
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
    panels.forEach((panel, panelIndex) => panel.classList.toggle('is-active', panelIndex === index));
  }));
});
