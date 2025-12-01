// news.js
// La función se puede llamar desde app.js una vez que el HTML se haya cargado.
function initializeNewsCarousel() { 

    // Los elementos SÍ existen en el DOM en este punto.
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn"); 
    const nextBtn = document.getElementById("nextBtn"); 

    const cardWidthWithGap = 350;

    // Verificación de seguridad: si la sección no se cargó, la función simplemente termina.
    if (!carousel || !prevBtn || !nextBtn) {
        console.warn("News Carousel: No se pudo encontrar el carrusel o sus botones. Saltando inicialización.");
        return;
    }

    const scrollCarousel = (direction) => {
        // Añadimos 'behavior: "smooth"' para una mejor experiencia de usuario.
        carousel.scroll({
            left: carousel.scrollLeft + cardWidthWithGap * direction,
            behavior: "smooth"
        });
        setTimeout(updateButtonState, 350); // Aumentamos el tiempo para que termine el scroll 'smooth'
    };

    const updateButtonState = () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        prevBtn.disabled = carousel.scrollLeft <= 5;
        nextBtn.disabled = carousel.scrollLeft >= maxScroll - 5;
    };

    // Eventos de click
    nextBtn.addEventListener("click", () => {
        scrollCarousel(1);
    });

    prevBtn.addEventListener("click", () => {
        scrollCarousel(-1);
    });
    
    // Añadimos un listener al scroll para manejar deslizamiento manual/touch
    carousel.addEventListener('scroll', updateButtonState);

    window.addEventListener('resize', updateButtonState);

    updateButtonState();
    
    console.log("News Carousel inicializado con éxito.");
}
// NOTA: No hay 'DOMContentLoaded' aquí.