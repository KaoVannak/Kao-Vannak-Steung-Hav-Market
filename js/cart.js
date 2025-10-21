const CART_STORAGE_KEY = "vannakmarket_cart";
// Initialize cart from sessionStorage or create empty
function initializeCart() {
  try {
    const stored = sessionStorage.getItem(CART_STORAGE_KEY);
    window.cart = stored ? JSON.parse(stored) : [];
    console.log("✓ Cart initialized:", window.cart);
  } catch (e) {
    console.error("✗ Error initializing cart:", e);
    window.cart = [];
  }
}

// Save cart to sessionStorage
function saveCart() {
  try {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(window.cart));
    console.log("✓ Cart saved to sessionStorage. Items:", window.cart.length);
  } catch (e) {
    console.warn("✗ Could not save cart to sessionStorage");
  }
}

// Update cart count in header - WORKS ON ALL PAGES
function updateCartCount() {
  if (!window.cart) {
    initializeCart();
  }

  const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log("Updating cart count to:", totalItems);

  // Find cart count element by ID
  const cartCountElement = document.getElementById("cartCount");

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    // Show badge only if there are items in cart
    if (totalItems > 0) {
      cartCountElement.style.display = "flex";
      cartCountElement.style.visibility = "visible";
    } else {
      cartCountElement.style.display = "none";
      cartCountElement.style.visibility = "hidden";
    }
    console.log("✓ Cart badge updated:", totalItems);
  } else {
    console.warn("✗ Cart count element #cartCount not found in DOM");
  }
}

// Extract price from text - handles multiple formats
function extractPrice(priceText) {
  if (!priceText) return { usd: 0, riel: 0 };

  // Remove all extra whitespace for easier parsing
  const cleaned = priceText.trim().replace(/\s+/g, " ");

  console.log("Extracting price from:", cleaned);

  // Style 1: $X.XX 10,000៛ (space separated, no slash)
  const style1Match = cleaned.match(/\$?([\d.]+)\s+([\d,]+)៛/);
  if (style1Match) {
    const result = {
      usd: parseFloat(style1Match[1]),
      riel: parseInt(style1Match[2].replace(/,/g, "")),
    };
    console.log("Extracted (Style 1):", result);
    return result;
  }

  // Style 2: $X.XX / X,XXX៛ (with slash)
  const style2Match = cleaned.match(/\$?([\d.]+)\s*\/\s*([\d,]+)៛?/);
  if (style2Match) {
    const result = {
      usd: parseFloat(style2Match[1]),
      riel: parseInt(style2Match[2].replace(/,/g, "")),
    };
    console.log("Extracted (Style 2):", result);
    return result;
  }

  // Try to extract just USD first
  const usdMatch = cleaned.match(/\$?([\d.]+)/);
  if (usdMatch) {
    const usd = parseFloat(usdMatch[1]);
    const result = {
      usd: usd,
      riel: Math.round(usd * 4000), // Convert USD to Riel
    };
    console.log("Extracted (USD only):", result);
    return result;
  }

  // Try to extract just Riel
  const rielMatch = cleaned.match(/([\d,]+)៛/);
  if (rielMatch) {
    const riel = parseInt(rielMatch[1].replace(/,/g, ""));
    const result = {
      usd: parseFloat((riel / 4000).toFixed(2)),
      riel: riel,
    };
    console.log("Extracted (Riel only):", result);
    return result;
  }

  console.warn("Could not extract price from:", priceText);
  return { usd: 0, riel: 0 };
}

// Format price for display - STYLE 1 (space separated, no slash)
function formatPrice(priceData) {
  const usd = typeof priceData === "object" ? priceData.usd : priceData;
  const riel =
    typeof priceData === "object"
      ? priceData.riel
      : Math.round(priceData * 4000);
  return `$${parseFloat(usd).toFixed(2)} ${riel.toLocaleString()}៛`;
}

// Add item to cart from ANY page
function addToCart(productData) {
  if (!window.cart) {
    initializeCart();
  }

  console.log("Adding to cart:", productData);

  // Create unique ID based on product name
  const uniqueId =
    productData.id ||
    `product-${productData.name.replace(/\s+/g, "-").toLowerCase()}`;

  // Check if item already exists
  const existingItemIndex = window.cart.findIndex(
    (item) => item.id === uniqueId
  );

  if (existingItemIndex > -1) {
    // Item exists, increase quantity
    window.cart[existingItemIndex].quantity += productData.quantity || 1;
    console.log(
      "✓ Item quantity increased to:",
      window.cart[existingItemIndex].quantity
    );
  } else {
    // New item, add to cart
    const newItem = {
      id: uniqueId,
      name: productData.name,
      price: productData.price, // Store price object with usd and riel
      image: productData.image || "",
      quantity: productData.quantity || 1,
    };
    window.cart.push(newItem);
    console.log("✓ New item added to cart:", newItem);
  }

  saveCart();
  updateCartCount();
  showCartNotification(productData.name);

  if (productData.element) {
    addCardFeedback(productData.element);
  }
}

// Show notification when item is added
function showCartNotification(productName) {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".cart-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${productName} added to cart!</span>
  `;

  // Add basic styles if not in CSS
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 2000;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// Visual feedback when adding to cart
function addCardFeedback(element) {
  if (element) {
    element.style.transform = "scale(0.95)";
    element.style.transition = "transform 0.2s ease";

    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 200);
  }
}

// Remove item from cart
function removeFromCart(productId) {
  window.cart = window.cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartCount();
  console.log("✓ Item removed from cart");
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
  const itemIndex = window.cart.findIndex((item) => item.id === productId);
  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      window.cart[itemIndex].quantity = newQuantity;
      saveCart();
      updateCartCount();
      console.log("✓ Quantity updated");
    }
  }
}

// Clear entire cart
function clearCart() {
  window.cart = [];
  saveCart();
  updateCartCount();
  console.log("✓ Cart cleared");
}

// Get cart items
function getCartItems() {
  return window.cart || [];
}

// Get cart total
function getCartTotal() {
  const items = window.cart || [];
  let totalUsd = 0;
  let totalRiel = 0;

  items.forEach((item) => {
    const price =
      typeof item.price === "object"
        ? item.price
        : { usd: item.price, riel: item.price * 4000 };
    totalUsd += parseFloat(price.usd) * item.quantity;
    totalRiel += parseInt(price.riel) * item.quantity;
  });

  return {
    usd: totalUsd,
    riel: totalRiel,
    formatted: formatPrice({ usd: totalUsd, riel: totalRiel }),
  };
}

// Initialize cart buttons on page load - WORKS ON ALL PAGES
function initializeCartButtons() {
  console.log("Initializing cart buttons...");

  // ===== HOMEPAGE: Featured Products =====
  document
    .querySelectorAll(
      ".product-card .hover-cart button:not([data-cart-initialized])"
    )
    .forEach((btn) => {
      btn.setAttribute("data-cart-initialized", "true");
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const card = btn.closest(".product-card");
        const productName =
          card.querySelector("h3")?.textContent?.trim() || "Product";

        // Get the price from .price-row structure
        const priceUsdEl = card.querySelector(".price .price-row .price-usd");
        const priceRielEl = card.querySelector(".price .price-row .price-riel");

        let priceData = { usd: 0, riel: 0 };

        if (priceUsdEl && priceRielEl) {
          const usdText = priceUsdEl.textContent.trim();
          const rielText = priceRielEl.textContent.trim();
          priceData = extractPrice(`${usdText} ${rielText}`);
        } else {
          // Fallback
          const priceText = card.querySelector(".price")?.textContent || "0";
          priceData = extractPrice(priceText);
        }

        const image = card.querySelector(".product-img img")?.src || "";

        addToCart({
          id: `featured-${productName.replace(/\s+/g, "-").toLowerCase()}`,
          name: productName,
          price: priceData,
          image: image,
          element: card,
          quantity: 1,
        });
      });
    });

  // ===== HOMEPAGE: Special Offers =====
  document
    .querySelectorAll(
      ".offer-card .overlay button:not([data-cart-initialized])"
    )
    .forEach((btn) => {
      btn.setAttribute("data-cart-initialized", "true");
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const card = btn.closest(".offer-card");
        const productName =
          card.querySelector(".offer-info h3")?.textContent?.trim() ||
          "Product";

        // Get the price from .price-row structure
        const priceUsdEl = card.querySelector(
          ".offer-info .price .price-row .price-usd"
        );
        const priceRielEl = card.querySelector(
          ".offer-info .price .price-row .price-riel"
        );

        let priceData = { usd: 0, riel: 0 };

        if (priceUsdEl && priceRielEl) {
          const usdText = priceUsdEl.textContent.trim();
          const rielText = priceRielEl.textContent.trim();
          priceData = extractPrice(`${usdText} ${rielText}`);
        } else {
          // Fallback
          const priceText =
            card.querySelector(".offer-info .price")?.textContent || "0";
          priceData = extractPrice(priceText);
        }

        const image = card.querySelector(".offer-img img")?.src || "";

        addToCart({
          id: `offer-${productName.replace(/\s+/g, "-").toLowerCase()}`,
          name: productName,
          price: priceData,
          image: image,
          element: card,
          quantity: 1,
        });
      });
    });

  // ===== PRODUCT PAGE: Main Grid =====
  // Look for any button with cart-related text/icon in product grid
  const productPageButtons = document.querySelectorAll(`
    .product-grid .product-card button:not([data-cart-initialized]),
    .product-grid .add-to-cart-btn:not([data-cart-initialized]),
    .product-grid button[class*="cart"]:not([data-cart-initialized]),
    .product-grid button[class*="add"]:not([data-cart-initialized])
  `);

  productPageButtons.forEach((btn) => {
    // Skip if already initialized
    if (btn.getAttribute("data-cart-initialized") === "true") return;

    btn.setAttribute("data-cart-initialized", "true");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest(".product-card");
      if (!card) return;

      // Try multiple selectors for product name
      const productName =
        card.querySelector(".product-title")?.textContent?.trim() ||
        card.querySelector(".product-name")?.textContent?.trim() ||
        card.querySelector("h3")?.textContent?.trim() ||
        card.querySelector("h4")?.textContent?.trim() ||
        "Product";

      console.log("Product name found:", productName);

      // Try multiple selectors for price
      let priceData = { usd: 0, riel: 0 };

      // Method 1: Look for separate USD and Riel elements
      const priceUsdEl = card.querySelector(
        ".price-usd, .current-price, .product-price .price-usd"
      );
      const priceRielEl = card.querySelector(
        ".price-riel, .product-price .price-riel"
      );

      if (priceUsdEl && priceRielEl) {
        const usdText = priceUsdEl.textContent.trim();
        const rielText = priceRielEl.textContent.trim();
        priceData = extractPrice(`${usdText} ${rielText}`);
        console.log("Price found (Method 1):", priceData);
      } else if (priceUsdEl) {
        // Method 2: Just USD element
        priceData = extractPrice(priceUsdEl.textContent);
        console.log("Price found (Method 2 - USD only):", priceData);
      } else {
        // Method 3: Look for any price container
        const priceContainer = card.querySelector(
          ".product-price, .price, .product-details .price"
        );
        if (priceContainer) {
          priceData = extractPrice(priceContainer.textContent);
          console.log("Price found (Method 3 - container):", priceData);
        }
      }

      // Try multiple selectors for image
      const image =
        card.querySelector(".product-image img")?.src ||
        card.querySelector(".product-img img")?.src ||
        card.querySelector("img")?.src ||
        "";

      console.log("Image found:", image);

      addToCart({
        id: `product-${productName.replace(/\s+/g, "-").toLowerCase()}`,
        name: productName,
        price: priceData,
        image: image,
        element: card,
        quantity: 1,
      });
    });
  });

  console.log(
    "✓ Cart buttons initialized. Total buttons:",
    document.querySelectorAll('[data-cart-initialized="true"]').length
  );
}

// Wait for header to be loaded, then initialize
function waitForHeader(callback, maxAttempts = 30) {
  const cartCountElement = document.getElementById("cartCount");

  if (cartCountElement) {
    console.log("✓ Header found! Initializing cart.");
    callback();
  } else if (maxAttempts > 0) {
    setTimeout(() => waitForHeader(callback, maxAttempts - 1), 100);
  } else {
    console.warn("✗ Header not found after waiting. Initializing anyway.");
    callback();
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired");
  initializeCart();
  waitForHeader(() => {
    updateCartCount();
    initializeCartButtons();
    initCartSidebar();
  });
});

// Re-initialize when header is loaded via jQuery
document.addEventListener("headerLoaded", function () {
  console.log("headerLoaded event received");
  updateCartCount();
  initializeCartButtons();
  initCartSidebar();
});

// Watch for page visibility changes to sync cart
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    console.log("Page became visible - syncing cart");
    initializeCart();
    updateCartCount();
  }
});

// Export for use globally
window.cartSystem = {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  updateCartCount,
  initializeCartButtons,
  initializeCart,
  formatPrice,
};

// Watch for dynamically added products (important for product page filtering/sorting)
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length) {
      const isProductGrid =
        mutation.target.id === "productGrid" ||
        mutation.target.classList?.contains("product-grid") ||
        mutation.target.classList?.contains("offers-wrapper");
      if (isProductGrid) {
        console.log("Product grid updated - re-initializing buttons");
        setTimeout(() => initializeCartButtons(), 100);
      }
    }
  });
});

const contentArea = document.querySelector("main") || document.body;
if (contentArea) {
  observer.observe(contentArea, { childList: true, subtree: true });
}

// ================= CART SIDEBAR FUNCTIONALITY =================

function initCartSidebar() {
  console.log("Initializing cart sidebar...");

  // Wait for elements to be available
  const checkElements = () => {
    const cartIcon =
      document.getElementById("cartIconBtn") ||
      document.querySelector(".cart-icon");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const continueShoppingBtn = document.getElementById("continueShoppingBtn");

    if (!cartIcon || !cartSidebar || !cartOverlay) {
      console.warn("Cart sidebar elements not found yet, retrying...");
      return false;
    }

    console.log("✓ All cart sidebar elements found");

    // Prevent duplicate event listeners
    if (cartIcon.dataset.cartInitialized === "true") {
      console.log("Cart sidebar already initialized");
      return true;
    }
    cartIcon.dataset.cartInitialized = "true";

    // Open cart sidebar when clicking cart icon
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Cart icon clicked - opening sidebar");
      openCartSidebar();
    });

    // Close cart sidebar
    function closeCartSidebar() {
      if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("open");
        console.log("Cart sidebar closed");
      }
    }

    function openCartSidebar() {
      if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("open");
        updateCartDisplay();
        console.log("Cart sidebar opened");
      }
    }

    // Close when clicking close button
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener("click", closeCartSidebar);
    }

    // Close when clicking overlay
    if (cartOverlay) {
      cartOverlay.addEventListener("click", closeCartSidebar);
    }

    // Close when clicking continue shopping
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", closeCartSidebar);
    }

    // Update cart display
    function updateCartDisplay() {
      if (!cartItemsContainer) return;

      const items = window.cart || [];

      console.log("Updating cart display. Items:", items);

      if (items.length === 0) {
        cartItemsContainer.innerHTML = `
          <div class="empty-cart-message">
            <i class="fa-solid fa-shopping-cart"></i>
            <p>Your cart is empty</p>
          </div>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;
      } else {
        if (checkoutBtn) checkoutBtn.disabled = false;
        cartItemsContainer.innerHTML = items
          .map((item) => {
            const price =
              typeof item.price === "object"
                ? item.price
                : { usd: item.price, riel: item.price * 4000 };
            const itemTotal = {
              usd: parseFloat(price.usd) * item.quantity,
              riel: parseInt(price.riel) * item.quantity,
            };

            return `
            <div class="cart-item">
              <div class="cart-item-image">
                <img src="${item.image || "https://via.placeholder.com/80"}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80'">
              </div>
              <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">${formatPrice(price)}</div>
                <div class="cart-item-quantity">
                  <button class="qty-btn" onclick="decreaseQty('${item.id}')">−</button>
                  <span class="qty-display">${item.quantity}</span>
                  <button class="qty-btn" onclick="increaseQty('${item.id}')">+</button>
                </div>
              </div>
              <button class="remove-btn" onclick="removeCartItem('${item.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          `;
          })
          .join("");
      }

      updateCartSummary();
    }

    // Update cart summary
    function updateCartSummary() {
      const total = getCartTotal();

      const subtotalEl = document.getElementById("subtotalPrice");
      const totalEl = document.getElementById("totalPrice");

      if (subtotalEl) subtotalEl.textContent = total.formatted;
      if (totalEl) totalEl.textContent = total.formatted;

      console.log("Cart summary updated:", total);
    }

    // Global functions for quantity and removal
    window.increaseQty = function (itemId) {
      const item = (window.cart || []).find((i) => i.id === itemId);
      if (item) {
        item.quantity += 1;
        saveCart();
        updateCartCount();
        updateCartDisplay();
      }
    };

    window.decreaseQty = function (itemId) {
      const item = (window.cart || []).find((i) => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
        updateCartCount();
        updateCartDisplay();
      }
    };

    window.removeCartItem = function (itemId) {
      window.cart = (window.cart || []).filter((item) => item.id !== itemId);
      saveCart();
      updateCartCount();
      updateCartDisplay();
    };

    // Checkout button
   // Checkout button
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    const items = window.cart || [];
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // ✅ FIX: Detect GitHub Pages base path
    const currentPath = window.location.pathname;
    
    // Extract base path (e.g., /Kao-Vannak-Steung-Hav-Market/)
    const pathParts = currentPath.split('/').filter(p => p);
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    let checkoutPath;
    
    if (isGitHubPages && pathParts.length >= 1) {
      // On GitHub Pages with repo name in path
      const repoName = pathParts[0];
      checkoutPath = `/${repoName}/pages/checkout.html`;
    } else if (currentPath.includes('/pages/')) {
      // Local or already in pages folder
      checkoutPath = 'checkout.html';
    } else {
      // Local root page
      checkoutPath = 'pages/checkout.html';
    }
    
    console.log('Redirecting to checkout:', checkoutPath);
    window.location.href = checkoutPath;
  });
}

    // Update display when cart is modified
    document.addEventListener("cartUpdated", updateCartDisplay);

    console.log("✓ Cart sidebar fully initialized");
    return true;
  };

  // Try to initialize immediately
  if (!checkElements()) {
    // If elements not found, retry every 200ms for up to 5 seconds
    let attempts = 0;
    const maxAttempts = 25;
    const retryInterval = setInterval(() => {
      attempts++;
      if (checkElements() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        if (attempts >= maxAttempts) {
          console.error(
            "Failed to initialize cart sidebar after maximum attempts"
          );
        }
      }
    }, 200);
  }
}
