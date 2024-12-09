(function () {
    let initializedAccordions = new WeakSet(); // Para evitar re-inicialización de elementos

    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");

        if (!accordions.length) {
            console.warn("No se encontraron elementos con la clase 'emaccordion'.");
            return;
        }

        accordions.forEach((accordion, index) => {
            if (initializedAccordions.has(accordion)) return; // Evita reinicializar

            const panel = accordion.nextElementSibling;
            if (!panel) {
                console.error(`El acordeón con índice ${index} no tiene un panel asociado.`);
                return;
            }

            console.log(`Inicializando acordeón con índice ${index}:`, accordion);

            // Configuración inicial
            accordion.setAttribute("role", "button");
            accordion.setAttribute("aria-expanded", "false");
            accordion.setAttribute("aria-controls", `panel-${index}`);
            accordion.setAttribute("tabindex", "0");

            panel.setAttribute("id", `panel-${index}`);
            panel.setAttribute("role", "region");
            panel.setAttribute("hidden", "");

            // Agregar eventos
            accordion.addEventListener("click", () => toggleAccordion(accordion, panel));
            accordion.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleAccordion(accordion, panel);
                }
            });

            // Marcar como inicializado
            initializedAccordions.add(accordion);
        });
    }

    function toggleAccordion(accordion, panel) {
        const isOpen = accordion.getAttribute("aria-expanded") === "true";
        accordion.setAttribute("aria-expanded", !isOpen);
        panel.hidden = isOpen;
        console.log(`El acordeón fue ${!isOpen ? "abierto" : "cerrado"}.`);
    }

    function observeDynamicContent() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    console.log("Nuevos nodos añadidos al DOM. Re-inicializando acordeones.");
                    initializeAccordions();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("Observando cambios en el DOM para contenido dinámico.");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("El DOM ya estaba listo al cargar el script.");
            initializeAccordions();
            observeDynamicContent();
        });
    } else {
        console.log("El DOM ya estaba listo al cargar el script.");
        initializeAccordions();
        observeDynamicContent();
    }
})();
