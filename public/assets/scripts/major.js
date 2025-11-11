// Cache de elementos
(() => {
  const modal   = document.getElementById('qr-modal');
  const imgQR   = document.getElementById('qr-image');
  const titleEl = document.getElementById('qr-title');
  const closeBt = document.querySelector('.modal__close');

  let DATA = {};

  // Cargar datos JSON
  fetch('assets/json/major.json')
    .then(r => r.json())
    .then(json => { DATA = json; })
    .catch(err => console.error('Error cargando JSON:', err));

  // Abrir modal
  function openModal(platform) {
    const cfg = DATA[platform];
    if (!cfg) return;

    titleEl.textContent = cfg.title;
    imgQR.src = cfg.qr;
    imgQR.alt = `Código QR para ${platform}`;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeBt.focus();
  }

  // Cerrar modal
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Eventos
  document.querySelectorAll('.platforms [data-platform]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.platform));
  });

  closeBt.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();
