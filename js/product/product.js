
// Exchange rate: 1 USD = 4100 Riel
const USD_TO_RIEL = 4100;

const products = [
  // Vegetables & Fruits (25 items) - $1 to $4 (4100 to 16400 Riel)
  { name: 'Bok Choy', category: 'vegetables', price: 4100, oldPrice: 8200, rating: 4, reviews: 124, badges: ['sale', 'best-seller'], img: '../img/product/Bok Choy.jpg' },
  { name: 'Lettuce', category: 'vegetables', price: 4100, oldPrice: 8200, rating: 4, reviews: 124, badges: ['sale', 'best-seller'], img: '../img/product/Lettuce.jpg' },
  { name: 'Cabbage', category: 'vegetables', price: 4100, oldPrice: 8200, rating: 4, reviews: 124, badges: ['sale', 'best-seller'], img: '../img/product/cabbage.png' },
  { name: 'Nappa Cabbage', category: 'vegetables', price: 4100, oldPrice: 8200, rating: 4, reviews: 124, badges: ['sale', 'best-seller'], img: '../img/product/Nappa Cabbage.jpg' },
  { name: 'Fresh Tomatoes', category: 'vegetables', price: 8200, oldPrice: null, rating: 5, reviews: 98, badges: ['new'], img: '../img/product/Fresh Tomatoes.jpg' },
  { name: 'Cucumbers', category: 'vegetables', price: 6150, oldPrice: null, rating: 4, reviews: 76, badges: [], img: '../img/product/Cucumbers.jpg' },
  { name: 'Green Peppers', category: 'vegetables', price: 8200, oldPrice: 12300, rating: 4, reviews: 54, badges: ['sale'], img: '../img/product/Green Peppers.jpg' },
  { name: 'Carrots', category: 'vegetables', price: 4100, oldPrice: null, rating: 5, reviews: 112, badges: ['best-seller'], img: '../img/product/Carrots.jpg' },
  { name: 'Broccoli', category: 'vegetables', price: 12300, oldPrice: null, rating: 4, reviews: 89, badges: [], img: '../img/product/Broccoli.png' },
  { name: 'Spinach', category: 'vegetables', price: 8200, oldPrice: null, rating: 5, reviews: 156, badges: ['best-seller'], img: '../img/product/Spinach.jpg' },
  { name: 'Fresh Corn', category: 'vegetables', price: 10250, oldPrice: 14350, rating: 4, reviews: 67, badges: ['sale'], img: '../img/product/Fresh Corn.jpg' },
  { name: 'Eggplant', category: 'vegetables', price: 8200, oldPrice: null, rating: 4, reviews: 43, badges: [], img: '../img/product/Eggplant.jpg' },
  { name: 'Sweet Potatoes', category: 'vegetables', price: 8200, oldPrice: null, rating: 5, reviews: 91, badges: [], img: '../img/product/Sweet Potatoes.jpg' },
  { name: 'Pumpkin', category: 'vegetables', price: 16400, oldPrice: null, rating: 4, reviews: 38, badges: [], img: '../img/product/Pumpkin.webp' },
  { name: 'Green Beans', category: 'vegetables', price: 10250, oldPrice: null, rating: 4, reviews: 52, badges: [], img: '../img/product/Green Beans.jpg' },
  { name: 'Fresh Bananas', category: 'vegetables', price: 12300, oldPrice: null, rating: 5, reviews: 167, badges: ['best-seller'], img: '../img/product/Fresh Bananas.jpg' },
  { name: 'Mango', category: 'vegetables', price: 16400, oldPrice: null, rating: 5, reviews: 203, badges: ['best-seller'], img: '../img/product/Mango.jpg' },
  { name: 'Papaya', category: 'vegetables', price: 14350, oldPrice: null, rating: 4, reviews: 87, badges: [], img: '../img/product/Papaya.jpg' },
  { name: 'Dragon Fruit', category: 'vegetables', price: 16400, oldPrice: null, rating: 5, reviews: 134, badges: [], img: '../img/product/Dragon Fruit.jpg' },
  { name: 'Longan', category: 'vegetables', price: 16400, oldPrice: null, rating: 4, reviews: 78, badges: [], img: '../img/product/Longan.webp' },
  { name: 'Rambutan', category: 'vegetables', price: 14350, oldPrice: null, rating: 5, reviews: 92, badges: ['new'], img: '../img/product/Rambutan.jpg' },
  { name: 'Lychee', category: 'vegetables', price: 16400, oldPrice: null, rating: 5, reviews: 145, badges: ['best-seller'], img: '../img/product/Lychee.webp' },
  { name: 'Watermelon', category: 'vegetables', price: 12300, oldPrice: 16400, rating: 5, reviews: 189, badges: ['sale'], img: '../img/product/Watermelon.jpg' },
  { name: 'Pineapple', category: 'vegetables', price: 16400, oldPrice: null, rating: 4, reviews: 112, badges: [], img: '../img/product/Pineapple.jpg' },
  { name: 'Coconut', category: 'vegetables', price: 10250, oldPrice: null, rating: 5, reviews: 156, badges: ['best-seller'], img: '../img/product/Coconut.webp' },

  // Meat & Seafood (15 items) - $5 to $10 (20500 to 41000 Riel)
  { name: 'Fresh Shrimp', category: 'meat', price: 32800, oldPrice: null, rating: 5, reviews: 234, badges: ['best-seller'], img: '../img/product/Fresh Shrimp.jpg' },
  { name: 'Fresh Fish', category: 'meat', price: 24600, oldPrice: 32800, rating: 4, reviews: 167, badges: ['sale'], img: '../img/product/Fresh Fish.webp' },
  { name: 'Crab Meat', category: 'meat', price: 41000, oldPrice: null, rating: 5, reviews: 198, badges: ['best-seller'], img: '../img/product/Crab Meat.jpg' },
  { name: 'Squid', category: 'meat', price: 28700, oldPrice: null, rating: 4, reviews: 145, badges: [], img: '../img/product/Squid.png' },
  { name: 'Chicken Breast', category: 'meat', price: 20500, oldPrice: 28700, rating: 5, reviews: 278, badges: ['sale', 'best-seller'], img: '../img/product/Chicken Breast.jpg' },
  { name: 'Fresh Pork Belly', category: 'meat', price: 32800, oldPrice: null, rating: 4, reviews: 189, badges: [], img: '../img/product/Fresh Pork Belly.jpg' },
  { name: 'Fresh Beef Slice', category: 'meat', price: 36900, oldPrice: 41000, rating: 5, reviews: 312, badges: ['sale', 'best-seller'], img: '../img/product/Fresh Beef Slice.jpg' },
  { name: 'Duck Meat', category: 'meat', price: 32800, oldPrice: null, rating: 4, reviews: 134, badges: [], img: '../img/product/Duck Meat.jpg' },
  { name: 'Fresh Salmon', category: 'meat', price: 41000, oldPrice: null, rating: 5, reviews: 256, badges: ['best-seller'], img: '../img/product/Fresh Salmon.jpg' },
  { name: 'Fresh Sea Mussels', category: 'meat', price: 24600, oldPrice: null, rating: 4, reviews: 98, badges: [], img: '../img/product/Fresh Sea Mussels.jpg' },
  { name: 'Fresh Sea Clams', category: 'meat', price: 20500, oldPrice: 28700, rating: 4, reviews: 87, badges: ['sale'], img: '../img/product/Fresh Sea Clams.jpg' },
  { name: 'Fresh Lobster', category: 'meat', price: 41000, oldPrice: null, rating: 5, reviews: 167, badges: ['best-seller'], img: '../img/product/Fresh Lobster.jpg' },
  { name: 'Fresh Tuna', category: 'meat', price: 36900, oldPrice: null, rating: 5, reviews: 201, badges: [], img: '../img/product/Fresh Tuna.jpg' },
  { name: 'Fresh Large Prawns', category: 'meat', price: 32800, oldPrice: 36900, rating: 4, reviews: 156, badges: ['sale'], img: '../img/product/Fresh Large Prawns.jpg' },
  { name: 'Ground Pork', category: 'meat', price: 24600, oldPrice: null, rating: 4, reviews: 223, badges: [], img: '../img/product/Ground Pork.jpg' },

  // Traditional Snacks (12 items) - $1 to $4 (4100 to 16400 Riel)
  { name: 'num ansom.jpg', category: 'snacks', price: 12300, oldPrice: null, rating: 4, reviews: 156, badges: [], img: '../img/product/num ansom.jpg.jpg' },
  { name: 'Banana Chips', category: 'snacks', price: 8200, oldPrice: 12300, rating: 5, reviews: 189, badges: ['sale', 'best-seller'], img: '../img/product/Banana Chips.jpg' },
  { name: 'Num Krok', category: 'snacks', price: 16400, oldPrice: null, rating: 5, reviews: 234, badges: ['best-seller'], img: '../img/product/Num Krok.jpg' },
  { name: 'Palm Sugar Cake', category: 'snacks', price: 14350, oldPrice: null, rating: 4, reviews: 178, badges: [], img: '../img/product/Palm Sugar Cake.png' },
  { name: 'Tamarind Candy', category: 'snacks', price: 8200, oldPrice: null, rating: 4, reviews: 145, badges: [], img: '../img/product/Tamarind Candy.jpg' },
  { name: 'Dried Mango', category: 'snacks', price: 12300, oldPrice: 16400, rating: 5, reviews: 267, badges: ['sale', 'best-seller'], img: '../img/product/Dried Mango.jpg' },
  { name: 'Coconut Cookies', category: 'snacks', price: 12300, oldPrice: null, rating: 4, reviews: 123, badges: [], img: '../img/product/Coconut Cookies.jpg' },
  { name: 'Sticky Rice with Banana', category: 'snacks', price: 14350, oldPrice: null, rating: 5, reviews: 198, badges: ['new'], img: '../img/product/Sticky Rice with Banana.jpg' },
  { name: 'Num Chak Kachan', category: 'snacks', price: 10250, oldPrice: null, rating: 4, reviews: 167, badges: [], img: '../img/product/Num Chak Kachan.avif' },
  { name: 'Peanut Brittle', category: 'snacks', price: 8200, oldPrice: 12300, rating: 4, reviews: 134, badges: ['sale'], img: '../img/product/Peanut Brittle.jpg' },
  { name: 'Jackfruit Chips', category: 'snacks', price: 16400, oldPrice: null, rating: 5, reviews: 201, badges: ['best-seller'], img: '../img/product/Jackfruit Chips.jpeg' },
  { name: 'Sweet Potato Chips', category: 'snacks', price: 14350, oldPrice: null, rating: 4, reviews: 156, badges: [], img: '../img/product/Sweet Potato Chips.png' },

  // Kitchen & Tableware (10 items) - $10 to $20 (41000 to 82000 Riel)
  { name: 'Bamboo Steamer', category: 'kitchen', price: 61500, oldPrice: null, rating: 5, reviews: 98, badges: ['best-seller'], img: '../img/product/Bamboo Steamer.jpg' },
  { name: 'Clay Pot Set', category: 'kitchen', price: 61500, oldPrice: 82000, rating: 5, reviews: 134, badges: ['sale'], img: '../img/product/Clay Pot Set.jpeg' },
  { name: 'Palm Wood Spoons', category: 'kitchen', price: 41000, oldPrice: null, rating: 4, reviews: 167, badges: [], img: '../img/product/Palm Wood Spoons.jpg' },
  { name: 'Stone Mortar & Pestle', category: 'kitchen', price: 53300, oldPrice: null, rating: 5, reviews: 189, badges: ['best-seller'], img: '../img/product/Stone Mortar & Pestle.png' },
  { name: 'Ceramic Bowls', category: 'kitchen', price: 61500, oldPrice: 82000, rating: 4, reviews: 145, badges: ['sale'], img: '../img/product/Ceramic Bowls.jpg' },
  { name: 'Woven Baskets', category: 'kitchen', price: 45100, oldPrice: null, rating: 4, reviews: 123, badges: [], img: '../img/product/Woven Baskets.jpg' },
  { name: 'Chopstick Set', category: 'kitchen', price: 41000, oldPrice: null, rating: 5, reviews: 234, badges: ['new'], img: '../img/product/Chopstick Set.png' },
  { name: 'Ceramic Tea Set', category: 'kitchen', price: 82000, oldPrice: null, rating: 5, reviews: 178, badges: ['best-seller'], img: '../img/product/Ceramic Tea Set.png' },
  { name: 'Cutting Board', category: 'kitchen', price: 49200, oldPrice: 61500, rating: 4, reviews: 156, badges: ['sale'], img: '../img/product/Cutting Board.jpg' },
  { name: 'Khmer Knife Set', category: 'kitchen', price: 82000, oldPrice: null, rating: 5, reviews: 267, badges: ['best-seller'], img: '../img/product/Khmer Knife Set.jpeg' },

  // Personal Care (8 items) - $5 to $20 (20500 to 82000 Riel)
  { name: 'Herbal Soap', category: 'personal', price: 20500, oldPrice: 28700, rating: 4, reviews: 198, badges: ['sale'], img: '../img/product/Herbal Soap.jpg' },
  { name: 'Coconut Oil', category: 'personal', price: 32800, oldPrice: null, rating: 5, reviews: 267, badges: ['best-seller'], img: '../img/product/Coconut Oil.jpg' },
  { name: 'Rice Milk Lotion', category: 'personal', price: 49200, oldPrice: null, rating: 5, reviews: 234, badges: ['best-seller'], img: '../img/product/Rice Milk Lotion.jpg' },
  { name: 'Thanaka Powder', category: 'personal', price: 28700, oldPrice: null, rating: 4, reviews: 178, badges: [], img: '../img/product/Thanaka Powder.jpg' },
  { name: 'Lemongrass Shampoo', category: 'personal', price: 36900, oldPrice: 49200, rating: 5, reviews: 289, badges: ['sale', 'best-seller'], img: '../img/product/Lemongrass Shampoo.jpg' },
  { name: 'Natural Face Mask', category: 'personal', price: 32800, oldPrice: null, rating: 4, reviews: 156, badges: [], img: '../img/product/Natural Face Mask.png' },
  { name: 'Herbal Toothpaste', category: 'personal', price: 24600, oldPrice: null, rating: 4, reviews: 201, badges: ['new'], img: '../img/product/Herbal Toothpaste.jpg' },
  { name: 'Tamarind Body Scrub', category: 'personal', price: 32800, oldPrice: 41000, rating: 5, reviews: 223, badges: ['sale'], img: '../img/product/Tamarind Body Scrub.jpg' }
];

// Convert Riel to USD
function rielToUsd(riel) {
  return parseFloat((riel / USD_TO_RIEL).toFixed(2));
}

// Format price in both USD and Riel - CLEAN UI
function formatPriceDual(riel) {
  const usd = rielToUsd(riel);
  return `<div class="price-display"><span class="price-usd">$${usd.toFixed(2)}</span><span class="price-separator">•</span><span class="price-riel">${riel.toLocaleString()}៛</span></div>`;
}

// Generate product cards
function generateProductCards() {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  productGrid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.dataset.rating = product.rating;
    card.dataset.name = product.name;

    const badges = product.badges.map(b => {
      const cls = b === 'sale' ? 'sale' : b === 'best-seller' ? 'best-seller' : 'new';
      const text = b === 'best-seller' ? 'Best Seller' : b === 'sale' ? 'Sale' : 'New';
      return `<span class="badge ${cls}">${text}</span>`;
    }).join('');

    const stars = Array(5).fill(0).map((_, i) =>
      i < product.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'
    ).join('');

    const oldPriceHtml = product.oldPrice ? `<div class="old-price-dual">${formatPriceDual(product.oldPrice)}</div>` : '';

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
        <div class="product-badges">${badges}</div>
        <button class="wishlist-btn" onclick="event.stopPropagation()">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-info-left">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">Fresh organic products from local farms</p>
          <div class="product-rating">
            <div class="stars">${stars}</div>
            <span class="rating-count">(${product.reviews})</span>
          </div>
        </div>
        <div class="product-info-right">
          <div class="product-price">
            <div class="current-price-dual">${formatPriceDual(product.price)}</div>
            ${oldPriceHtml}
          </div>
          <button class="add-to-cart-btn" data-product-index="${index}">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  attachWishlistListeners();
  updateProductCount();
}

// Wishlist toggle
function attachWishlistListeners() {
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-solid');
      icon.classList.toggle('fa-regular');
      icon.style.color = icon.classList.contains('fa-solid') ? '#e74c3c' : '#666';
    });
  });
}

// Update visible product count
function updateProductCount() {
  const visible = document.querySelectorAll('.product-card:not(.hidden)').length;
  const productCountEl = document.getElementById('productCount');
  if (productCountEl) {
    productCountEl.textContent = visible;
  }
}

// Filter & Search
function filterProducts(category = 'all', searchTerm = '') {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardName = card.dataset.name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    const matchesCategory = category === 'all' || cardCategory === category;
    const matchesSearch = searchTerm === '' || cardName.includes(searchLower);
    
    if (matchesCategory && matchesSearch) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
  
  updateProductCount();
}

// Sort Products
function sortProducts(sortValue) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  const cards = Array.from(productGrid.querySelectorAll('.product-card'));
  
  cards.sort((a, b) => {
    if (sortValue === 'price-low') {
      return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
    }
    if (sortValue === 'price-high') {
      return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
    }
    if (sortValue === 'rating') {
      return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    }
    return 0;
  });
  
  cards.forEach(card => productGrid.appendChild(card));
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  generateProductCards();

  // Category Filter
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      
      const selectedCategory = this.dataset.category;
      const searchInput = document.getElementById('productSearch');
      const searchTerm = searchInput ? searchInput.value : '';
      
      filterProducts(selectedCategory, searchTerm);
    });
  });

  // Search
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const activeCategory = document.querySelector('.category-pill.active');
      const category = activeCategory ? activeCategory.dataset.category : 'all';
      filterProducts(category, this.value);
    });
  }

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      sortProducts(this.value);
    });
  }

  // View toggle
  const gridViewBtn = document.getElementById('gridView');
  const listViewBtn = document.getElementById('listView');
  const productGrid = document.getElementById('productGrid');
  
  if (gridViewBtn && listViewBtn && productGrid) {
    gridViewBtn.addEventListener('click', () => {
      productGrid.classList.remove('list-view');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', () => {
      productGrid.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
    });
  }
});



// After adding products to the grid
AOS.refresh();