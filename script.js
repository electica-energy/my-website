// ===================================
// ELECTICA - AI-Native Battery OS
// Interactive JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initIntersectionObserver();
    initMobileMenu();
    initParallaxEffects();
});

// ===================================
// NAVBAR
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add background on scroll
        if (scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll direction
        if (scrollY > 300) {
            if (scrollY > lastScrollY) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
function initIntersectionObserver() {
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Animate children with stagger
                const animatables = entry.target.querySelectorAll('.problem-card, .tech-card, .traction-card, .market-item, .team-card');
                animatables.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .problem-card, .tech-card, .traction-card, .market-item, .team-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .problem-card.animate-in, .tech-card.animate-in, .traction-card.animate-in,
        .market-item.animate-in, .team-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section {
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        
        .section.is-visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn) return;

    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            ${navLinks.innerHTML}
        </div>
    `;
    document.body.appendChild(mobileMenu);

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 15, 0.98);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            backdrop-filter: blur(20px);
        }
        
        .mobile-menu.is-open {
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }
        
        .mobile-menu-content a {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 600;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease, color 0.2s ease;
        }
        
        .mobile-menu.is-open .mobile-menu-content a {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu-content a:hover {
            color: #6366f1;
        }
        
        .mobile-menu.is-open .mobile-menu-content a:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu.is-open .mobile-menu-content a:nth-child(2) { transition-delay: 0.15s; }
        .mobile-menu.is-open .mobile-menu-content a:nth-child(3) { transition-delay: 0.2s; }
        .mobile-menu.is-open .mobile-menu-content a:nth-child(4) { transition-delay: 0.25s; }
        .mobile-menu.is-open .mobile-menu-content a:nth-child(5) { transition-delay: 0.3s; }
        
        .mobile-menu-btn.is-active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .mobile-menu-btn.is-active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.is-active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);

    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-open');
        document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

// ===================================
// PARALLAX EFFECTS
// ===================================
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    if (orbs.length === 0) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 10;
            orb.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// TYPING EFFECT (Optional)
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===================================
// CURSOR GLOW EFFECT (Optional)
// ===================================
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    const style = document.createElement('style');
    style.textContent = `
        .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        
        body:hover .cursor-glow {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Initialize cursor glow on desktop only
if (window.matchMedia('(min-width: 1024px)').matches) {
    initCursorGlow();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
