document.addEventListener("DOMContentLoaded", () => {
    
    // --- DATA CONFIGURATION ---
    const mediaFiles = {
        gifs: ["ezgif-6bc09505ac6bd026", "ezgif-60b77802565864ca", "ezgif-234b50278fbf1ae2", "ezgif-284bae8da57c65eb", "ezgif-6211db7adb243664", "ezgif-6ba8f5d2959c8e3e"],
        photos: ["DSC00731", "DSC00746", "DSC00769", "DSC00340", "DSC00398", "DSC00480", "DSC00501", "DSC00527", "DSC00538", "DSC00568", "DSC00674"],
        tours: ["DSC00214", "DSC00298", "DSC00299", "DSC00500", "DSC00571", "DSC00752", "DSC00783"],
        videos: []
    };

    // Alt text descriptions for SEO accessibility
    const altText = {
        "ezgif-6bc09505ac6bd026": "Parkour move in Ingolstadt – PKIN action clip",
        "ezgif-60b77802565864ca": "Freerunning jump in Ingolstadt – PKIN action clip",
        "ezgif-234b50278fbf1ae2": "Parkour training in Ingolstadt – PKIN action clip",
        "ezgif-284bae8da57c65eb": "Parkour Ingolstadt – PKIN action clip",
        "ezgif-6211db7adb243664": "Freerunning Ingolstadt – PKIN action clip",
        "ezgif-6ba8f5d2959c8e3e": "Parkour PKIN Ingolstadt – action clip",
        "DSC00731": "Parkour training session at PKIN Ingolstadt",
        "DSC00746": "Freerunning athlete at PKIN Ingolstadt spot",
        "DSC00769": "PKIN parkour athlete in action, Ingolstadt",
        "DSC00340": "Parkour jump at PKIN Ingolstadt training spot",
        "DSC00398": "PKIN freerunning training in Ingolstadt",
        "DSC00480": "Parkour athlete training at PKIN Ingolstadt",
        "DSC00501": "PKIN parkour community training in Ingolstadt",
        "DSC00527": "Freerunning at PKIN Ingolstadt – action photo",
        "DSC00538": "PKIN parkour athlete in Ingolstadt",
        "DSC00568": "Parkour jump at PKIN training spot Ingolstadt",
        "DSC00674": "PKIN parkour community, Ingolstadt",
        "DSC00214": "PKIN parkour spot at Elisabethstraße, Ingolstadt",
        "DSC00298": "Parkour training spot, PKIN Ingolstadt",
        "DSC00299": "PKIN spot overview – Ingolstadt parkour location",
        "DSC00500": "Parkour spot details at PKIN Ingolstadt",
        "DSC00571": "PKIN freerunning spot, Ingolstadt",
        "DSC00752": "PKIN Ingolstadt training area",
        "DSC00783": "PKIN parkour spot, Elisabethstraße Ingolstadt"
    };

    const gifContainer = document.getElementById('gifContainer');
    const tourContainer = document.getElementById('tourContainer');
    const photoContainer = document.getElementById('photoContainer');
    const videoContainer = document.getElementById('videoContainer');

    // Helper: Inject GIF as looping MP4 video (much smaller than GIF)
    function injectVideo(container, baseName) {
        if (!container) return;
        const item = document.createElement('div');
        item.className = 'media-item';
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('aria-label', altText[baseName] || 'PKIN Parkour Ingolstadt');
        const source = document.createElement('source');
        source.src = `media/gifs/${baseName}.mp4`;
        source.type = 'video/mp4';
        video.appendChild(source);
        // Fallback to GIF if MP4 not supported
        video.onerror = () => {
            const img = document.createElement('img');
            img.src = `media/gifs/${baseName}.gif`;
            img.loading = 'lazy';
            img.alt = altText[baseName] || 'PKIN Parkour Ingolstadt';
            item.replaceChildren(img);
        };
        item.appendChild(video);
        container.appendChild(item);
    }

    // Helper: Inject image with WebP + JPEG fallback
    function injectMedia(container, baseName, dir) {
        if (!container) return;
        const item = document.createElement('div');
        item.className = 'media-item';
        const picture = document.createElement('picture');
        const sourceWebP = document.createElement('source');
        sourceWebP.srcset = `${dir}/${baseName}.webp`;
        sourceWebP.type = 'image/webp';
        const img = document.createElement('img');
        img.src = `${dir}/${baseName}.jpg`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = altText[baseName] || 'PKIN Parkour Ingolstadt';
        img.onerror = () => { item.style.display = 'none'; };
        picture.appendChild(sourceWebP);
        picture.appendChild(img);
        item.appendChild(picture);
        container.appendChild(item);
    }

    // Inject Media
    if (gifContainer) mediaFiles.gifs.forEach(name => injectVideo(gifContainer, name));
    if (tourContainer) mediaFiles.tours.forEach(name => injectMedia(tourContainer, name, 'media/tours'));
    if (photoContainer) mediaFiles.photos.forEach(name => injectMedia(photoContainer, name, 'media/photos'));

    // Inject Video Placeholders
    if (videoContainer) {
        for (let i = 1; i <= 3; i++) {
            const item = document.createElement('div');
            item.className = 'media-item placeholder';
            item.innerHTML = `<div class="no-media-box"><i class="fas fa-play-circle"></i><p>COMING SOON</p></div>`;
            videoContainer.appendChild(item);
        }
    }

    // --- MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinksContainer.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
            
            // Toggle icon between Hamburger and X
            mobileMenuBtn.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                body.classList.remove('no-scroll');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // --- CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            window.location.href = `mailto:kontakt@parkour-in.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        });
    }

    // --- SCROLL NAVBAR EFFECT ---
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});