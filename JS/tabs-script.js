//Script for Tabs
//Tabs version for multiple tabs
(function () {
    function initializeTabs() {
        const tabcontents = document.querySelectorAll(".tabcontent");
        tabcontents.forEach(content => (content.style.display = "none"));

        const tablinks = document.querySelectorAll(".tablink");
        tablinks.forEach(button => {
            button.addEventListener("click", function () {
                const tabId = this.getAttribute("data-tab");
                const sectionId = this.getAttribute("data-section");

                const tabcontentsInSection = document.querySelectorAll(`.tabcontent[data-section='${sectionId}']`);
                tabcontentsInSection.forEach(content => (content.style.display = "none"));

                const tablinksInSection = document.querySelectorAll(`.tablink[data-section='${sectionId}']`);
                tablinksInSection.forEach(link => link.classList.remove("clicked"));

                document.querySelector(`.tabcontent[data-tab='${tabId}'][data-section='${sectionId}']`).style.display = "block";
                this.classList.add("clicked");
            });
        });

        const defaultTabs = document.querySelectorAll(".tablink.clicked");
        defaultTabs.forEach(defaultButton => {
            const defaultTab = defaultButton.getAttribute("data-tab");
            const sectionId = defaultButton.getAttribute("data-section");

            document.querySelector(`.tabcontent[data-tab='${defaultTab}'][data-section='${sectionId}']`).style.display = "block";
        });
    }

    function observeTabs() {
        const observer = new MutationObserver((_, observerInstance) => {
            const tablinks = document.querySelectorAll(".tablink");
            if (tablinks.length) {
                observerInstance.disconnect();
                initializeTabs();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            initializeTabs();
            observeTabs();
        });
    } else {
        initializeTabs();
        observeTabs();
    }
})();
