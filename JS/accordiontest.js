(function () {
    // Función para inicializar acordeone22
    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");

        if (!accordions.length) return;

        accordions.forEach((accordion, index) => {
            const panel = accordion.nextElementSibling;

            // Configuración inicial de accesibilidad
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
            });

            // Permitir abrir/cerrar con el teclado
            accordion.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Función para alternar el estado del acordeón
    function toggleAccordion(accordion, panel, open) {
        accordion.setAttribute("aria-expanded", open);
        panel.hidden = !open;
    }

    // Función para observar cambios en el DOM y aplicar la funcionalidad a nuevos acordeones
    function observeAccordions() {
        const observer = new MutationObserver((mutationsList, observer) => {
            // Solo re-inicializa los acordeones si se detectan cambios en el DOM
            const accordions = document.querySelectorAll(".emaccordion");
            if (accordions.length) {
                observer.disconnect();  // Detener la observación una vez que los acordeones se hayan encontrado
                initializeAccordions();  // Inicializa acordeones
            }
        });

        // Observar cambios en el body para detectar nuevos acordeones añadidos dinámicamente
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Llamada inicial para inicializar los acordeones en la carga de la página
    initializeAccordions();

    // Llamada para observar cambios en el DOM
    observeAccordions();
})();
