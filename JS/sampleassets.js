//Accordion Script
(function () {
    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");
        if (accordions.length === 0) return;

        accordions.forEach(accordion => {
            accordion.addEventListener("click", function () {
                const panel = this.nextElementSibling;
                if (!panel) return;

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
                    this.click();
                }
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeAccordions);
    } else {
        initializeAccordions();
    }
})();
