(function () {
    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");

        if (!accordions.length) {
            console.warn("No se encontraron elementos con la clase 'emaccordion'. Asegúrate de que los acordeones estén en el DOM.");
            return;
        }

        accordions.forEach((accordion, index) => {
            const panel = accordion.nextElementSibling;

            if (!panel) {
                console.error(`El acordeón con índice ${index} no tiene un panel asociado como su siguiente elemento.`);
                return;
            }

            // Configuración inicial de accesibilidad
            console.log(`Inicializando acordeón con índice ${index}:`, accordion);
            accordion.setAttribute("role", "button");
            accordion.setAttribute("aria-expanded", "false");
            accordion.setAttribute("aria-controls", `panel-${index}`);
            accordion.setAttribute("tabindex", "0");

            panel.setAttribute("id", `panel-${index}`);
            panel.setAttribute("role", "region");
            panel.setAttribute("hidden", "");

            // Eventos para abrir y cerrar el acordeón
            accordion.addEventListener("click", function () {
                const isOpen = this.getAttribute("aria-expanded") === "true";
                toggleAccordion(accordion, panel, !isOpen);
                console.log(`El acordeón con índice ${index} fue ${!isOpen ? "abierto" : "cerrado"}.`);
            });

            accordion.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.click();
                    console.log(`El acordeón con índice ${index} fue activado por el teclado.`);
                }
            });
        });
    }

    // Función para alternar el estado del acordeón
    function toggleAccordion(accordion, panel, open) {
        accordion.setAttribute("aria-expanded", open);
        panel.hidden = !open;
    }

    function observeDynamicContent() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches(".emaccordion")) {
                        console.log("Se detectó un nuevo acordeón dinámico en el DOM:", node);
                        initializeAccordions();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("Observando cambios en el DOM para contenido dinámico.");
    }

    // Inicialización principal
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("El DOM está completamente cargado.");
            initializeAccordions();
            observeDynamicContent();
        });
    } else {
        console.log("El DOM ya estaba listo al cargar el script.");
        initializeAccordions();
        observeDynamicContent();
    }
})();
