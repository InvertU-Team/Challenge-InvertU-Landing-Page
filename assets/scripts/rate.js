// Seleccionar todas las estrellas
const starButtons = document.querySelectorAll(".rate-star-btn");
const modal = document.getElementById("rate-modal");
const modalBtn = document.querySelector(".rate-modal-btn");

// Evento de estrellas
starButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector(".rate-star-img");

        img.src = img.src.includes("star-off.png")
            ? "assets/images/star.png"
            : "assets/images/star-off.png";
    });
});

// Abrir modal
document.querySelector(".rate-submit-btn").addEventListener("click", () => {
    modal.style.display = "flex";
});

// Cerrar modal
modalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
