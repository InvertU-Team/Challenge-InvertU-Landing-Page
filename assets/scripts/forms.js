// === VALIDACIÓN DEL FORMULARIO DE REGISTRO ===

const form = document.querySelector(".form-register");
const modal = document.getElementById("modal-exito");
const btnCerrar = document.getElementById("btnCerrar");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll(".input-text");
  const requiredCheckbox = document.querySelector(".consent-box .terms-check");
  let formValid = true;

  // Validar cada input vacío
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("input-invalid");
      formValid = false;
    } else {
      input.classList.remove("input-invalid");
    }
  });

  // Validar checkbox obligatorio
  if (!requiredCheckbox.checked) {
    requiredCheckbox.classList.add("input-invalid");
    formValid = false;
  } else {
    requiredCheckbox.classList.remove("input-invalid");
  }

  // Si todo está OK → mostrar modal
  if (formValid) {
    modal.style.display = "flex";
  }
});

// === QUITAR BORDE ROJO AL ESCRIBIR ===
document.querySelectorAll(".input-text").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.remove("input-invalid");
    }
  });
});

// === QUITAR ROJO DEL CHECKBOX AL MARCAR ===
document.querySelectorAll(".terms-check").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      checkbox.classList.remove("input-invalid");
    }
  });
});

// === BOTÓN PARA CERRAR EL MODAL ===
btnCerrar.addEventListener("click", function () {
  modal.style.display = "none";
});
