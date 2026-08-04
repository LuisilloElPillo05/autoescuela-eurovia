document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    let index = 0;

    function moveSlider() {
        index++;
        if (index >= cards.length) {
            index = 0;
        }
        
        // Dynamic width calculation
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 32;
        const offset = index * -(cardWidth + gap);
        
        track.style.transform = `translateX(${offset}px)`;
    }

    // Slider auto-move removed as requested
    // setInterval(moveSlider, 4000);

    // Form Submission: WhatsApp Integration (Option 1)
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capture form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const interest = document.getElementById('interest').value;
        
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Abriendo WhatsApp...';
        btn.disabled = true;

        // Construct WhatsApp message
        const businessNumber = "34609705227"; // Number from your contact section
        const message = `Hola Autoescuela Europa, me llamo ${name}. Estoy interesado en el permiso: ${interest}. Mi número de contacto es ${phone}. ¿Podrían darme más información?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

        // Simulate a brief delay for UX and redirect
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            btn.textContent = '¡Solicitud enviada!';
            btn.style.backgroundColor = '#10b981';
            form.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        }, 800);
    });

    // Offers WhatsApp Integration
    document.querySelectorAll('.whatsapp-offer').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const packName = btn.getAttribute('data-pack');
            const businessNumber = "34609705227";
            const message = `Hola Autoescuela Europa, estoy interesado en la oferta: ${packName}. ¿Podrían darme más información sobre el presupuesto?`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // Simple Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .method-item, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Define reveal style
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- LOGICA MODAL DE VACACIONES ---
    const modal = document.getElementById('vacation-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (modal) {
        // Mostrar modal tras un segundo del arranque
        setTimeout(() => {
            modal.classList.add('active');
        }, 800);

        // Función para cerrar modal
        const closeModal = () => {
            modal.classList.remove('active');
        };

        // Cerrar al pulsar X
        closeModalBtn.addEventListener('click', closeModal);

        // Cerrar al hacer clic fuera de la tarjeta
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
