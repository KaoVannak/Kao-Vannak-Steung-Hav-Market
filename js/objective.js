$(document).ready(function () {
      let currentSlide = 0;
      const totalSlides = 3;
      const slideWidth = 100 / totalSlides;
      let autoSlideInterval;

      // Function to go to specific slide
      function goToSlide(index) {
        currentSlide = index;
        const translateX = -(currentSlide * slideWidth);
        $('.slider-container').css('transform', `translateX(${translateX}%)`);

        // Update indicators
        $('.indicator').removeClass('active');
        $(`.indicator[data-slide="${currentSlide}"]`).addClass('active');
      }

      // Next slide function
      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
      }

      // Previous slide function
      function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
      }

      // Auto slide function
      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      }

      function stopAutoSlide() {
        clearInterval(autoSlideInterval);
      }

      // Event handlers
      $('.next-btn').click(function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      });

      $('.prev-btn').click(function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      });

      $('.indicator').click(function () {
        stopAutoSlide();
        const slideIndex = parseInt($(this).data('slide'));
        goToSlide(slideIndex);
        startAutoSlide();
      });

      // Pause auto slide on hover
      $('.slider-wrapper').hover(
        function () { stopAutoSlide(); },
        function () { startAutoSlide(); }
      );

      // Touch/swipe support for mobile
      let startX = 0;
      let endX = 0;

      $('.slider-wrapper').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
      });

      $('.slider-wrapper').on('touchend', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          stopAutoSlide();
          if (diffX > 0) {
            nextSlide(); // Swipe left - next slide
          } else {
            prevSlide(); // Swipe right - previous slide
          }
          startAutoSlide();
        }
      });

      // Keyboard navigation
      $(document).keydown(function (e) {
        if (e.keyCode === 37) { // Left arrow
          stopAutoSlide();
          prevSlide();
          startAutoSlide();
        } else if (e.keyCode === 39) { // Right arrow
          stopAutoSlide();
          nextSlide();
          startAutoSlide();
        }
      });

      // Start auto slide
      startAutoSlide();

      // Mobile menu toggle (from your existing code)
      $('.burger').click(function () {
        $('.mobile-menu').toggle();
      });

      $('.search-icon').click(function () {
        $('.mobile-search').toggle();
      });
    });