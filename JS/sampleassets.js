//Accordion Script
document.addEventListener("DOMContentLoaded", function () {
    var accordions = document.querySelectorAll(".emaccordion");
    accordions.forEach(function (accordion) {
        accordion.addEventListener("click", function () {
            var panel = this.nextElementSibling;
            var isOpen = this.getAttribute("aria-expanded") === "true";
            accordions.forEach(function (acc) {
                acc.setAttribute("aria-expanded", "false");
                acc.classList.remove("active");
            });
            if (!isOpen) {
                this.setAttribute("aria-expanded", "true");
                this.classList.add("active");
            }
            panel.classList.toggle("show");
        });
        accordion.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.click();
            }
        });
    });
});