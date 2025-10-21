

function initializeAccountButton() {
  console.log(' Initializing account button...');
  
  const checkAndInitialize = () => {
    // Look for the account icon button
    const accountBtn = document.getElementById('accountIconBtn');
    
    if (!accountBtn) {
      console.warn(' Account button not found yet...');
      return false;
    }
    
    // Check if already initialized to prevent duplicate listeners
    if (accountBtn.dataset.initialized === 'true') {
      console.log('✓ Account button already initialized');
      return true;
    }
    
    // Mark as initialized
    accountBtn.dataset.initialized = 'true';
    
    // Add click event listener
    accountBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('👤 Account button clicked!');
      
      // Determine correct path based on current page location
      const currentPath = window.location.pathname;
      let accountPath;
      
      // If we're already on a page in the /pages/ directory
      if (currentPath.includes('/pages/')) {
        accountPath = 'account.html';
      } 
      // If we're on the root/index page
      else {
        accountPath = 'pages/account.html';
      }
      
      console.log(' Redirecting to:', accountPath);
      window.location.href = accountPath;
    });
    
    console.log(' Account button initialized successfully!');
    return true;
  };
  
  // Try to initialize immediately
  if (!checkAndInitialize()) {
    // If not found, retry with a delay
    let attempts = 0;
    const maxAttempts = 20;
    
    const retryInterval = setInterval(() => {
      attempts++;
      console.log(` Retry attempt ${attempts}/${maxAttempts}`);
      
      if (checkAndInitialize() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        
        if (attempts >= maxAttempts) {
          console.error('❌ Failed to initialize account button after maximum attempts');
        }
      }
    }, 200);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log(' DOM Content Loaded - initializing account button');
  setTimeout(initializeAccountButton, 100);
});

// Re-initialize when header is dynamically loaded
document.addEventListener('headerLoaded', function() {
  console.log(' Header loaded event - re-initializing account button');
  setTimeout(initializeAccountButton, 100);
});

// Also try after a short delay (backup)
window.addEventListener('load', function() {
  console.log(' Window loaded - ensuring account button is initialized');
  setTimeout(initializeAccountButton, 200);
});

// Export for global use
window.initializeAccountButton = initializeAccountButton;