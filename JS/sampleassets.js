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

    // Check the DOM state and initialize accordingly
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeAccordions);
    } else {
        console.log("DOM already loaded. Initializing accordions...");
        initializeAccordions();
    }
})();
