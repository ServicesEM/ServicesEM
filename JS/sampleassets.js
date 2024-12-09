(function () {
    let initializedAccordions = new WeakSet();

    function accordionSetup() {
        const accordions = document.getElementsByClassName("emaccordion");
        const panels = document.getElementsByClassName("empanel");

        Array.from(accordions).forEach((accordion) => {
            if (initializedAccordions.has(accordion)) return;

            accordion.addEventListener("click", function () {
                const isActive = this.classList.contains("active");
                toggleClasses(accordions, "active", "remove");
                toggleClasses(panels, "show", "remove");

                if (!isActive) {
                    this.classList.add("active");
                    const panel = this.nextElementSibling;
                    if (panel) panel.classList.add("show");
                }
            });

            initializedAccordions.add(accordion);
        });
    }

    function toggleClasses(elements, className, action) {
        Array.from(elements).forEach((el) => el.classList[action](className));
    }

    const observer = new MutationObserver(() => accordionSetup());
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", accordionSetup);
    } else {
        accordionSetup();
    }
})();
