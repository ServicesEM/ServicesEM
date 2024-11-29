//Accordion Script
(function () {
    console.log("Script cargado. Iniciando MutationObserver...");
    const observer = new MutationObserver(function (mutations, observerInstance) {
        console.log("Detectando cambios en el DOM...");
        const accordions = document.querySelectorAll(".emaccordion");
        console.log(`Acordeones encontrados: ${accordions.length}`);
        if (accordions.length > 0) {
            console.log("Acordeones detectados. Deteniendo MutationObserver...");
            observerInstance.disconnect();

            function initializeAccordions() {
                console.log("Inicializando comportamiento de los acordeones...");
                accordions.forEach(function (accordion) {
                    console.log("Añadiendo eventos al acordeón:", accordion);

                    accordion.addEventListener("click", function () {
                        console.log("Acordeón clickeado:", this);
                        const panel = this.nextElementSibling;
                        const isOpen = this.getAttribute("aria-expanded") === "true";
                        console.log(`Estado actual del acordeón: ${isOpen ? "Abierto" : "Cerrado"}`);

                        accordions.forEach(function (acc) {
                            acc.setAttribute("aria-expanded", "false");
                            acc.classList.remove("active");
                            const siblingPanel = acc.nextElementSibling;
                            if (siblingPanel) {
                                siblingPanel.classList.remove("show");
                                console.log("Cerrando panel:", siblingPanel);
                            }
                        });

                        if (!isOpen) {
                            console.log("Abriendo acordeón:", this);
                            this.setAttribute("aria-expanded", "true");
                            this.classList.add("active");
                            panel.classList.add("show");
                        }
                    });

                    accordion.addEventListener("keydown", function (event) {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            console.log("Tecla presionada en acordeón:", event.key);
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
