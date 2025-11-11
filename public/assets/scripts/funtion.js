// Encapsula la lógica y evita globales
(() => {
  'use strict';

  // Añade ARIA mínima sin cambiar el diseño
  const enhanceAccessibility = () => {
    const list = document.querySelector('.feature-list');
    if (list && !list.getAttribute('aria-label')) {
      list.setAttribute('aria-label', 'Financial app features list'); // mejora accesibilidad
    }
  };

  // Maneja errores de carga de imágenes sin alterar layout base
  const initImageSafety = () => {
    const images = document.querySelectorAll('.mockup');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        // si falla la imagen, se oculta para evitar íconos rotos
        img.style.visibility = 'hidden';
      });
    });
  };

  // Punto de entrada
  const initPage = () => {
    enhanceAccessibility(); // aplica atributos ARIA básicos
    initImageSafety();      // listeners de seguridad de imágenes
  };

  // Espera DOM listo
  document.addEventListener('DOMContentLoaded', initPage); // inicio seguro
})();
