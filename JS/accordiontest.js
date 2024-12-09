(function () {
    let initializedAccordions = new WeakSet();

    function initializeAccordions() {
        const accordions = document.querySelectorAll(".emaccordion");

        accordions.forEach((accordion, index) => {
            if (initializedAccordions.has(accordion)) return;

            const panel = accordion.nextElementSibling;
            if (!panel) return;

            accordion.setAttribute("role", "button");
            accordion.setAttribute("aria-expanded", "false");
            accordion.setAttribute("aria-controls", `panel-${index}`);
            accordion.setAttribute("tabindex", "0");

            panel.setAttribute("id", `panel-${index}`);
            panel.setAttribute("role", "region");
            panel.setAttribute("hidden", "");

            accordion.addEventListener("click", function () {
                const isOpen = accordion.getAttribute("aria-expanded") === "true";
                accordion.setAttribute("aria-expanded", !isOpen);
                panel.hidden = isOpen;
            });

            accordion.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    accordion.click();
                }
            });

            initializedAccordions.add(accordion);
        });
    }

    const observer = new MutationObserver(() => initializeAccordions());
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeAccordions);
    } else {
        initializeAccordions();
    }
})();
