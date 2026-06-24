document.addEventListener('DOMContentLoaded', () => {
    // 1. Off-Canvas Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerToggle');
    const offCanvasMenu = document.getElementById('offCanvasMenu');
    
    if (hamburgerBtn && offCanvasMenu) {
        hamburgerBtn.addEventListener('click', () => {
            offCanvasMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Transform hamburger icon to X (optional enhancement, sticking to strict layout rules)
            const spans = hamburgerBtn.querySelectorAll('span');
            if (offCanvasMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Inject close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'close-menu-btn';
        closeBtn.setAttribute('aria-label', 'Close Menu');
        offCanvasMenu.appendChild(closeBtn);

        closeBtn.addEventListener('click', () => {
            offCanvasMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            const spans = hamburgerBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });

        // Close menu when clicking a link inside it
        const offCanvasLinks = offCanvasMenu.querySelectorAll('a');
        offCanvasLinks.forEach(link => {
            link.addEventListener('click', () => {
                offCanvasMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                const spans = hamburgerBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 1.5 Clone header icons and CTAs into Off-Canvas for mobile
    const navActions = document.querySelector('.site-header .nav-actions');
    const offCanvasNavContainer = document.querySelector('.off-canvas-nav');
    
    if (navActions && offCanvasNavContainer) {
        // Remove hardcoded buttons to prevent duplicates
        const existingBtns = offCanvasNavContainer.querySelectorAll('.btn');
        existingBtns.forEach(btn => btn.remove());
        
        // Clone Icons FIRST
        const topDarkModeToggle = navActions.querySelector('.dark-mode-toggle');
        const topRtlToggle = navActions.querySelector('.rtl-toggle');
        
        if (topDarkModeToggle && topRtlToggle) {
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'off-canvas-controls';
            controlsDiv.appendChild(topDarkModeToggle.cloneNode(true));
            controlsDiv.appendChild(topRtlToggle.cloneNode(true));
            offCanvasNavContainer.appendChild(controlsDiv);
        }

        // Clone Buttons (CTAs) SECOND
        const ctAs = navActions.querySelectorAll('.btn');
        if (ctAs.length > 0) {
            const ctaContainer = document.createElement('div');
            ctaContainer.style.display = 'flex';
            ctaContainer.style.flexDirection = 'column';
            ctaContainer.style.gap = '12px';
            ctaContainer.style.width = '100%';
            ctaContainer.style.marginTop = '12px';
            ctaContainer.style.marginBottom = '12px';

            ctAs.forEach(btn => {
                const clone = btn.cloneNode(true);
                clone.style.display = 'block';
                clone.style.textAlign = 'center';
                clone.style.width = '100%';
                clone.style.maxWidth = '100%'; // Ensure no max-width constraints
                ctaContainer.appendChild(clone);
            });
            offCanvasNavContainer.appendChild(ctaContainer);
        }
    }

    // 2. Dark Mode Toggle
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
    const body = document.body;
    
    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // 3. RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const htmlEl = document.documentElement;

    if (localStorage.getItem('direction') === 'rtl') {
        htmlEl.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (htmlEl.getAttribute('dir') === 'rtl') {
                htmlEl.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
            }
        });
    });

    // 4. Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Scroll Reveals (Organic reveals)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -100px 0px", threshold: 0.1 });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // 6. Premium 3D Tilt Animation for Herpetology Showcase
    const tiltElements = document.querySelectorAll('.herp-item[data-tilt]');
    
    tiltElements.forEach(item => {
        const imgBox = item.querySelector('.herp-img-box');
        const img = item.querySelector('.tilt-image');
        
        if(!imgBox || !img) return;

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const maxRotate = 8;
            
            const rotateX = percentY * -maxRotate;
            const rotateY = percentX * maxRotate;
            
            img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            img.style.transform = `scale(1.05) rotateX(0deg) rotateY(0deg)`;
            
            setTimeout(() => {
                img.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 500);
        });
        
        item.addEventListener('mouseenter', () => {
            img.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // 7. Mouse Parallax for Premium Bento Section
    const bentoSection = document.querySelector('.premium-bento-section');
    if (bentoSection) {
        const indicators = bentoSection.querySelectorAll('.floating-indicator');
        
        bentoSection.addEventListener('mousemove', (e) => {
            const rect = bentoSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            indicators.forEach(ind => {
                const speed = parseFloat(ind.getAttribute('data-speed')) || 1;
                const moveX = percentX * speed * -20;
                const moveY = percentY * speed * -20;
                
                ind.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        bentoSection.addEventListener('mouseleave', () => {
            indicators.forEach(ind => {
                ind.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // 8. Mouse Tracking Glow and Mobile Click for Prevention Panels
    const prevPanels = document.querySelectorAll('.prev-panel');
    prevPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Add click toggle for mobile
        panel.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                // Remove prev-open from others
                prevPanels.forEach(p => {
                    if (p !== panel) p.classList.remove('prev-open');
                });
                panel.classList.toggle('prev-open');
            }
        });
    });

    // 9. About Page JS Interactions
    const legacyImage = document.querySelector('.legacy-image[data-parallax]');
    if (legacyImage) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            legacyImage.style.transform = `translateY(${scrollPos * 0.15}px)`;
        });
    }

    const legacyContent = document.querySelector('.legacy-content');
    if (legacyContent) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    legacyContent.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        observer.observe(legacyContent);
    }

    const glowItems = document.querySelectorAll('[data-glow]');
    glowItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const overlay = item.querySelector('.showcase-overlay');
            if(overlay) {
                overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(16, 24, 24, 0.4) 0%, rgba(22, 56, 50, 0.7) 40%, rgba(0,0,0,0.9) 100%)`;
            }
        });
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.showcase-overlay');
            if(overlay) {
                overlay.style.background = '';
            }
        });
    });

    // 10. Active Nav State & Dropdown
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav ul li a, .off-canvas-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            const parentLi = link.closest('.has-dropdown');
            if (parentLi) {
                const parentLink = parentLi.querySelector('a:first-child');
                if (parentLink) parentLink.classList.add('active');
            }
        }
    });

    // 11. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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
    }

    // removed prevention panels mobile accordion logic

    // 12. 3D Tilt Effect for Brand Cards
    const brandTiltElements = document.querySelectorAll('[data-tilt]');
    brandTiltElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
