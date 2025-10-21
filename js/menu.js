function initMenu() {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener("click", function () {
    const willOpen = !mobileMenu.classList.contains("open");
    this.classList.toggle("open", willOpen);
    mobileMenu.classList.toggle("open", willOpen);
    this.setAttribute("aria-expanded", willOpen ? "true" : "false");
    mobileMenu.setAttribute("aria-hidden", willOpen ? "false" : "true");
  });

  mobileMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mobileMenu.classList.remove("open");
      burgerBtn.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      burgerBtn.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  initializeHeaderSearch();
});

function initializeHeaderSearch() {
  const searchInput = document.querySelector('.search-product input');
  
  if (!searchInput) return;

  // Handle Enter key press
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(this.value.trim());
    }
  });

  // Optional: Add search icon/button functionality
  const searchContainer = document.querySelector('.search-product');
  if (searchContainer) {
    // Check if search button exists, if not create one
    let searchBtn = searchContainer.querySelector('.search-btn');
    if (!searchBtn) {
      searchBtn = document.createElement('button');
      searchBtn.className = 'search-btn';
      searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
      searchBtn.setAttribute('type', 'button');
      searchBtn.setAttribute('title', 'Search');
      searchContainer.appendChild(searchBtn);
    }
    
    searchBtn.addEventListener('click', function() {
      const searchValue = searchInput.value.trim();
      performSearch(searchValue);
    });
  }
}

function performSearch(searchTerm) {
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  // Get current page path to determine if we're already on product page
  const currentPath = window.location.pathname;
  const isOnProductPage = currentPath.includes('product.html');

  if (isOnProductPage) {
    // If already on product page, trigger search directly
    const productSearchInput = document.getElementById('productSearch');
    if (productSearchInput) {
      productSearchInput.value = searchTerm;
      
      // Trigger input event to filter products
      const event = new Event('input', { bubbles: true });
      productSearchInput.dispatchEvent(event);
      
      // Scroll to products section
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  } else {
    // Redirect to product page with search parameter
    const encodedSearch = encodeURIComponent(searchTerm);
    window.location.href = `../pages/product.html?search=${encodedSearch}`;
  }
}

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeHeaderSearch, performSearch };
}