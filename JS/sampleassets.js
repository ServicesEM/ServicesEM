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
                accordions.forEach(function (accordion, index) {
                    console.log(`Añadiendo eventos al acordeón ${index + 1}:`, accordion);

                    accordion.addEventListener("click", function () {
                        console.log(`Acordeón ${index + 1} clickeado:`, this);

                        const panel = this.nextElementSibling;
                        if (!panel) {
                            console.error(`Panel no encontrado para el acordeón ${index + 1}. Verifica el HTML.`);
                            return;
                        }

                        const isOpen = this.getAttribute("aria-expanded") === "true";
                        console.log(`Estado actual del acordeón ${index + 1}: ${isOpen ? "Abierto" : "Cerrado"}`);

                        accordions.forEach(function (acc, i) {
                            acc.setAttribute("aria-expanded", "false");
                            acc.classList.remove("active");
                            const siblingPanel = acc.nextElementSibling;
                            if (siblingPanel) {
                                siblingPanel.classList.remove("show");
                                console.log(`Cerrando panel del acordeón ${i + 1}:`, siblingPanel);
                            }
                        });

                        if (!isOpen) {
                            console.log(`Abriendo acordeón ${index + 1}:`, this);
                            this.setAttribute("aria-expanded", "true");
                            this.classList.add("active");
                            panel.classList.add("show");
                            console.log(`Panel del acordeón ${index + 1} ahora tiene la clase "show":`, panel);
                        }
                    });

                    accordion.addEventListener("keydown", function (event) {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            console.log(`Tecla presionada en el acordeón ${index + 1}:`, event.key);
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
