document.addEventListener("DOMContentLoaded", () => {
    
    // --- DATA CONFIGURATION ---
    const mediaFiles = {
        gifs: ["ezgif-6bc09505ac6bd026.gif", "ezgif-60b77802565864ca.gif", "ezgif-234b50278fbf1ae2.gif", "ezgif-284bae8da57c65eb.gif", "ezgif-655a684fd9303cc1.gif", "ezgif-6211db7adb243664.gif", "ezgif-6ba8f5d2959c8e3e.gif"],
        photos: ["DSC00731.jpg", "DSC00746.jpg", "DSC00753.jpg", "DSC00769.jpg", "DSC00340.jpg", "DSC00398.jpg", "DSC00414.jpg", "DSC00480.jpg", "DSC00501.jpg", "DSC00527.jpg", "DSC00538.jpg", "DSC00568.jpg", "DSC00674.jpg"],
        tours: ["DSC00214.jpg", "DSC00298.jpg", "DSC00299.jpg", "DSC00500.jpg", "DSC00571.jpg", "DSC00752.jpg", "DSC00210.jpg"],
        videos: []
    };

    const gifContainer = document.getElementById('gifContainer');
    const tourContainer = document.getElementById('tourContainer');
    const photoContainer = document.getElementById('photoContainer');
    const videoContainer = document.getElementById('videoContainer');

    // Helper: Inject Media Item
    function injectMedia(container, path) {
        if (!container) return;
        const item = document.createElement('div');
        item.className = 'media-item';
        const img = document.createElement('img');
        img.src = path;
        img.loading = "lazy";
        img.onerror = () => { item.style.display = 'none'; };
        item.appendChild(img);
        container.appendChild(item);
    }

    // Inject Media
    if (gifContainer) mediaFiles.gifs.forEach(file => injectMedia(gifContainer, `media/gifs/${file}`));
    if (tourContainer) mediaFiles.tours.forEach(file => injectMedia(tourContainer, `media/tours/${file}`));
    if (photoContainer) mediaFiles.photos.forEach(file => injectMedia(photoContainer, `media/photos/${file}`));

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