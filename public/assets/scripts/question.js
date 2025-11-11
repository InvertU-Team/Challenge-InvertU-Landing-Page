// Diccionario de preguntas frecuentes
const questions = {
    1: {
        question: "¿Cómo puedo registrar un ingreso o un gasto en InvertU?",
        answer: `Desde el panel principal, selecciona el apartado “Clasificación de ingresos y gastos”.
    Luego elige si deseas registrar un ingreso o un gasto, indica si es fijo o variable,
    coloca el monto y selecciona una categoría (como “comida”, “transporte” o “estudio”).<br>
    También puedes añadir una nota o imagen (como una boleta o comprobante).<br>
    InvertU guardará automáticamente el registro y actualizará tus gráficos de balance mensual.`,
        image: "assets/images/chatbot-1.png",
        class: ""
    },
    2: {
        question: "¿Cómo funcionan las notificaciones de InvertU?",
        answer: `Las notificaciones están pensadas para acompañarte en tu educación financiera.<br>
    Te alertan cuando:<br>• Estás cerca de alcanzar una meta.<br>• Superas tu presupuesto mensual.<br>
    • Se detectan gastos repetitivos.<br>• Hay nuevos consejos financieros disponibles.<br>
    Puedes personalizar qué tipo de alertas deseas recibir desde la sección “Configuración”.`,
        image: "assets/images/chatbot-2.png",
        class: ""
    },
    3: {
        question: "¿InvertU ofrece recomendaciones personalizadas?",
        answer: `Sí. A medida que registras tus movimientos, la app analiza tus patrones de gasto y te brinda consejos personalizados.<br>
    Por ejemplo: si gastas mucho en delivery, te sugerirá establecer un límite o trasladar parte de ese dinero a tu meta de ahorro.<br>
    El objetivo es ayudarte a aprender de tus propios hábitos y tomar decisiones más inteligentes.`,
        image: "assets/images/chatbot-3.png",
        class: ""
    },
    4: {
        question: "¿Cómo puedo establecer una meta de ahorro?",
        answer: `Desde la sección “Metas”, selecciona “Crear meta” e indica el título (por ejemplo: “ahorrar para mi laptop” o “viaje de promoción”), descripción y métricas.<br>
    InvertU calculará cuánto necesitas ahorrar cada semana o mes, y te enviará alertas para motivarte y mostrar tu progreso visual con una barra de avance.`,
        image: "assets/images/chatbot-4.png",
        class: "question4"
    },
    5: {
        question: "¿InvertU tiene una versión gratuita y una versión premium?",
        answer: `Sí. La versión gratuita te permite registrar tus finanzas básicas, crear metas de ahorro y visualizar tus progresos.<br>
    La versión premium incluye herramientas avanzadas como clasificación automática por boletos, reportes inteligentes, retos financieros y asesorías personalizadas.<br>
    El objetivo es que puedas comenzar con la versión gratuita y, si lo deseas posteriormente, acceder a herramientas más completas.`,
        image: "assets/images/chatbot-5.png",
        class: ""
    }
};

// Crear triángulo dinámico dentro del contenedor
const faqContent = document.getElementById("faq-content");
const triangle = document.createElement("div");
triangle.classList.add("triangle");
faqContent.appendChild(triangle);

// Función que posiciona el triángulo debajo del botón activo
function moveTriangle(button) {
    const buttonRect = button.getBoundingClientRect();
    const containerRect = faqContent.getBoundingClientRect();
    const leftPosition = buttonRect.left - containerRect.left + buttonRect.width / 2 - 22;
    triangle.style.left = `${leftPosition}px`;
}

// Función que actualiza la pregunta seleccionada
function showQuestion(number, button) {
    const content = questions[number];

    // Reiniciar clases del contenedor
    faqContent.className = "faq-content";
    if (content.class) faqContent.classList.add(content.class);

    // Actualizar estado de los botones
    document.querySelectorAll(".faq-buttons button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Actualizar contenido de la pregunta
    document.getElementById("question-title").textContent = content.question;
    document.getElementById("question-answer").innerHTML = content.answer;
    document.getElementById("question-image").src = content.image;

    // Reposicionar triángulo
    moveTriangle(button);
}

// 🔹 Posicionar triángulo al cargar la página
window.onload = () => {
    const activeButton = document.querySelector(".faq-buttons button.active");
    moveTriangle(activeButton);
};
