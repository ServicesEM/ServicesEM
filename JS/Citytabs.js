(function () {
    let initializedTabs = new WeakSet();

    function initializeTabs() {
        const tabLinks = document.querySelectorAll(".tablinks");
        const tabContents = document.querySelectorAll(".tabcontent");

        tabLinks.forEach((tab) => {
            if (initializedTabs.has(tab)) return;

            tab.addEventListener("click", (event) => {
                const cityName = event.target.getAttribute("data-city");
                if (!cityName) return;

                tabContents.forEach((content) => {
                    content.style.display = "none";
                });

                tabLinks.forEach((link) => {
                    link.classList.remove("clicked");
                });

                const activeContent = document.getElementById(cityName);
                if (activeContent) activeContent.style.display = "block";

                event.target.classList.add("clicked");
                const defaultTab = document.getElementById("default");
                if (defaultTab) defaultTab.classList.remove("clicked");
            });

            initializedTabs.add(tab);
        });
    }

    const observer = new MutationObserver(() => initializeTabs());
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTabs);
    } else {
        initializeTabs();
    }
})();
