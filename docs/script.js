document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 2. Scroll Reveals (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* --- 3. Dynamic Menu Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                // If filter is all or matches the card's category
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // Add a tiny timeout to allow display:block to apply before animating opacity
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300); // Matches transition duration
                }
            });
        });
    });

    /* --- 4. Subscription Pricing Toggle --- */
    const pricingToggle = document.getElementById('pricing-toggle');
    const amounts = document.querySelectorAll('.amount');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            const isMonthly = pricingToggle.checked;
            
            amounts.forEach(amount => {
                // Determine new price
                const newPrice = isMonthly ? amount.getAttribute('data-monthly') : amount.getAttribute('data-weekly');
                
                // Animate change
                amount.style.opacity = '0';
                
                setTimeout(() => {
                    amount.innerText = newPrice;
                    amount.style.opacity = '1';
                }, 200);
            });
            
            // Update labels
            const periods = document.querySelectorAll('.billing-period');
            periods.forEach(p => {
                p.style.opacity = '0';
                setTimeout(() => {
                    p.innerText = isMonthly ? 'per month' : 'per week';
                    p.style.opacity = '1';
                }, 200);
            });
        });
    }

    /* --- 5. Hero Parallax Effect --- */
    const heroImage = document.getElementById('hero-img');
    const leaves = document.querySelectorAll('.parallax-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
        
        leaves.forEach((leaf, index) => {
            const speed = (index + 1) * 0.1;
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    /* --- 6. Back to Top Button --- */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
