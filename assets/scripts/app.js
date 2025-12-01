// ==============================
//  SPA – Sistema de carga dinámica por scroll
// ==============================

(() => {
  // ====== Declaración de secciones ======
  const sections = [
    {
      sentinelId: "sentinel-1",
      containerId: "primero-container",
      htmlPath: "assets/index/who-we-are.html",
      cssPath: "assets/styles/who-we-are.css",
      scopeClass: "scope-who",
    },
    {
      sentinelId: "sentinel-2",
      containerId: "segundo-container",
      htmlPath: "assets/index/testimonials.html",
      cssPath: "assets/styles/testimonials.css",
      scopeClass: "scope-testimonials",
    },
    {
      sentinelId: "sentinel-3",
      containerId: "tercero-container",
      htmlPath: "assets/index/choose.html",
      cssPath: "assets/styles/choose.css",
      scopeClass: "scope-choose",
    },
    {
      sentinelId: "sentinel-4",
      containerId: "cuarto-container",
      htmlPath: "assets/index/guide.html",
      cssPath: "assets/styles/guide.css",
      scopeClass: "scope-guide",
    },
    {
      sentinelId: "sentinel-5",
      containerId: "quinto-container",
      htmlPath: "assets/index/funtion.html",
      cssPath: "assets/styles/funtion.css",
      jsPath: "assets/scripts/funtion.js",
      scopeClass: "scope-funtion",
    },
    {
      sentinelId: "sentinel-6",
      containerId: "sexto-container",
      htmlPath: "assets/index/question.html",
      cssPath: "assets/styles/question.css",
      jsPath: "assets/scripts/question.js",
      scopeClass: "scope-question",
    },
    {
      sentinelId: "sentinel-7",
      containerId: "septimo-container",
      htmlPath: "assets/index/news.html",
      cssPath: "assets/styles/news.css",
      jsPath: "assets/scripts/news.js",
      scopeClass: "scope-news",
    },
    {
      sentinelId: "sentinel-8",
      containerId: "octavo-container",
      htmlPath: "assets/index/contact.html",
      cssPath: "assets/styles/contact.css",
      jsPath: "assets/scripts/contact.js",
      scopeClass: "scope-contact",
    },
  ];

  // ====== Inyectar CSS evitando duplicados ======
  const ensureCssLoaded = (href) => {
    if (!href) return;
    if (document.head.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  // ====== Control de clase global del body ======
  const setBodyScope = (scopeClass) => {
    document.body.className = scopeClass || "";
  };

  // ====== Carga de sección ======
  const loadSection = async ({
    containerId,
    htmlPath,
    cssPath,
    jsPath,
    scopeClass,
  }) => {
    ensureCssLoaded(cssPath);

    const res = await fetch(htmlPath, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error al cargar ${htmlPath}: ${res.status}`);

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    let content = doc.querySelector("section") || doc.body;
    if (scopeClass) content.classList.add(scopeClass);

    setBodyScope(scopeClass);

    const container = document.getElementById(containerId);
    if (container) container.appendChild(content);

    // Cargar JS propio de la sección
    if (jsPath) {
      const script = document.createElement("script");
      script.src = jsPath;
      script.defer = true;

      script.onload = () => {
        if (
          jsPath.includes("news.js") &&
          typeof initializeNewsCarousel === "function"
        ) {
          initializeNewsCarousel();
        }
      };

      document.body.appendChild(script);
    }
  };

  // ====== Observadores ======
  const initObservers = () => {
    sections.forEach((section) => {
      let loaded = false;

      const observer = new IntersectionObserver(
        async (entries, obs) => {
          if (entries[0].isIntersecting && !loaded) {
            loaded = true;
            try {
              await loadSection(section);
            } catch (err) {
              console.error(err);
            }
            obs.disconnect();
          }
        },
        { rootMargin: "200px" }
      );

      const sentinel = document.getElementById(section.sentinelId);
      if (sentinel) observer.observe(sentinel);
    });
  };

  window.addEventListener("DOMContentLoaded", initObservers);
})();

// ==============================
//  BÚSQUEDA + NAVBAR
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // ====== Input & botones ======
  const input = document.querySelector(".search-input");
  const clearBtn = document.querySelector(".button-clear");
  const form = document.querySelector(".search-form");
  const navButtons = document.querySelectorAll(".nav-button");

  // ==========================
  // ÍNDICE DE ARCHIVOS A BUSCAR
  // ==========================
  const searchIndex = [
    {
      title: "Nosotros",
      file: "assets/index/who-we-are.html",
      section: "sentinel-1",
    },
    {
      title: "Testimonios",
      file: "assets/index/testimonials.html",
      section: "sentinel-2",
    },
    {
      title: "Escoge",
      file: "assets/index/choose.html",
      section: "sentinel-3",
    },
    { title: "Guía", file: "assets/index/guide.html", section: "sentinel-4" },
    {
      title: "Funciones",
      file: "assets/index/funtion.html",
      section: "sentinel-5",
    },
    {
      title: "Preguntas",
      file: "assets/index/question.html",
      section: "sentinel-6",
    },
    {
      title: "Noticias",
      file: "assets/index/news.html",
      section: "sentinel-7",
    },
    {
      title: "Contacto",
      file: "assets/index/contact.html",
      section: "sentinel-8",
    },
  ];

  // ==========================
  // Limpieza visual del buscador
  // ==========================
  if (input && clearBtn) {
    input.addEventListener("input", () => {
      clearBtn.classList.toggle("is-visible", input.value.trim().length > 0);
    });

    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.classList.remove("is-visible");
      input.focus();
    });
  }

  // ==========================
  // Lógica del buscador
  // ==========================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = input.value.trim().toLowerCase();
    if (!query) return;

    // 1. Buscar por título del índice
    let match = searchIndex.find((item) =>
      item.title.toLowerCase().includes(query)
    );

    if (match) {
      const section = document.getElementById(match.section);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2. Si no coincide por título → buscar dentro del HTML real
    for (const item of searchIndex) {
      try {
        const res = await fetch(item.file);
        const html = await res.text();
        const lower = html.toLowerCase();

        if (lower.includes(query)) {
          const section = document.getElementById(item.section);
          if (section) section.scrollIntoView({ behavior: "smooth" });
          return;
        }
      } catch {
        console.warn("No se pudo leer:", item.file);
      }
    }

    console.log("Sin resultados para:", query);
  });

  // ==========================
  // NAVBAR → Scroll interno SPA
  // ==========================
  const pageToSentinel = {
    principales: "sentinel-1",
    nosotros: "sentinel-1",
    testimonios: "sentinel-2",
    funciones: "sentinel-3",
    guia: "sentinel-4",
  };

  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const page = e.currentTarget.dataset.page;
      const targetId = pageToSentinel[page];
      const sentinel = document.getElementById(targetId);

      if (sentinel) {
        sentinel.scrollIntoView({ behavior: "smooth" });
      }

      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ====== Detectar hash para navegar automáticamente ======
  const hash = window.location.hash.replace("#", "");

  if (hash) {
    const pageToSentinel = {
      principales: "sentinel-1",
      nosotros: "sentinel-1",
      testimonios: "sentinel-2",
      funciones: "sentinel-3",
      guia: "sentinel-4",
    };

    const targetId = pageToSentinel[hash];
    const target = document.getElementById(targetId);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300); // Espera un poco a que carguen las secciones
    }
  }
});
