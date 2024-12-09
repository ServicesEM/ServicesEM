(function () {
    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");

        if (!accordions.length) {
            console.warn("No se encontraron elementos con la clase 'emaccordion'.");
            return;
        }

        accordions.forEach((accordion, index) => {
            const panel = accordion.nextElementSibling;

            if (!panel) {
                console.error(`El acordeón con índice ${index} no tiene un panel asociado.`);
                return;
            }

            // Configuración inicial de acclesibilidad
            console.log(`Inicializando acordeón con índice ${index}:`, accordion);
            if (!accordion.hasAttribute("role")) {
                accordion.setAttribute("role", "button");
                accordion.setAttribute("aria-expanded", "false");
                accordion.setAttribute("aria-controls", `panel-${index}`);
                accordion.setAttribute("tabindex", "0");
                panel.setAttribute("id", `panel-${index}`);
                panel.setAttribute("role", "region");
                panel.setAttribute("hidden", "");
            }

            // Eventos para acordeón
            accordion.addEventListener("click", function () {
                const isOpen = this.getAttribute("aria-expanded") === "true";
                toggleAccordion(accordion, panel, !isOpen);
                console.log(`El acordeón con índice ${index} fue ${!isOpen ? "abierto" : "cerrado"}.`);
            });

            accordion.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    function toggleAccordion(accordion, panel, shouldOpen) {
        accordion.setAttribute("aria-expanded", shouldOpen);
        panel.hidden = !shouldOpen;
    }

    // Observación del DOM para contenido dinámico
    function observeAccordions() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches(".emaccordion")) {
                        console.log("Se detectó un nuevo acordeón dinámico:", node);
                        initializeAccordions();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("Observando cambios en el DOM para contenido dinámico.");
    }

    // Verificación del estado del DOM
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("El DOM se cargó completamente.");
            initializeAccordions();
            observeAccordions();
        });
    } else {
        console.log("El DOM ya estaba listo al cargar el script.");
        initializeAccordions();
        observeAccordions();
    }
})();
