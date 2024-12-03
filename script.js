// some basic JavaScript for the website, ask me if u have questions

// kinda removed the FAQ so this is useless, just reference it for future school work i guess
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.5
});

// animation

document.querySelectorAll('.about-container').forEach(container => {
    observer.observe(container);
});

// scrolling for the carousel

document.querySelectorAll('img').forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
        openFullscreenImage(image);
    });
});

function openFullscreenImage(image) {
    const fullscreenOverlay = document.createElement('div');

    // change the css to get the full screen effect
    fullscreenOverlay.id = 'fullscreenOverlay';
    fullscreenOverlay.style.position = 'fixed';
    fullscreenOverlay.style.top = '0';
    fullscreenOverlay.style.left = '0';
    fullscreenOverlay.style.width = '100%';
    fullscreenOverlay.style.height = '100%';
    fullscreenOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    fullscreenOverlay.style.display = 'flex';
    fullscreenOverlay.style.alignItems = 'center';
    fullscreenOverlay.style.justifyContent = 'center';
    fullscreenOverlay.style.zIndex = '1000';
    fullscreenOverlay.style.cursor = 'zoom-out';
    fullscreenOverlay.style.opacity = '0';
    fullscreenOverlay.style.transition = 'opacity 0.3s ease-in-out';

    const fullscreenImage = document.createElement('img');
    fullscreenImage.src = image.src;
    fullscreenImage.style.maxWidth = '90%';
    fullscreenImage.style.maxHeight = '90%';
    fullscreenImage.style.transform = 'scale(0.9)';
    fullscreenImage.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    fullscreenImage.style.opacity = '0';

    fullscreenOverlay.appendChild(fullscreenImage);
    document.body.appendChild(fullscreenOverlay);

    requestAnimationFrame(() => {
        fullscreenOverlay.style.opacity = '1';
        fullscreenImage.style.opacity = '1';
        fullscreenImage.style.transform = 'scale(1)';
    });

    fullscreenOverlay.addEventListener('click', () => {
        fullscreenOverlay.style.opacity = '0';
        fullscreenImage.style.opacity = '0';
        fullscreenImage.style.transform = 'scale(0.9)';

        setTimeout(() => {
            document.body.removeChild(fullscreenOverlay);
        }, 300);
    });
}

function toggleCard(card) {
    // Remove expanded class from all other cards
    document.querySelectorAll('.feature-card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
        }
    });
    
    // Toggle expanded class on clicked card
    card.classList.toggle('expanded');
}

function handleScrollAnimation() {
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(card => {
        observer.observe(card);
        card.addEventListener('click', () => {
            toggleCard(card);
        });
    });
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        items[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // autoslides every 10 seconds
    let autoSlide = setInterval(nextSlide, 10000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 10000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    handleScrollAnimation();
});
