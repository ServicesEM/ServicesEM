//Accordion Script
(function () {
    /**
     * Inicializa el comportamiento de los acordeones2.
     */
    function initializeAccordions() {
        console.log("Initializing accordions...");
        const accordions = document.querySelectorAll(".emaccordion");
        if (accordions.length === 0) {
            console.warn("No accordions found in the DOM.");
            return;
        }

        accordions.forEach((accordion, index) => {
            console.log(`Adding events to accordion ${index + 1}`);

            accordion.addEventListener("click", function () {
                console.log(`Accordion ${index + 1} clicked.`);
                const panel = this.nextElementSibling;
                if (!panel) {
                    console.error(`Panel not found for accordion ${index + 1}.`);
                    return;
                }

                const isOpen = this.getAttribute("aria-expanded") === "true";

                accordions.forEach(acc => {
                    acc.setAttribute("aria-expanded", "false");
                    acc.classList.remove("active");
                    const siblingPanel = acc.nextElementSibling;
                    if (siblingPanel) siblingPanel.classList.remove("show");
                });

                if (!isOpen) {
                    this.setAttribute("aria-expanded", "true");
                    this.classList.add("active");
                    panel.classList.add("show");
                }
            });

            accordion.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    console.log(`Key pressed on accordion ${index + 1}:`, event.key);
                    this.click();
                }
            });
        });
    }

    /**
     * Monitorea los cambios en el DOM y se asegura de inicializar los acordeones solo cuando sea seguro hacerlo.
     */
    function observeAccordions() {
        const observer = new MutationObserver((mutations, observerInstance) => {
            const accordions = document.querySelectorAll(".emaccordion");
            if (accordions.length > 0) {
                console.log("Accordions detected in the DOM. Initializing...");
                observerInstance.disconnect();
                setTimeout(() => {
                    initializeAccordions();
                }, 100); // Espera para evitar interferencias
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Verifica el estado del DOM y actúa en consecuencia.
     */
    if (document.readyState === "loading") {
        console.log("DOM still loading. Adding MutationObserver...");
        observeAccordions();
    } else {
        console.log("DOM already loaded. Checking for accordions...");
        setTimeout(() => {
            initializeAccordions();
        }, 100); // Espera para asegurar que el DOM esté completamente interactuable
    }
})();
