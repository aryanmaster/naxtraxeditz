// @ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Super Fast & Smooth Cursor Glow ---
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let glowTimeout;
    
    function handleCursorMove(event) {
        mouseX = event.clientX || (event.touches && event.touches[0].clientX);
        mouseY = event.clientY || (event.touches && event.touches[0].clientY);
        
        cursorGlow.style.opacity = '1';
        clearTimeout(glowTimeout);
        glowTimeout = setTimeout(() => { cursorGlow.style.opacity = '0'; }, 200);
    }

    window.addEventListener('mousemove', handleCursorMove);
    window.addEventListener('touchmove', handleCursorMove);

    function animateGlow() {
        // High speed multiplier (0.4) for snappy smooth follow
        glowX += (mouseX - glowX) * 0.4; 
        glowY += (mouseY - glowY) * 0.4;
        cursorGlow.style.transform = `translate3d(${glowX - 150}px, ${glowY - 150}px, 0)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // --- 2. Theme Toggle (Capsule Switch) ---
    const themeCheckbox = document.getElementById('checkbox');
    const body = document.body;
    
    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    });

    // --- 3. Smart Navbar & Hero Logo Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const heroLogo = document.getElementById('heroLogo');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            navbar.classList.add('scrolled');
            heroLogo.classList.add('hidden'); // Uses CSS class for GPU smoothness
        } else {
            navbar.classList.remove('scrolled');
            heroLogo.classList.remove('hidden');
        }
    });

    // --- 4. Mobile Menu Toggle Logic ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    function closeMobileMenu() {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => item.addEventListener('click', closeMobileMenu));

    // --- 5. Scroll Animations ---
    const animatedSections = document.querySelectorAll('.section-animate');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    animatedSections.forEach(section => sectionObserver.observe(section));

    // --- 6. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // --- 7. Single Tap App Specifications ---
    const appCards = document.querySelectorAll('.app-card');
    const specsContainer = document.getElementById('app-specs-container');
    const specTitle = document.getElementById('spec-title');
    const specDesc = document.getElementById('spec-desc');

    const appData = {
        'capcut': { title: "CapCut", desc: "A versatile, user-friendly video editor packed with trending effects, transitions, and text animations. Perfect for quick edits, reels, and professional-grade tools like chroma key." },
        'alight': { title: "Alight Motion", desc: "The industry standard for mobile motion graphics. It features advanced keyframe animation, multi-layer compositing, vector graphics, and custom easing." },
        'aftermotion': { title: "After Motion", desc: "A powerful alternative for intensive motion design and visual effects. It provides intricate control over layers, masks, and blending modes." },
        'ps': { title: "PS Express", desc: "Adobe's streamlined photo editor tailored for quick, stunning enhancements. Brings professional color grading and smart filters to your fingertips." },
        'picsart': { title: "Picsart", desc: "The ultimate creative playground for photo manipulation. With its vast library of stickers and AI-powered cutout tools, it's perfect for aesthetic visuals." },
        'node': { title: "Node Video", desc: "A revolutionary node-based editing app bringing desktop-level compositing to mobile. It features 3D rendering, optical flow, and precise masking." }
    };

    appCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.stopPropagation(); 
            const appKey = card.getAttribute('data-app');
            
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                specsContainer.classList.remove('active');
            } else {
                appCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                specTitle.innerText = appData[appKey].title;
                specDesc.innerText = appData[appKey].desc;
                specsContainer.classList.add('active');
            }
        });
    });

    document.addEventListener('click', () => {
        appCards.forEach(c => c.classList.remove('active'));
        specsContainer.classList.remove('active');
    });

    // --- 8. Modals (Booking, Feedback, Legal) ---
    const bookBtns = document.querySelectorAll('.bookBtnMobile');
    const feedbackBtns = document.querySelectorAll('.feedbackBtnMobile');
    const bookingModal = document.getElementById('bookingModal');
    const feedbackModal = document.getElementById('feedbackModal');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); bookingModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
        });
    });

    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); feedbackModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
        });
    });

    const legalLinks = document.querySelectorAll('.legal-links a');
    const legalModal = document.getElementById('legalModal');
    const legalTitle = document.getElementById('legalTitle');
    const legalText = document.getElementById('legalText');

    const legalData = {
        'terms': { title: "Terms of Service", content: "<strong>1. Intellectual Property & Rights:</strong> Welcome to NAXTRAX EDITZ. By engaging our services, you agree that all raw project files, drafts, and finalized media remain the intellectual property of NAXTRAX EDITZ until full payment is cleared. <br><br><strong>2. Revisions & Approvals:</strong> Standard editing packages include up to two minor revision rounds. Major structural changes requested after the initial direction has been approved will incur additional fees. <br><br><strong>3. Media Liability:</strong> Clients must possess the legal rights or licenses for any raw footage, music, or assets provided to us. We hold no liability for copyright strikes or claims arising from client-provided material. <br><br><strong>4. Right of Refusal:</strong> We reserve the right to decline any project that involves illegal activities, hate speech, or violates general community guidelines." },
        'privacy': { title: "Privacy Policy", content: "<strong>1. Data Collection:</strong> At NAXTRAX EDITZ, your privacy is a top priority. We only collect essential information—such as your Name, Email, Mobile Number, and project specifications—necessary to fulfill your editing requests. <br><br><strong>2. Usage of Information:</strong> The contact details provided are strictly used for project communication, delivery updates, and professional follow-ups. We do not sell, rent, or trade your personal data to any third-party marketers or agencies. <br><br><strong>3. Third-Party Integrations:</strong> We utilize secure third-party services like Formspree.io to manage our form submissions efficiently. <br><br><strong>4. Your Rights:</strong> You retain the right to request the complete deletion of your contact data and records from our logs at any time following the completion of your project." },
        'security': { title: "Security Protocols", content: "<strong>1. Safe Transmission:</strong> We employ robust security measures to protect your digital assets. All form submissions and communications are encrypted via industry-standard protocols to ensure safe data transmission. <br><br><strong>2. Offline Asset Protection:</strong> Your raw footage, assets, and project files are stored locally on secure, password-protected offline drives during the editing process to prevent unauthorized access. <br><br><strong>3. Data Retention & Deletion:</strong> To ensure absolute client confidentiality, all media files and exported videos are permanently purged from our primary systems 30 days after final delivery, unless a prior long-term storage agreement has been established." }
    };

    legalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const type = link.getAttribute('data-legal');
            legalTitle.innerText = legalData[type].title;
            legalText.innerHTML = legalData[type].content;
            legalModal.classList.add('active');
            
            // Fix: Reset scroll position to top!
            legalText.scrollTop = 0; 
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBtns = document.querySelectorAll('.close-btn');
    const allModals = document.querySelectorAll('.modal-overlay');

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });
    });

    allModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active'); document.body.style.overflow = 'auto';
            }
        });
    });

    // --- 9. Form Submission ---
    const forms = [document.getElementById('bookingForm'), document.getElementById('feedbackForm')];
    const successAlert = document.getElementById('successAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');
    
    forms.forEach(form => {
        if(!form) return; 
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' }});
                if (response.ok) {
                    const parentModal = form.closest('.modal-overlay');
                    if(parentModal) parentModal.classList.remove('active'); 
                    successAlert.classList.add('active'); 
                    form.reset(); 
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            } catch (error) {
                alert('Oops! Network error. Please try again later.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
            }
        });
    });

    closeAlertBtn.addEventListener('click', () => {
        successAlert.classList.remove('active'); document.body.style.overflow = 'auto'; 
    });
});
