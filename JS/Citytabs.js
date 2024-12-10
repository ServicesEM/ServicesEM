(function () {
    let initializedTabs = new WeakSet();

    function openCity(evt, cityName) {
        const tabContents = document.querySelectorAll(".tabcontent");
        const tabLinks = document.querySelectorAll(".tablinks, .clicked");

        tabContents.forEach((content) => {
            content.style.display = "none";
        });

        tabLinks.forEach((link) => {
            link.classList.remove("clicked");
        });

        const activeContent = document.getElementById(cityName);
        if (activeContent) activeContent.style.display = "block";

        evt.target.classList.add("clicked");
    }

    function initializeTabs() {
        const tabLinks = document.querySelectorAll(".tablinks, .clicked");
        const defaultTab = document.querySelector(".clicked") || tabLinks[0];

        if (defaultTab) {
            const defaultCity = defaultTab.getAttribute("id");
            const defaultContent = document.getElementById(defaultCity);
            if (defaultContent) defaultContent.style.display = "block";
            defaultTab.classList.add("clicked");
        }

        tabLinks.forEach((tabLink) => {
            if (!initializedTabs.has(tabLink)) {
                tabLink.addEventListener("click", function (evt) {
                    openCity(evt, tabLink.getAttribute("id"));
                });
                initializedTabs.add(tabLink);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTabs);
    } else {
        initializeTabs();
    }

    window.openCity = openCity;
})();
