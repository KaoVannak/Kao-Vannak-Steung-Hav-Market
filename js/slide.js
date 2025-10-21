document.addEventListener('DOMContentLoaded', function() {
      let currentIndex = 0;
      const items = document.querySelectorAll('.carousel-item');
      const indicators = document.querySelectorAll('.carousel-indicators span');
      const totalSlides = items.length;
      let autoSlideInterval;
      let isTransitioning = false;

      function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        items[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;

        setTimeout(() => {
          isTransitioning = false;
        }, 1200);
      }

      function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex);
      }

      function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
      }

      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
      }

      function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }

      document.querySelectorAll('.next').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          nextSlide();
          resetAutoSlide();
        });
      });

      document.querySelectorAll('.prev').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          prevSlide();
          resetAutoSlide();
        });
      });

      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
          showSlide(index);
          resetAutoSlide();
        });
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoSlide();
        }
      });

      startAutoSlide();

      const carousel = document.querySelector('.carousel');
      carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      carousel.addEventListener('mouseleave', startAutoSlide);

      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      });

      carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
          nextSlide();
          resetAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
          prevSlide();
          resetAutoSlide();
        }
      }
    });