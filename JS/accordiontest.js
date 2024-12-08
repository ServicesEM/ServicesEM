(function () {
    // Función para inicializar los acordeones2
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

    // Iniciar acordeones cuando el script se haya cargado
    initializeAccordions();
})();
