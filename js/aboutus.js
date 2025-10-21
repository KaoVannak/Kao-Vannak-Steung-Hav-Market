// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ aboutus.js loaded');

  // Enhanced profile image interaction
  const profileImage = document.querySelector('.personal-image');
  const imageMain = document.querySelector('.image-main');
  
  if (profileImage && imageMain) {
    profileImage.addEventListener('mouseenter', () => {
      imageMain.style.animationPlayState = 'paused';
    });
    
    profileImage.addEventListener('mouseleave', () => {
      imageMain.style.animationPlayState = 'running';
    });

    // Add parallax effect to profile image on mouse move
    profileImage.addEventListener('mousemove', (e) => {
      const rect = profileImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      imageMain.style.transform = `scale(1.05) rotateY(${percentX * 5}deg) rotateX(${-percentY * 5}deg)`;
    });
    
    profileImage.addEventListener('mouseleave', () => {
      imageMain.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
    });
  }

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Testimonial slider
  const dots = document.querySelectorAll('.dot');
  const testimonialCard = document.querySelector('.testimonial-card');
  
  if (dots.length > 0 && testimonialCard) {
    const testimonials = [
      {
        content: "Vannak Market has transformed how I access authentic Cambodian ingredients. The quality is exceptional, and the delivery is always prompt. Highly recommended!",
        author: "Sokha Lim",
        location: "Phnom Penh, Cambodia",
        image: "../img/icon/1.png"
      },
      {
        content: "As someone living abroad, I was thrilled to find Vannak Market. Their traditional snacks taste exactly like what I had back home in Cambodia!",
        author: "Rithy Sok",
        location: "Siem Reap, Cambodia",
        image: "../img/icon/2.jpg"
      },
      {
        content: "The customer service is outstanding! When I had an issue with my order, they resolved it immediately. I'll definitely be a returning customer.",
        author: "Maly Keo",
        location: "Battambang, Cambodia",
        image: "../img/icon/3.jpg"
      }
    ];
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      const testimonialContent = testimonialCard.querySelector('.testimonial-content');
      const authorName = testimonialCard.querySelector('.author-info h4');
      const authorLocation = testimonialCard.querySelector('.author-info p');
      const authorAvatar = testimonialCard.querySelector('.author-avatar');
      
      if (testimonialContent) testimonialContent.textContent = `"${testimonials[index].content}"`;
      if (authorName) authorName.textContent = testimonials[index].author;
      if (authorLocation) authorLocation.textContent = testimonials[index].location;
      if (authorAvatar) authorAvatar.src = testimonials[index].image;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});