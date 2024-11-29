//Accordion Script
(function () {
    /**
     * Inicializa el comportamiento de los acordeones.
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
                const panel = this.nextElementSibling;
                if (!panel) {
                    console.error(`Panel not found for accordion ${index + 1}.`);
                    return;
                }

                const isOpen = this.getAttribute("aria-expanded") === "true";

                // Close all accordions
                accordions.forEach(acc => {
                    acc.setAttribute("aria-expanded", "false");
                    acc.classList.remove("active");
                    const siblingPanel = acc.nextElementSibling;
                    if (siblingPanel) siblingPanel.classList.remove("show");
                });

                // Open current accordion if it was closed
                if (!isOpen) {
                    this.setAttribute("aria-expanded", "true");
                    this.classList.add("active");
                    panel.classList.add("show");
                }
            });

            accordion.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.click();
                }
            });
        });
    }

    /**
     * Observa los cambios en el DOM y ejecuta la inicialización cuando los acordeones estén disponibles.
     */
    function observeAccordions() {
        const observer = new MutationObserver((mutations, observerInstance) => {
            const accordions = document.querySelectorAll(".emaccordion");
            if (accordions.length > 0) {
                console.log("Accordions detected in the DOM. Initializing...");
                observerInstance.disconnect();
                initializeAccordions();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Verifica el estado del DOM y actúa en consecuencia
    if (document.readyState === "loading") {
        console.log("DOM still loading. Adding MutationObserver...");
        observeAccordions();
    } else {
        console.log("DOM already loaded. Checking for accordions...");
        const accordions = document.querySelectorAll(".emaccordion");
        if (accordions.length > 0) {
            initializeAccordions();
        } else {
            observeAccordions();
        }
    }
})();
