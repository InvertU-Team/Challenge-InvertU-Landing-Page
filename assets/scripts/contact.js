// contact.js
(function () {
  console.log("contact.js CARGADO"); // para comprobar en la consola
  // ======================= REFERENCIAS AL FORM =======================
  const form      = document.getElementById("contact-form");
  const subject   = document.getElementById("subject");
  const email     = document.getElementById("email");
  const recipient = document.getElementById("recipient");
  const message   = document.getElementById("message");

  // Si por alguna razón no existe el form, salimos y evitamos errores
  if (!form || !subject || !email || !recipient || !message) {
    console.warn("contact.js: no se encontró el formulario de contacto");
    return;
  }

  // ======================= MODALES =======================
  const successModal         = document.getElementById("success-modal");
  const validationErrorModal = document.getElementById("error-modal");
  const serverErrorModal     = document.getElementById("server-error-modal");

  const successBtn = document.getElementById("success-btn");
  const retryBtn   = document.getElementById("retry-btn");

  const serverErrorCancelBtn = document.getElementById("server-error-cancel-btn");
  const serverErrorRetryBtn  = document.getElementById("server-error-retry-btn");

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-hidden");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add("is-hidden");
  }

  // Botón cerrar del modal de éxito
  if (successBtn) {
    successBtn.addEventListener("click", () => {
      closeModal(successModal);
      form.reset();
    });
  }

  // Botón intentar de nuevo en modal de error de validación
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      closeModal(validationErrorModal);
    });
  }

  // Botones del modal de error de servidor
  if (serverErrorCancelBtn) {
    serverErrorCancelBtn.addEventListener("click", () => {
      closeModal(serverErrorModal);
    });
  }

  if (serverErrorRetryBtn) {
    serverErrorRetryBtn.addEventListener("click", () => {
      closeModal(serverErrorModal);
      // Aquí podrías reintentar el envío real si lo tuvieras
    });
  }

  // ======================= AUTORELLENAR DESTINATARIO =======================
  document.querySelectorAll(".contact-button").forEach((button) => {
    button.addEventListener("click", () => {
      const correo = button.dataset.email;
      if (!correo) return;

      recipient.value = correo;

      recipient.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      recipient.focus();
    });
  });

  // ======================= MANEJO DE ERRORES =======================
  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
    });

    form.querySelectorAll(".input-invalid").forEach((el) => {
      el.classList.remove("input-invalid");
    });
  }

  function setError(inputEl, message) {
    const errorEl = inputEl.parentElement.querySelector(".field-error");
    if (errorEl) {
      errorEl.textContent = message;
    }
    inputEl.classList.add("input-invalid");
  }

  // ======================= VALIDACIÓN DEL FORM =======================
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    // ---- Asunto ----
    if (!subject.value.trim()) {
      setError(subject, "El asunto es obligatorio.");
      hasError = true;
    }

    // ---- Correo ----
    if (!email.value.trim()) {
      setError(email, "El correo es obligatorio.");
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        setError(email, "Ingrese un correo válido.");
        hasError = true;
      }
    }

    // ---- Destinatario ----
    if (!recipient.value.trim()) {
      setError(recipient, "El destinatario es obligatorio.");
      hasError = true;
    }

    // ---- Mensaje ----
    if (!message.value.trim()) {
      const errorEl = message.nextElementSibling;
      if (errorEl && errorEl.classList.contains("field-error")) {
        errorEl.textContent = "El mensaje es obligatorio.";
      }
      message.classList.add("input-invalid");
      hasError = true;
    }

    // ======================= RESULTADO =======================
    if (hasError) {
      openModal(validationErrorModal);
      return;
    }

    // Simulación de envío
    const simulatedSuccess = Math.random() > 0.75;

    if (simulatedSuccess) {
      openModal(successModal);
    } else {
      openModal(serverErrorModal);
    }
  });
})();
