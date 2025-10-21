let currentIndex = 0;
        let autoSlideInterval;

        // DOM elements
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');

        // Show specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.classList.remove('active');
            });

            // Show selected testimonial
            testimonialCards[index].classList.add('active');

            // Update navigation dots
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;
        }

        // Next testimonial
        function nextTestimonial() {
            const nextIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        }

        // Previous testimonial
        function prevTestimonial() {
            const prevIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prevIndex);
        }

        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextTestimonial, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Event listeners
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoSlide();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevTestimonial();
                resetAutoSlide();
            }
            if (e.key === 'ArrowRight') {
                nextTestimonial();
                resetAutoSlide();
            }
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = Math.abs(startY - endY);
            
            // Only swipe if horizontal movement is greater than vertical
            if (Math.abs(deltaX) > 50 && deltaY < 100) {
                if (deltaX > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                resetAutoSlide();
            }
        });

        // Pause auto-slide on hover
        const customerSection = document.querySelector('.customer-section');
        customerSection.addEventListener('mouseenter', stopAutoSlide);
        customerSection.addEventListener('mouseleave', startAutoSlide);

        // Initialize auto-slide
        startAutoSlide();