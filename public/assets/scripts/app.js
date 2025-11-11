// app.js (versión con scoping por sección y control de fondo por <body>)
(() => {
  // ====== Declaración de secciones a cargar por scroll ======
  const sections = [
    {
      // 1ª sección: carpeta "major"
      sentinelId: "sentinel-1",
      containerId: "primero-container",
      htmlPath: "assets/index/major.html",
      cssPath: "assets/styles/major.css",
      jsPath: "assets/scripts/major.js", // opcional
      scopeClass: "scope-major"
    },
    {
      // 2ª sección: carpeta "guide"
      sentinelId: "sentinel-2",
      containerId: "segundo-container",
      htmlPath: "assets/index/guide.html",
      cssPath: "assets/styles/guide.css",
      // jsPath: null,
      scopeClass: "scope-guide"
    },
    {
      // 3ª sección: carpeta "funtion" (sic)
      sentinelId: "sentinel-3",
      containerId: "tercero-container",
      htmlPath: "assets/index/funtion.html",
      cssPath: "assets/styles/funtion.css",
      jsPath: "assets/scripts/funtion.js", // opcional
      scopeClass: "scope-funtion"
    },
    {
      // 4ª sección: carpeta "question"
      sentinelId: "sentinel-4",
      containerId: "cuarto-container",
      htmlPath: "assets/index/question.html",
      cssPath: "assets/styles/question.css",
      jsPath: "assets/scripts/question.js", // opcional
      scopeClass: "scope-question"
    }
  ];

  // ====== Utilidad: inyectar CSS evitando duplicados ======
  const ensureCssLoaded = (href, idHint) => {
    if (!href) return;
    const selector = `link[rel="stylesheet"][href="${href}"]`;
    if (document.head.querySelector(selector)) return; // ya está cargado
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    if (idHint) link.dataset.sectionCss = idHint;
    document.head.appendChild(link);
  };

  // ====== Utilidad: asignar clase al <body> para controlar el fondo ======
  // - Major usa body.major { background-image: ... }
  // - Otras secciones usan body.scope-xxx (para que su CSS pueda anular o definir color)
  const setBodyScope = (scopeClass) => {
    if (scopeClass === "scope-major") {
      document.body.className = "major"; // activa el fondo de Major
    } else {
      document.body.className = scopeClass || ""; // p.ej. scope-question, scope-guide, scope-funtion
    }
  };

  // ====== Carga genérica de una sección ======
  const loadSection = async ({ containerId, htmlPath, cssPath, jsPath, scopeClass }) => {
    // 1) Inyectar CSS propio de la sección (si no está)
    ensureCssLoaded(cssPath, scopeClass || "");

    // 2) Traer el HTML remoto (sin caché para ver cambios al instante)
    const res = await fetch(htmlPath, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error al cargar ${htmlPath}: ${res.status}`);
    const html = await res.text();

    // 3) Parsear y extraer la primera <section> (o <body> si no hubiera)
    const doc = new DOMParser().parseFromString(html, "text/html");
    const contenido = doc.querySelector("section") || doc.body;

    // 4) Encapsular estilos de la sección con una clase "scope"
    if (scopeClass) {
      contenido.classList?.add(scopeClass);
      // Si vino como <body> (varios nodos sueltos), envolverlos en un wrapper con la clase
      if (contenido === doc.body) {
        const wrapper = document.createElement("div");
        wrapper.className = scopeClass;
        while (contenido.firstChild) wrapper.appendChild(contenido.firstChild);
        contenido.innerHTML = "";
        contenido.appendChild(wrapper);
      }
    }

    // 5) Cambiar clase del <body> según la sección cargada (controla el fondo)
    setBodyScope(scopeClass);

    // 6) Insertar en el contenedor destino
    const cont = document.getElementById(containerId);
    if (cont) cont.appendChild(contenido);

    // 7) (Opcional) Inyectar JS propio de la sección
    if (jsPath) {
      const paths = Array.isArray(jsPath) ? jsPath : [jsPath];
      for (const p of paths) {
        const s = document.createElement("script");
        s.src = p;
        s.defer = true;
        document.body.appendChild(s);
      }
    }
  };

  // ====== Inicializa un IntersectionObserver por sección ======
  const initObservers = () => {
    sections.forEach((section) => {
      let loaded = false;

      const observer = new IntersectionObserver(
        async (entries, obs) => {
          if (entries[0].isIntersecting && !loaded) {
            loaded = true;
            try {
              await loadSection(section);
            } catch (e) {
              console.error(e);
            } finally {
              obs.disconnect();
            }
          }
        },
        { rootMargin: "200px", threshold: 0 }
      );

      const sentinel = document.getElementById(section.sentinelId);
      if (sentinel) observer.observe(sentinel);
    });
  };

  window.addEventListener("DOMContentLoaded", initObservers);
})();

"use strict";

// ====== Búsqueda / UI header ======
document.addEventListener("DOMContentLoaded", () => {
  // ====== Búsqueda ======
  const input = document.querySelector(".search-input");
  const clearBtn = document.querySelector(".button-clear");
  const form = document.querySelector(".search-form");

  if (input && clearBtn) {
    input.addEventListener("input", () => {
      const hasText = input.value.trim().length > 0;
      clearBtn.classList.toggle("is-visible", hasText);
    });

    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.classList.remove("is-visible");
      input.focus();
    });
  }

  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      // TODO: conecta con la búsqueda real
      console.log("Searching for:", q);
    });
  }

  // ====== Estado activo de la navegación ======
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      navButtons.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      console.log(
        "Navegación simulada a la sección:",
        e.currentTarget.getAttribute("data-page")
      );
    });
  });
});
