// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader when page is loaded
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.style.opacity = '0';
            setTimeout(function() {
                loaderWrapper.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Activate nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    // Reset border after 3 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (!isValid) return;
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = form.closest('section').id === 'contact' 
                    ? 'Thank you for your message! We will get back to you soon.' 
                    : 'Thank you for subscribing!';
                successMessage.style.color = '#2ecc71';
                successMessage.style.padding = '10px 0';
                successMessage.style.fontWeight = 'bold';
                
                form.appendChild(successMessage);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 2000);
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    
                    switch (animationType) {
                        case 'fade-up':
                            element.style.transform = 'translateY(0)';
                            break;
                        case 'fade-down':
                            element.style.transform = 'translateY(0)';
                            break;
                        case 'fade-left':
                            element.style.transform = 'translateX(0)';
                            break;
                        case 'fade-right':
                            element.style.transform = 'translateX(0)';
                            break;
                        case 'zoom-in':
                            element.style.transform = 'scale(1)';
                            break;
                        case 'flip-left':
                            element.style.transform = 'rotateY(0)';
                            break;
                    }
                }, delay);
            }
        });
    };

    // Initialize AOS elements
    const initAOS = function() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            const animationType = element.getAttribute('data-aos');
            
            switch (animationType) {
                case 'fade-up':
                    element.style.transform = 'translateY(50px)';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(-50px)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(50px)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(-50px)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(0.9)';
                    break;
                case 'flip-left':
                    element.style.transform = 'rotateY(90deg)';
                    break;
            }
        });
        
        // Trigger animation for elements in view on load
        animateOnScroll();
    };

    // Initialize AOS
    initAOS();
    
    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Product hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image img');
            image.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image img');
            image.style.transform = 'scale(1)';
        });
    });

    // Create placeholder images for demo
    const createPlaceholderImages = function() {
        // Create a function to generate colored rectangles as SVG data URLs
        const generateColoredRect = function(width, height, color, text) {
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect width="${width}" height="${height}" fill="${color}"/>
                    <text x="50%" y="50%" font-family="sans-serif" font-size="24" text-anchor="middle" fill="white" dominant-baseline="middle">${text}</text>
                </svg>
            `;
            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        };

        // Hero laptop image
        const heroLaptopImg = document.querySelector('.hero-image img');
        if (heroLaptopImg && heroLaptopImg.src.includes('hero-laptop.png')) {
            heroLaptopImg.src = generateColoredRect(600, 400, '#3498db', '8Tech Premium Laptop');
        }
        
        // Product images
        const productImages = document.querySelectorAll('.product-image img');
        productImages.forEach((img, index) => {
            const models = ['Pro', 'Air', 'Studio'];
            const colors = ['#3498db', '#2ecc71', '#e74c3c'];
            if (img.src.includes('laptop-')) {
                img.src = generateColoredRect(400, 300, colors[index], '8Tech ' + models[index]);
            }
        });
        
        // Tech specs image
        const techSpecsImg = document.querySelector('.tech-image img');
        if (techSpecsImg && techSpecsImg.src.includes('tech-specs.png')) {
            techSpecsImg.src = generateColoredRect(500, 400, '#3498db', '8Tech Technology');
        }
        
        // User testimonial images
        const userImages = document.querySelectorAll('.testimonial-author img');
        userImages.forEach((img, index) => {
            if (img.src.includes('user')) {
                img.src = generateColoredRect(60, 60, '#3498db', (index + 1).toString());
            }
        });
    };
    
    // Call the function to create placeholder images
    createPlaceholderImages();

    // Image Carousel
    const carousel = document.getElementById('laptopCarousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Initialize carousel
        updateCarousel();
        
        // Set up event listeners
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateCarousel();
            });
        });
        
        // Auto slide every 5 seconds
        let autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
        
        // Pause auto slide when interacting with carousel
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        carousel.addEventListener('mouseleave', function() {
            autoSlide = setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        });
        
        // Update carousel display
        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
});
