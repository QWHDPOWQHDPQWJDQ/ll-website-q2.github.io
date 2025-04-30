document.addEventListener('DOMContentLoaded', function() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.style.opacity = '0';
            setTimeout(function() {
                loaderWrapper.style.display = 'none';
            }, 500);
        }, 1000);
    });
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
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
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
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

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (!isValid) return;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                this.reset();
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = form.closest('section').id === 'contact' 
                    ? 'Thank you for your message! We will get back to you soon.' 
                    : 'Thank you for subscribing!';
                successMessage.style.color = '#2ecc71';
                successMessage.style.padding = '10px 0';
                successMessage.style.fontWeight = 'bold';
                
                form.appendChild(successMessage);
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 2000);
        });
    });

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
        
        animateOnScroll();
    };

    initAOS();
    
    window.addEventListener('scroll', animateOnScroll);
    
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

    const createPlaceholderImages = function() {
        const generateColoredRect = function(width, height, color, text) {
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect width="${width}" height="${height}" fill="${color}"/>
                    <text x="50%" y="50%" font-family="sans-serif" font-size="24" text-anchor="middle" fill="white" dominant-baseline="middle">${text}</text>
                </svg>
            `;
            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        };

        const heroLaptopImg = document.querySelector('.hero-image img');
        if (heroLaptopImg && heroLaptopImg.src.includes('hero-laptop.png')) {
            heroLaptopImg.src = generateColoredRect(600, 400, '#3498db', '8Tech Premium Laptop');
        }
        
        const productImages = document.querySelectorAll('.product-image img');
        productImages.forEach((img, index) => {
            const models = ['Pro', 'Air', 'Studio'];
            const colors = ['#3498db', '#2ecc71', '#e74c3c'];
            if (img.src.includes('laptop-')) {
                img.src = generateColoredRect(400, 300, colors[index], '8Tech ' + models[index]);
            }
        });
        
        const techSpecsImg = document.querySelector('.tech-image img');
        if (techSpecsImg && techSpecsImg.src.includes('tech-specs.png')) {
            techSpecsImg.src = generateColoredRect(500, 400, '#3498db', '8Tech Technology');
        }
        
        const userImages = document.querySelectorAll('.testimonial-author img');
        userImages.forEach((img, index) => {
            if (img.src.includes('user')) {
                img.src = generateColoredRect(60, 60, '#3498db', (index + 1).toString());
            }
        });
    };
    
    createPlaceholderImages();

    const carousel = document.getElementById('laptopCarousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        updateCarousel();
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateCarousel();
            });
        });
        
        let autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
        
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        carousel.addEventListener('mouseleave', function() {
            autoSlide = setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        });
        
        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    const lightbox = document.getElementById('analyticsLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const analyticsCards = document.querySelectorAll('.analytics-card');
    
    let currentImageIndex = 0;
    const totalImages = analyticsCards.length;
    analyticsCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const imageCaption = this.getAttribute('data-caption');
            
            lightboxImage.src = imageSrc;
            lightboxCaption.textContent = imageCaption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            
            currentImageIndex = index;
        });
    });
    

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightboxImage) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    });
    
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
    });
    
    function updateLightboxImage() {
        const card = analyticsCards[currentImageIndex];
        const imageSrc = card.getAttribute('data-image');
        const imageCaption = card.getAttribute('data-caption');
        
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = imageCaption;
    }
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateLightboxImage();
        }
    });
});
