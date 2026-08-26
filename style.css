// @ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Cursor Glow ---
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let glowX = mouseX, glowY = mouseY, glowTimeout;
    
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
        glowX += (mouseX - glowX) * 0.4; 
        glowY += (mouseY - glowY) * 0.4;
        cursorGlow.style.transform = `translate3d(${glowX - 150}px, ${glowY - 150}px, 0)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // --- 2. Theme Toggle ---
    const themeCheckbox = document.getElementById('checkbox');
    themeCheckbox.addEventListener('change', () => {
        document.body.classList.toggle('light-mode', themeCheckbox.checked);
    });

    // --- 3. Navbar Logo ---
    const navbar = document.getElementById('navbar'), heroLogo = document.getElementById('heroLogo');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 150);
        heroLogo.classList.toggle('hidden', window.scrollY > 150);
    });

    // --- 4. Mobile Menu ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    function closeMobileMenu() {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    }
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        navLinks.classList.contains('active') ? icon.classList.replace('fa-bars', 'fa-times') : icon.classList.replace('fa-times', 'fa-bars');
    });
    navItems.forEach(item => item.addEventListener('click', closeMobileMenu));

    // --- 5. Scroll Animations ---
    const animatedSections = document.querySelectorAll('.section-animate');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    animatedSections.forEach(s => sectionObserver.observe(s));

    // --- 6. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- 7. App Specs ---
    const appCards = document.querySelectorAll('.app-card');
    const specsContainer = document.getElementById('app-specs-container');
    const specTitle = document.getElementById('spec-title'), specDesc = document.getElementById('spec-desc');
    const appData = {
        'capcut': { title: "CapCut", desc: "A versatile, user-friendly video editor perfect for quick edits, reels, and tools like chroma key." },
        'alight': { title: "Alight Motion", desc: "The industry standard for mobile motion graphics. Features advanced keyframe animation and vector graphics." },
        'aftermotion': { title: "After Motion", desc: "A powerful alternative for intensive motion design and visual effects with intricate control." },
        'ps': { title: "PS Express", desc: "Adobe's streamlined photo editor tailored for quick, stunning enhancements and aesthetic thumbnails." },
        'picsart': { title: "Picsart", desc: "The ultimate creative playground for photo manipulation with AI-powered cutout tools." },
        'node': { title: "Node Video", desc: "A revolutionary node-based editing app bringing desktop-level compositing to mobile." }
    };
    appCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const appKey = card.getAttribute('data-app');
            if (card.classList.contains('active')) {
                card.classList.remove('active'); specsContainer.classList.remove('active');
            } else {
                appCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                specTitle.innerText = appData[appKey].title; specDesc.innerText = appData[appKey].desc;
                specsContainer.classList.add('active');
            }
        });
    });
    document.addEventListener('click', () => {
        appCards.forEach(c => c.classList.remove('active')); specsContainer.classList.remove('active');
    });

    // --- 8. Modals (Booking, Feedback, Legal) ---
    const bookingModal = document.getElementById('bookingModal');
    const feedbackModal = document.getElementById('feedbackModal');
    
    document.querySelectorAll('.bookBtnMobile').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); bookingModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
    }));
    document.querySelectorAll('.feedbackBtnMobile').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); feedbackModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
    }));

    const legalData = {
        'terms': { title: "Terms of Service", content: "<strong>1. Intellectual Property:</strong> Welcome to NAXTRAX EDITZ. All raw files and media remain the intellectual property of NAXTRAX EDITZ until full payment is cleared.<br><br><strong>2. Revisions:</strong> Standard packages include up to two minor revision rounds.<br><br><strong>3. Liability:</strong> Clients must possess legal rights for raw footage provided." },
        'privacy': { title: "Privacy Policy", content: "<strong>1. Data Collection:</strong> We only collect essential information (Name, Email, Mobile) necessary for your editing requests.<br><br><strong>2. Usage:</strong> Details are strictly used for project communication. We do not sell your data.<br><br><strong>3. Third-Party:</strong> We utilize secure services like Formspree to handle submissions safely." },
        'security': { title: "Security Protocols", content: "<strong>1. Transmission:</strong> We employ robust security measures. All communications are encrypted via industry-standard protocols.<br><br><strong>2. Offline Protection:</strong> Project files are stored locally on secure offline drives.<br><br><strong>3. Deletion:</strong> All media files are permanently purged 30 days after final delivery." }
    };
    const legalModal = document.getElementById('legalModal'), legalTitle = document.getElementById('legalTitle'), legalText = document.getElementById('legalText');
    
    document.querySelectorAll('.legal-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-legal');
            legalTitle.innerText = legalData[type].title; legalText.innerHTML = legalData[type].content;
            legalModal.classList.add('active'); legalText.scrollTop = 0; document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => btn.addEventListener('click', () => {
        document.getElementById(btn.getAttribute('data-close')).classList.remove('active'); document.body.style.overflow = 'auto'; 
    }));
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.addEventListener('click', (e) => {
        if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
    }));

    // --- 9. Track Your Edit & Captcha ---
    const trackModal = document.getElementById('trackModal'), trackForm = document.getElementById('trackForm');
    const captchaLabel = document.getElementById('captchaLabel'), captchaInput = document.getElementById('captchaInput');
    const trackResult = document.getElementById('trackResult');
    let captchaAnswer = 0;

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1, num2 = Math.floor(Math.random() * 10) + 1;
        captchaAnswer = num1 + num2;
        captchaLabel.innerHTML = `<strong>Security Check:</strong> What is ${num1} + ${num2}?`;
    }

    document.querySelectorAll('.trackBtnMobile').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); trackModal.classList.add('active'); document.body.style.overflow = 'hidden'; 
        generateCaptcha(); trackResult.style.display = 'none'; trackForm.reset(); closeMobileMenu();
    }));

    trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userCode = document.getElementById('trackCodeInput').value.trim();
        const userCaptcha = parseInt(captchaInput.value);

        if (userCaptcha !== captchaAnswer) {
            trackResult.style.display = 'block';
            trackResult.innerHTML = `<span style="color: #ff4d4d;"><i class="fas fa-exclamation-triangle"></i> Incorrect Captcha. Try again.</span>`;
            generateCaptcha(); captchaInput.value = ''; return;
        }

        // Updated Validation for NAX-AK format without the second hyphen
        if (userCode.toUpperCase().startsWith('NAX-AK')) {
            trackResult.style.display = 'block';
            trackResult.innerHTML = `<span style="color: #00f2fe;"><i class="fas fa-spinner fa-spin"></i> Fetching status...</span>`;
            setTimeout(() => {
                trackResult.innerHTML = `<span style="color: #25d366;"><i class="fas fa-check-circle"></i> <strong>Code Verified!</strong></span><br><br><span style="color: #ccc; font-size: 14px;">Your project is currently in the creative pipeline. Quality takes time, and NAXTRAX EDITZ is crafting it to perfection. Expect an update on your email soon!</span>`;
            }, 1500);
        } else {
            trackResult.style.display = 'block';
            trackResult.innerHTML = `<span style="color: #ff4d4d;"><i class="fas fa-times-circle"></i> Invalid Code. Must start with 'NAX-AK'.</span>`;
        }
    });

    // --- 10. Forms Submission (Booking & Feedback) ---
    const successAlert = document.getElementById('successAlert');
    const alertTitle = document.getElementById('alertTitle'), alertMessage = document.getElementById('alertMessage');
    const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
    const hiddenTrackingCode = document.getElementById('hiddenTrackingCode');

    const bookingMessages = [
        { title: "Awesome!", text: "Your booking is locked in! NAXTRAX EDITZ will reach out soon." },
        { title: "Request Received!", text: "Thanks! I'm reviewing your details and will get back to you shortly." },
        { title: "You're all set!", text: "Your request has landed. Get ready for some cinematic brilliance!" },
        { title: "Success!", text: "Got it! I'll be in touch to turn your raw footage into a masterpiece." },
        { title: "Boom! Done.", text: "Your details are safe. NAXTRAX EDITZ will contact you soon." }
    ];

    const feedbackMessages = [
        { title: "Thank You!", text: "Your feedback means the world to me!" },
        { title: "Feedback Received!", text: "I appreciate your review. It helps me level up my editing game!" },
        { title: "You're the Best!", text: "Thanks for dropping a review! Keeps the creative juices flowing." },
        { title: "Got your Review!", text: "Thank you for sharing your experience. It's clients like you that make this awesome." },
        { title: "Much Appreciated!", text: "Your feedback was submitted successfully. Thanks for supporting NAXTRAX EDITZ!" }
    ];

    // Feedback Form Logic
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = feedbackForm.querySelector('.submit-btn'), originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        try {
            const res = await fetch(feedbackForm.action, { method: 'POST', body: new FormData(feedbackForm), headers: { 'Accept': 'application/json' }});
            if (res.ok) {
                feedbackModal.classList.remove('active');
                const randomMsg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
                alertTitle.innerText = randomMsg.title; alertMessage.innerText = randomMsg.text;
                generatedCodeDisplay.style.display = 'none'; 
                successAlert.classList.add('active'); feedbackForm.reset();
            } else alert('Problem submitting form.');
        } catch (err) { alert('Network error.'); } finally { submitBtn.innerHTML = originalText; }
    });

    // Booking Form Logic
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('.submit-btn'), originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Updated NAX-AK Code Generation (No second hyphen)
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const randomSymbol = ['@', '#', '$', '&', '*'][Math.floor(Math.random() * 5)];
        const naxCode = `NAX-AK${randomNum}${randomSymbol}`;
        hiddenTrackingCode.value = naxCode;

        try {
            const res = await fetch(bookingForm.action, { method: 'POST', body: new FormData(bookingForm), headers: { 'Accept': 'application/json' }});
            if (res.ok) {
                bookingModal.classList.remove('active');
                const randomMsg = bookingMessages[Math.floor(Math.random() * bookingMessages.length)];
                alertTitle.innerText = randomMsg.title; 
                alertMessage.innerText = randomMsg.text;
                
                const coolColors = ['#00f2fe', '#f9a826', '#ff0844', '#00b09b', '#c77dff'];
                const randColor = coolColors[Math.floor(Math.random() * coolColors.length)];
                generatedCodeDisplay.style.display = 'block';
                generatedCodeDisplay.innerHTML = `<br><span style="font-size:14px; color:var(--text-secondary);">Your Tracking Code:</span><br><strong style="color: ${randColor}; text-shadow: 0 0 10px ${randColor};">${naxCode}</strong>`;

                successAlert.classList.add('active'); bookingForm.reset();
            } else alert('Problem submitting form.');
        } catch (err) { alert('Network error.'); } finally { submitBtn.innerHTML = originalText; }
    });

    document.getElementById('closeAlertBtn').addEventListener('click', () => {
        successAlert.classList.remove('active'); document.body.style.overflow = 'auto'; 
    });
});
