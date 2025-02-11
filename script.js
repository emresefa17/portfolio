// AOS (Animate On Scroll) başlatma
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth scroll için tüm linkler
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll efekti
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Mobil Menü
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Menü linklerine tıklandığında menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Sayfa kaydırıldığında menüyü kapat
        window.addEventListener('scroll', () => {
            navLinks.classList.remove('active');
        });

        // Sayfa dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// Form gönderme işlemi
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Gönderiliyor...';
        
        fetch('process_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const formMessage = document.createElement('div');
            formMessage.className = `form-message ${data.success ? 'success' : 'error'}`;
            formMessage.textContent = data.message;
            
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            contactForm.appendChild(formMessage);
            
            if (data.success) {
                contactForm.reset();
            }
        })
        .catch(error => {
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            contactForm.appendChild(formMessage);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Gönder';
        });
    });
}

// Sayfa yüklendiğinde hero section animasyonu
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease';
        heroContent.style.opacity = '1';
    }, 300);
});
