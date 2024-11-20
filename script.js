const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const backToTopButton = document.createElement('div');
backToTopButton.id = 'backToTop';
backToTopButton.innerText = '↑';
document.body.appendChild(backToTopButton);

if (localStorage.getItem('dark-mode') === 'enabled') {
    enableDarkMode();
} else {
    disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'enabled');
    darkModeToggle.innerHTML = '🌙';
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'disabled');
    darkModeToggle.innerHTML = '☀';
}

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

document.querySelectorAll('.about-container').forEach(container => {
    observer.observe(container);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('img').forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
        openFullscreenImage(image);
    });
});

function openFullscreenImage(image) {
    const fullscreenOverlay = document.createElement('div');
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
