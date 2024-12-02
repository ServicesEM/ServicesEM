(function () {
    function openCity(evt, cityName) {
        const tabcontents = document.getElementsByClassName("tabcontent");
        const tablinks = document.getElementsByClassName("tablinks");

        Array.from(tabcontents).forEach(content => {
            content.style.display = "none";
        });

        Array.from(tablinks).forEach(link => {
            link.className = link.className.replace(" clicked", "");
        });

        const targetTab = document.getElementById(cityName);
        if (targetTab) targetTab.style.display = "block";

        const defaultTab = document.getElementById("default");
        if (defaultTab) defaultTab.classList.remove("clicked");

        evt.target.className += " clicked";
    }

    function initializeCityTabs() {
        const defaultButton = document.getElementById("default");
        if (defaultButton) {
            const defaultCity = defaultButton.getAttribute("onclick").match(/'(\d+)'/)[1];
            document.getElementById(defaultCity).style.display = "block";
        }
    }

    function observeCityTabs() {
        const observer = new MutationObserver((_, observerInstance) => {
            const tablinks = document.getElementsByClassName("tablinks");
            if (tablinks.length) {
                observerInstance.disconnect();
                initializeCityTabs();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            initializeCityTabs();
            observeCityTabs();
        });
    } else {
        initializeCityTabs();
        observeCityTabs();
    }

    window.openCity = openCity;
})();
