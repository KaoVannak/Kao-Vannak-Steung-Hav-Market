 $(document).ready(function () {
      const $wrapper = $(".offers-wrapper");
      const $cards = $(".offer-card");
      const $carousel = $(".offers-carousel");
      const $prevBtn = $(".prev");
      const $nextBtn = $(".next");
      const $dotsContainer = $(".carousel-dots");
      
      let currentIndex = 0;
      const intervalTime = 4000;
      let autoScrollInterval;
      let isAnimating = false;

      // Touch/Drag variables
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let startTranslate = 0;

      // Calculate visible cards
      function getVisibleCards() {
        const containerWidth = $carousel.width();
        const cardWidth = $cards.outerWidth(true);
        return Math.floor(containerWidth / cardWidth);
      }

      // Calculate max index
      function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, $cards.length - visibleCards);
      }

      // Create dots
      function createDots() {
        $dotsContainer.empty();
        const maxIndex = getMaxIndex();
        for (let i = 0; i <= maxIndex; i++) {
          const $dot = $('<div class="dot"></div>');
          if (i === 0) $dot.addClass('active');
          $dot.on('click', function() {
            stopAutoScroll();
            currentIndex = i;
            updateCarousel();
            startAutoScroll();
          });
          $dotsContainer.append($dot);
        }
      }

      // Update carousel position
      function updateCarousel(animate = true) {
        const cardWidth = $cards.outerWidth(true);
        const translateX = -currentIndex * cardWidth;
        
        if (!animate) {
          $wrapper.addClass('no-transition');
        }
        
        $wrapper.css("transform", `translateX(${translateX}px)`);

        if (!animate) {
          setTimeout(() => {
            $wrapper.removeClass('no-transition');
          }, 50);
        }

        // Update dots
        $('.dot').removeClass('active');
        $('.dot').eq(currentIndex).addClass('active');
      }

      // Next slide
      function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
        
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }

      // Previous slide
      function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
        
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }

      // Auto scroll
      function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSlide, intervalTime);
      }

      function stopAutoScroll() {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
        }
      }

      // Navigation arrows
      $prevBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        stopAutoScroll();
        prevSlide();
        startAutoScroll();
      });

      $nextBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        stopAutoScroll();
        nextSlide();
        startAutoScroll();
      });

      // Add to Cart functionality - Integrated with your cart system
      // Use event delegation to prevent duplicate bindings
      $carousel.on('click', '.offer-card .overlay button', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Prevent other handlers
        
        // Prevent rapid clicking
        const $btn = $(this);
        if ($btn.data('processing')) {
          console.log('Already processing, please wait...');
          return;
        }
        
        $btn.data('processing', true);
        
        const $card = $(this).closest('.offer-card');
        const productName = $card.find('.offer-info h3').text().trim();
        const priceText = $card.find('.offer-info .current').text();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const image = $card.find('.offer-img img').attr('src');
        
        console.log('Adding to cart:', productName);
        
        // Check if cart system exists (from your cart.js file)
        if (typeof window.addToCart === 'function') {
          window.addToCart({
            id: `offer-${productName}`,
            name: productName,
            price: price,
            image: image,
            element: $card[0],
            quantity: 1
          });
        } else if (typeof window.cartSystem !== 'undefined' && typeof window.cartSystem.addToCart === 'function') {
          window.cartSystem.addToCart({
            id: `offer-${productName}`,
            name: productName,
            price: price,
            image: image,
            element: $card[0],
            quantity: 1
          });
        } else {
          // Fallback if cart system not loaded yet
          console.log('Cart system not loaded. Product:', productName, price);
          alert(`${productName} would be added to cart (Cart system not loaded yet)`);
        }
        
        // Reset processing flag after a short delay
        setTimeout(() => {
          $btn.data('processing', false);
        }, 500);
      });

      // Touch/Swipe support
      function handleDragStart(e) {
        isDragging = true;
        const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        startX = pageX;
        currentX = pageX;
        
        const cardWidth = $cards.outerWidth(true);
        startTranslate = -currentIndex * cardWidth;
        
        $carousel.addClass('grabbing');
        $wrapper.addClass('no-transition');
        stopAutoScroll();
      }

      function handleDragMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        currentX = pageX;
        
        const diff = currentX - startX;
        const newTranslate = startTranslate + diff;
        
        $wrapper.css('transform', `translateX(${newTranslate}px)`);
      }

      function handleDragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        $carousel.removeClass('grabbing');
        $wrapper.removeClass('no-transition');
        
        const diff = currentX - startX;
        const cardWidth = $cards.outerWidth(true);
        const threshold = cardWidth * 0.25;
        
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            prevSlide();
          } else {
            nextSlide();
          }
        } else {
          updateCarousel();
        }
        
        startAutoScroll();
      }

      // Touch events
      $carousel.on('touchstart', function(e) {
        handleDragStart(e.originalEvent);
      });

      $carousel.on('touchmove', function(e) {
        handleDragMove(e.originalEvent);
      });

      $carousel.on('touchend touchcancel', function(e) {
        handleDragEnd(e.originalEvent);
      });

      // Mouse events (desktop drag)
      $carousel.on('mousedown', function(e) {
        if ($(window).width() > 768) {
          handleDragStart(e);
        }
      });

      $(document).on('mousemove', function(e) {
        if (isDragging) {
          handleDragMove(e);
        }
      });

      $(document).on('mouseup', function(e) {
        if (isDragging) {
          handleDragEnd(e);
        }
      });

      // Prevent click when dragging
      $carousel.on('click', function(e) {
        if (Math.abs(currentX - startX) > 5) {
          e.preventDefault();
          e.stopPropagation();
        }
      });

      // Pause on hover
      $carousel.hover(
        function () {
          stopAutoScroll();
        },
        function () {
          if (!isDragging) {
            startAutoScroll();
          }
        }
      );

      // Handle resize
      let resizeTimer;
      $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          const maxIndex = getMaxIndex();
          if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
          }
          createDots();
          updateCarousel(false);
        }, 250);
      });

      // Keyboard navigation
      $(document).on('keydown', function (e) {
        if (e.keyCode === 37) {
          e.preventDefault();
          stopAutoScroll();
          prevSlide();
          startAutoScroll();
        } else if (e.keyCode === 39) {
          e.preventDefault();
          stopAutoScroll();
          nextSlide();
          startAutoScroll();
        }
      });

      // Initialize
      createDots();
      updateCarousel(false);
      startAutoScroll();
      
      console.log('✓ Special Offers Carousel Initialized');
      console.log(`  Total Products: ${$cards.length}`);
      console.log(`  Visible Cards: ${getVisibleCards()}`);
    });