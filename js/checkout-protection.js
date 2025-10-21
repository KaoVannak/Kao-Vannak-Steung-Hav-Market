// ================= CHECKOUT PAGE PROTECTION =================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Checkout page loading...');
  
  setTimeout(() => {
    if (!window.userAuth) {
      console.error('User authentication system not loaded!');
      alert('System error. Redirecting to home page...');
      window.location.href = '../index.html';
      return;
    }
    
    const checkResult = window.userAuth.canCheckout();
    
    if (!checkResult.allowed) {
      alert(checkResult.message);
      
      if (checkResult.action === 'redirect_to_account') {
        window.location.href = './account.html';
      } else if (checkResult.action === 'redirect_to_products') {
        window.location.href = './product.html';
      }
      return;
    }
    
    console.log('✓ Checkout allowed');
    initializeCheckoutPageCustom();
  }, 500);
});

function initializeCheckoutPageCustom() {
  const currentUser = window.userAuth.getCurrentUser();
  
  if (currentUser) {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    
    if (firstName && currentUser.name) {
      const names = currentUser.name.split(' ');
      firstName.value = names[0] || '';
      if (lastName && names.length > 1) {
        lastName.value = names.slice(1).join(' ');
      }
    }
    if (email) email.value = currentUser.email || '';
    if (phone) phone.value = currentUser.phone || '';
  }
}

// Override checkout button click
setTimeout(() => {
  const confirmBtn = document.getElementById('confirmCheckoutBtn');
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const form = document.getElementById('checkoutForm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
      
      const shippingInfo = {
        fullName: firstName + ' ' + lastName,
        phone: phone,
        address: address,
        paymentMethod: paymentMethod
      };
      
      const result = window.userAuth.createOrder(shippingInfo);
      
      if (result.success) {
        document.getElementById('orderNumber').textContent = result.order.id;
        document.getElementById('orderCustomer').textContent = shippingInfo.fullName;
        document.getElementById('orderAddress').textContent = address;
        document.getElementById('orderPayment').textContent = paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer';
        document.getElementById('orderAmount').textContent = result.order.total.toLocaleString() + '៛';
        
        document.getElementById('successModal').classList.add('show');
      } else {
        alert('Error placing order: ' + result.message);
      }
    });
  }
}, 1000);

console.log('✓ Checkout protection loaded');