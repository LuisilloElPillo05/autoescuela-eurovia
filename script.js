document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Fade In)
    const animateOnScroll = () => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // If it's a stat number, start counting
                    if (entry.target.classList.contains('stat-number')) {
                        startCounting(entry.target);
                    }
                }
            });
        }, observerOptions);

        const elementsToAnimate = document.querySelectorAll('.animate-scroll, .stat-number');
        elementsToAnimate.forEach(el => observer.observe(el));
    };

    // 2. Animated Counters
    const startCounting = (element) => {
        if (element.dataset.counted === "true") return;
        
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentCount = Math.floor(easeProgress * target);
            
            if (target === 95) {
                element.innerText = `${currentCount}%`;
            } else if (target === 1000) {
                element.innerText = `+${currentCount}`;
            } else {
                element.innerText = currentCount;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.dataset.counted = "true";
            }
        };

        requestAnimationFrame(updateCount);
    };

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // 4. Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // 5. Offers Sidebar Toggle
    const offersSidebar = document.getElementById('offers-sidebar');
    const offersToggle = document.getElementById('offers-toggle');

    if (offersSidebar && offersToggle) {
        // Toggle panel on click
        offersToggle.addEventListener('click', () => {
            offersSidebar.classList.toggle('open');
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!offersSidebar.contains(e.target) && offersSidebar.classList.contains('open')) {
                offersSidebar.classList.remove('open');
            }
        });
    }

    // Initialize animations
    animateOnScroll();
});
