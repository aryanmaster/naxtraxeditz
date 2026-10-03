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

    // --- 2. Navbar Logo ---
    const navbar = document.getElementById('navbar'), heroLogo = document.getElementById('heroLogo');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 150);
        heroLogo.classList.toggle('hidden', window.scrollY > 150);
    });

    // --- 3. Mobile Menu (UPDATED FOR 2-ROW) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navBottomRow = document.getElementById('nav-bottom-row');
    const navItems = document.querySelectorAll('.nav-links a');

    function closeMobileMenu() {
        if(navBottomRow.classList.contains('active')) {
            navBottomRow.classList.remove('active');
            mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    }
    mobileMenu.addEventListener('click', () => {
        navBottomRow.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        navBottomRow.classList.contains('active') ? icon.classList.replace('fa-bars', 'fa-times') : icon.classList.replace('fa-times', 'fa-bars');
    });
    navItems.forEach(item => item.addEventListener('click', closeMobileMenu));

    // --- 4. Scroll Animations ---
    const animatedSections = document.querySelectorAll('.section-animate');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    animatedSections.forEach(s => sectionObserver.observe(s));

    // --- 5. Fix Mobile Touch Toggles ---
    
    // A. Review Cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const track = card.closest('.marquee-track');
            const isActive = card.classList.contains('active');
            
            reviewCards.forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'running');
            
            if (!isActive) {
                card.classList.add('active');
                track.style.animationPlayState = 'paused'; 
            }
        });
    });

    // B. Video (Edit) Cards
    const editCards = document.querySelectorAll('.edit-card');
    editCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('active');
        });
    });

    // C. Software App Cards
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

    // Universal click outside to turn everything off
    document.addEventListener('click', () => {
        reviewCards.forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'running');
        editCards.forEach(c => c.classList.remove('active'));
        appCards.forEach(c => c.classList.remove('active')); 
        specsContainer.classList.remove('active');
    });

    // --- 6. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- 7. Modals (Booking, Feedback, Legal) ---
    const bookingModal = document.getElementById('bookingModal');
    const feedbackModal = document.getElementById('feedbackModal');
    
    document.querySelectorAll('.bookBtnMobile').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); bookingModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
    }));
    document.querySelectorAll('.feedbackBtnMobile').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); feedbackModal.classList.add('active'); document.body.style.overflow = 'hidden'; closeMobileMenu();
    }));

    const legalData = {
        'terms': { title: "Terms of Service", content: "<strong>1. Intellectual Property & Rights:</strong> Welcome to NAXTRAX EDITZ. By engaging our services, you agree that all raw project files, drafts, and finalized media remain the intellectual property of NAXTRAX EDITZ until full payment is cleared. Once final delivery and payment are complete, commercial usage rights are transferred to you. <br><br><strong>2. Revisions & Approvals:</strong> Standard editing packages include up to two minor revision rounds. Major structural changes requested after the initial direction has been approved will incur additional fees, calculated based on the scope of the new work. <br><br><strong>3. Media Liability:</strong> Clients must possess the legal rights or licenses for any raw footage, music, or assets provided to us. We hold no liability for copyright strikes, legal actions, or claims arising from client-provided material. <br><br><strong>4. Right of Refusal:</strong> We reserve the right to decline any project that involves illegal activities, hate speech, or violates general community guidelines without providing further explanation." },
        'privacy': { title: "Privacy Policy", content: "<strong>1. Data Collection:</strong> At NAXTRAX EDITZ, your privacy is a top priority. We only collect essential information—such as your Name, Email, Mobile Number, and project specifications—necessary to fulfill your editing requests and improve our services. <br><br><strong>2. Usage of Information:</strong> The contact details provided are strictly used for project communication, delivery updates, and professional follow-ups. We do not sell, rent, or trade your personal data to any third-party marketers or agencies under any circumstances. <br><br><strong>3. Third-Party Integrations:</strong> We utilize secure third-party services like Formspree.io to manage our form submissions efficiently. These providers are bound by their own strict data compliance rules. <br><br><strong>4. Your Rights:</strong> You retain the right to request the complete deletion of your contact data and records from our logs at any time following the completion of your project. Simply reach out to us via email to initiate a data wipe." },
        'security': { title: "Security Protocols", content: "<strong>1. Safe Transmission:</strong> We employ robust security measures to protect your digital assets. All form submissions and communications are encrypted via industry-standard protocols to ensure safe data transmission. <br><br><strong>2. Offline Asset Protection:</strong> Your raw footage, assets, and project files are stored locally on secure, password-protected offline drives during the editing process to prevent unauthorized access or potential data breaches. <br><br><strong>3. Data Retention & Deletion:</strong> To ensure absolute client confidentiality, all media files and exported videos are permanently purged from our primary systems 30 days after final delivery, unless a prior long-term storage agreement has been established. <br><br><strong>4. Breach Protocols:</strong> In the highly unlikely event of a security compromise involving project files, affected clients will be notified immediately, and proactive steps will be taken to lock down sensitive information." }
    };
    const legalModal = document.getElementById('legalModal'), legalTitle = document.getElementById('legalTitle'), legalText = document.getElementById('legalText');
    
    document.querySelectorAll('.legal-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-legal');
            legalTitle.innerText = legalData[type].title; legalText.innerHTML = legalData[type].content;
            legalModal.classList.add('active'); 
            legalText.scrollTop = 0; 
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => btn.addEventListener('click', () => {
        document.getElementById(btn.getAttribute('data-close')).classList.remove('active'); document.body.style.overflow = 'auto'; 
    }));
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.addEventListener('click', (e) => {
        if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
    }));

    // --- 8. Track Your Edit & Captcha ---
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
        generateCaptcha(); captchaInput.value = ''; trackResult.style.display = 'none'; trackForm.reset(); closeMobileMenu();
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

        const exactRegex = /^NAX-AK\d{4}[@#$&*]$/;

        if (exactRegex.test(userCode)) {
            trackResult.style.display = 'block';
            trackResult.innerHTML = `<span style="color: #00f2fe;"><i class="fas fa-spinner fa-spin"></i> Fetching status...</span>`;
            setTimeout(() => {
                trackResult.innerHTML = `<span style="color: #25d366;"><i class="fas fa-check-circle"></i> <strong>Code Verified!</strong></span><br><br><span style="color: #ccc; font-size: 14px;">Your project is currently in the creative pipeline. Quality takes time, and NAXTRAX EDITZ is crafting it to perfection. Expect an update on your email soon!</span>`;
                generateCaptcha(); 
                captchaInput.value = '';
            }, 1500);
        } else {
            trackResult.style.display = 'block';
            if (userCode.toUpperCase().startsWith('NAX-AK') && userCode !== userCode.toUpperCase()) {
                trackResult.innerHTML = `<span style="color: #ff4d4d;"><i class="fas fa-exclamation-triangle"></i> Error: Only CAPITAL letters are allowed. Please use exact format.</span>`;
            } else {
                trackResult.innerHTML = `<span style="color: #ff4d4d;"><i class="fas fa-times-circle"></i> Invalid Tracking Code. Make sure it is exactly like NAX-AK5279#</span>`;
            }
            generateCaptcha(); 
            captchaInput.value = '';
        }
    });

    // --- 9. Forms Submission & Star Rating System ---
    const successAlert = document.getElementById('successAlert');
    const alertTitle = document.getElementById('alertTitle'), alertMessage = document.getElementById('alertMessage');
    const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
    const hiddenTrackingCode = document.getElementById('hiddenTrackingCode');

    // Star Rating Logic
    const stars = document.querySelectorAll('#starRating i');
    const ratingValue = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingValue.value = rating;
            
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

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

    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!ratingValue.value) {
            alert("Please select a star rating before submitting!");
            return;
        }

        const submitBtn = feedbackForm.querySelector('.submit-btn'), originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        try {
            const res = await fetch(feedbackForm.action, { method: 'POST', body: new FormData(feedbackForm), headers: { 'Accept': 'application/json' }});
            if (res.ok) {
                feedbackModal.classList.remove('active');
                const randomMsg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
                alertTitle.innerText = randomMsg.title; alertMessage.innerText = randomMsg.text;
                generatedCodeDisplay.style.display = 'none'; 
                successAlert.classList.add('active'); 
                feedbackForm.reset();
                stars.forEach(s => s.classList.remove('active')); 
                ratingValue.value = '';
            } else alert('Problem submitting form.');
        } catch (err) { alert('Network error.'); } finally { submitBtn.innerHTML = originalText; }
    });

    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('.submit-btn'), originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

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

    // --- 11. Smart Video Player Logic ---
    const allVideos = document.querySelectorAll('.portfolio-video');
    
    allVideos.forEach(video => {
        video.addEventListener('play', () => {
            allVideos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.pause(); 
            }
        });
    }, { threshold: 0.1 }); 

    allVideos.forEach(video => videoObserver.observe(video));
});
