//Accordion Script
(function () {
    const observer = new MutationObserver(function (mutations, observerInstance) {
        const accordions = document.querySelectorAll(".emaccordion");
        if (accordions.length > 0) {
            observerInstance.disconnect();

            function initializeAccordions() {
                accordions.forEach(function (accordion) {
                    accordion.addEventListener("click", function () {
                        const panel = this.nextElementSibling;
                        const isOpen = this.getAttribute("aria-expanded") === "true";

                        accordions.forEach(function (acc) {
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

            initializeAccordions();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
