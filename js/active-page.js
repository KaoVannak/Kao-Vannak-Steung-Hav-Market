(function () {
  "use strict";

  /**
   * Sets the active state for navigation links based on current page
   */
  function setActivePage() {
    // Get current page path
    const currentPath = window.location.pathname;
    let currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

    // Decode URL-encoded characters (like %20 for spaces)
    currentPage = decodeURIComponent(currentPage);

    console.log("=== Active Page Debug ===");
    console.log("Current path:", currentPath);
    console.log("Current page:", currentPage);

    // Determine which page we're on
    let activePage = "";

    if (
      currentPage === "index.html" ||
      currentPage === "" ||
      currentPath.endsWith("/") ||
      currentPath.includes("index")
    ) {
      activePage = "home";
    } else if (
      currentPage === "product.html" ||
      currentPage.includes("product")
    ) {
      activePage = "product";
    } else if (
      currentPage === "about-us.html" ||
      currentPage === "about%20us.html" ||
      currentPage.includes("about")
    ) {
      activePage = "about";
    } else if (
      currentPage === "service.html" ||
      currentPage.includes("service")
    ) {
      activePage = "service";
    }

    console.log("Detected active page:", activePage);

    // Set active class for desktop menu
    const desktopLinks = document.querySelectorAll(".menu a[data-page]");
    console.log("Found desktop links:", desktopLinks.length);

    desktopLinks.forEach((link) => {
      const linkPage = link.getAttribute("data-page");
      if (linkPage === activePage) {
        link.classList.add("active");
        console.log("✓ Set active on desktop:", link.textContent.trim());
      } else {
        link.classList.remove("active");
      }
    });

    // Set active class for mobile menu
    const mobileLinks = document.querySelectorAll(".mobile-menu a[data-page]");
    console.log("Found mobile links:", mobileLinks.length);

    mobileLinks.forEach((link) => {
      const linkPage = link.getAttribute("data-page");
      if (linkPage === activePage) {
        link.classList.add("active");
        console.log("✓ Set active on mobile:", link.textContent.trim());
      } else {
        link.classList.remove("active");
      }
    });

    console.log("=========================");
  }

  /**
   * Initialize active page detection
   */
  function init() {
    console.log("Initializing active-page.js...");

    // Run immediately if DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setActivePage);
    } else {
      setActivePage();
    }

    // Also run when header is dynamically loaded via jQuery
    document.addEventListener("headerLoaded", function () {
      console.log("Header loaded event received");
      setTimeout(setActivePage, 100); // Increased delay to ensure DOM is updated
    });

    // Fallback: Check every 100ms for the first 3 seconds (for dynamic loading)
    let attempts = 0;
    const maxAttempts = 30;
    const checkInterval = setInterval(function () {
      const menuExists = document.querySelector(".menu a[data-page]");
      if (menuExists) {
        console.log("Menu found via interval check");
        setActivePage();
        clearInterval(checkInterval);
      }
      attempts++;
      if (attempts >= maxAttempts) {
        console.log("Max attempts reached, stopping interval check");
        clearInterval(checkInterval);
      }
    }, 100);
  }

  // Start initialization
  init();

  // Expose function globally if needed
  window.setActivePage = setActivePage;

  console.log("✓ active-page.js loaded successfully");
})();
