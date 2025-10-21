
    // Initialize checkout page
    document.addEventListener('DOMContentLoaded', function () {
      initializeCart();
      loadCheckoutItems();
      initializePaymentMethods();
      initializeCheckoutButton();
    });

    // Helper function to format price with HTML styling
    function formatPriceHTML(priceData) {
      const usd = typeof priceData === 'object' ? priceData.usd : priceData;
      const riel = typeof priceData === 'object' ? priceData.riel : Math.round(priceData * 4000);
      return `<span style="color: #009846; font-weight: 700; font-size: 1.1rem;">$${parseFloat(usd).toFixed(2)}</span> <span style="color: #666; font-weight: 600;">${riel.toLocaleString()}៛</span>`;
    }

    // Helper function to format price as plain text
    function formatPricePlain(priceData) {
      const usd = typeof priceData === 'object' ? priceData.usd : priceData;
      const riel = typeof priceData === 'object' ? priceData.riel : Math.round(priceData * 4000);
      return `$${parseFloat(usd).toFixed(2)} ${riel.toLocaleString()}៛`;
    }

    // Load cart items into checkout
    function loadCheckoutItems() {
      const items = window.cart || [];
      const orderItemsContainer = document.getElementById('orderItems');
      const emptyCheckout = document.getElementById('emptyCheckout');
      const checkoutContent = document.getElementById('checkoutContent');

      if (items.length === 0) {
        emptyCheckout.style.display = 'block';
        checkoutContent.style.display = 'none';
        return;
      }

      emptyCheckout.style.display = 'none';
      checkoutContent.style.display = 'grid';

      orderItemsContainer.innerHTML = items.map(item => {
        const price = typeof item.price === 'object' ? item.price : { usd: item.price, riel: item.price * 4000 };
        const itemTotal = {
          usd: parseFloat(price.usd) * item.quantity,
          riel: parseInt(price.riel) * item.quantity
        };

        return `
      <div class="summary-item">
        <div class="item-image">
          <img src="${item.image || '/img/QR/QR Code.jpg'}" alt="${item.name}">
        </div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-quantity">Quantity: ${item.quantity}</div>
          
        </div>
        <div class="item-price">${formatPriceHTML(itemTotal)}</div>
      </div>
    `;
      }).join('');

      updateCheckoutSummary();
    }

    // Update checkout summary totals
    function updateCheckoutSummary() {
      const items = window.cart || [];
      let totalUsd = 0;
      let totalRiel = 0;

      items.forEach(item => {
        const price = typeof item.price === 'object' ? item.price : { usd: item.price, riel: item.price * 4000 };
        totalUsd += parseFloat(price.usd) * item.quantity;
        totalRiel += parseInt(price.riel) * item.quantity;
      });

      const formattedTotal = formatPriceHTML({ usd: totalUsd, riel: totalRiel });

      document.getElementById('checkoutSubtotal').innerHTML = formattedTotal;
      document.getElementById('checkoutTotal').innerHTML = formattedTotal;
    }

    // Payment method selection
    function initializePaymentMethods() {
      const paymentOptions = document.querySelectorAll('.payment-option');
      const qrSection = document.getElementById('qrSection');

      paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
          paymentOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');

          const radio = this.querySelector('input[type="radio"]');
          radio.checked = true;

          if (this.dataset.payment === 'bank') {
            qrSection.classList.add('show');
          } else {
            qrSection.classList.remove('show');
          }
        });
      });
    }

    // Checkout button functionality
    function initializeCheckoutButton() {
      const confirmBtn = document.getElementById('confirmCheckoutBtn');
      const form = document.getElementById('checkoutForm');

      confirmBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const orderNumber = '#ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        // Calculate total in both currencies
        const items = window.cart || [];
        let totalUsd = 0;
        let totalRiel = 0;

        items.forEach(item => {
          const price = typeof item.price === 'object' ? item.price : { usd: item.price, riel: item.price * 4000 };
          totalUsd += parseFloat(price.usd) * item.quantity;
          totalRiel += parseInt(price.riel) * item.quantity;
        });

        const totalFormatted = formatPricePlain({ usd: totalUsd, riel: totalRiel });

        // Populate success modal
        document.getElementById('orderNumber').textContent = orderNumber;
        document.getElementById('orderCustomer').textContent = firstName + ' ' + lastName;
        document.getElementById('orderAddress').textContent = address;
        document.getElementById('orderPayment').textContent = paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer';
        document.getElementById('orderAmount').textContent = totalFormatted;

        // Show success modal
        const modal = document.getElementById('successModal');
        modal.classList.add('show');

        // Clear cart
        clearCart();
        updateCartCount();
      });
    }

    // Close modal when clicking outside
    document.getElementById('successModal')?.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('show');
      }
    });
