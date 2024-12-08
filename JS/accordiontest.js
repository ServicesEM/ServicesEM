function initAccordion(selector = ".emaccordion") {
    const accordions = document.querySelectorAll(selector);

    accordions.forEach((accordion, index) => {
        const panel = accordion.nextElementSibling;

        // Configuración inicial
        accordion.setAttribute("role", "button");
        accordion.setAttribute("aria-expanded", "false");
        accordion.setAttribute("aria-controls", `panel-${index}`);
        accordion.setAttribute("tabindex", "0");
        panel.setAttribute("id", `panel-${index}`);
        panel.setAttribute("role", "region");
        panel.setAttribute("hidden", "");

        // Eventos
        accordion.addEventListener("click", () => toggleAccordion(accordion, panel));
        accordion.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleAccordion(accordion, panel);
            }
        });
    });

    function toggleAccordion(accordion, panel) {
        const isOpen = accordion.getAttribute("aria-expanded") === "true";
        accordion.setAttribute("aria-expanded", !isOpen);
        panel.hidden = isOpen;
    }
}
