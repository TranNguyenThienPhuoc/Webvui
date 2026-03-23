// ===== GLOBAL FUNCTION - Place at top to ensure it's available =====
window.openTimeCapsuleModal = function() {
    const modal = document.getElementById('timeCapsuleModal');
    if (!modal) {
        return;
    }
    
    // Force show modal with inline styles
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.classList.add('active');
    
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
};

// ===== FIREBASE CONFIGURATION =====
// Use IIFE to avoid "Cannot access 'FIREBASE_CONFIG' before initialization"
const FIREBASE_CONFIG = (function() {
    try {
        if (typeof process !== 'undefined' && process.env && process.env.FIREBASE_CONFIG)
            return process.env.FIREBASE_CONFIG;
    } catch (e) {}
    if (typeof window !== 'undefined' && window.FIREBASE_CONFIG_FROM_HTML)
        return window.FIREBASE_CONFIG_FROM_HTML;
    return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };
})();

// Initialize Firebase (will use demo mode if real config not provided)
let db = null;
let isFirebaseEnabled = false;

try {
    // Only initialize if Firebase is loaded
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.firestore();
        
        // Test connection
        
        // Enable debugging for Firestore
        if (window.location.hostname === 'localhost') {
            firebase.firestore.setLogLevel('debug');
        }
        
        isFirebaseEnabled = true;
        
        // Test Firebase connection
        testFirebaseConnection();
    } else {
    }
} catch (error) {
    isFirebaseEnabled = false;
}

// Test Firebase connection
async function testFirebaseConnection() {
    try {
        
        // Try to read from the collection (should work even if empty)
        const testQuery = await db.collection('timeCapsuleMessages').limit(1).get();
        
        return true;
    } catch (error) {
        
        isFirebaseEnabled = false;
        return false;
    }
}

// Party Configuration - Customize these details
const PARTY_CONFIG = {
    daughter: {
        name: "Thị Mỳ", // Change this to your daughter's name
        age: "6th" // Change this to the birthday age
    },
    details: {
        date: "Saturday, September 27, 2025",  // Party date
        time: "11:00 AM",                      // Party time
        location: "555 Johnson St, Victoria, BC", // Party location
        theme: "Dress in Your Own Style"     
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "party@example.com",
        address: "123 Birthday Street, Celebration City, ST 12345"
    }
};

// Initialize musical birthday song
function initializeBirthdaySong() {
    const playAllBtn = document.getElementById('playAllNotes');
    const noteButtons = document.querySelectorAll('.note-btn');
    
    if (!playAllBtn || noteButtons.length === 0) {
        return;
    }
    
    // Individual note button handlers
    noteButtons.forEach((btn, index) => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Đánh thức AudioContext ngay khi click
            console.log('Button clicked, state:', window.audioContext?.state);
            if (!window.audioContext) {
                window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('Created AudioContext, state:', window.audioContext.state);
            }
            if (window.audioContext.state === 'suspended') {
                console.log('Resuming AudioContext...');
                await window.audioContext.resume();
                console.log('After resume, state:', window.audioContext.state);
            }

            const frequency = parseFloat(btn.dataset.note);
            const duration = parseFloat(btn.dataset.duration) || 0.5;
            console.log('Playing:', frequency, 'Hz for', duration, 'seconds');
            
            // Hiệu ứng visual
            btn.style.transform = 'translateY(-2px) scale(1.02)';
            btn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--rose-500))';
            btn.style.color = 'white';
            
            // Gọi hàm phát âm thanh
            playTone(frequency, duration);
            
            setTimeout(() => {
                btn.style.transform = '';
                btn.style.background = '';
                btn.style.color = '';
            }, duration * 1000);
        });
    });
    
    // Play full song functionality
    let isPlayingFullSong = false;
    playAllBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Đánh thức AudioContext
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (window.audioContext.state === 'suspended') {
            await window.audioContext.resume();
        }
        
        if (isPlayingFullSong) {
            return;
        }
        
        isPlayingFullSong = true;
        playAllBtn.disabled = true;
        playAllBtn.style.opacity = '0.7';
        
        // Wait for audio context to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Define the full song sequence with timing
        const songSequence = [
            // Line 1: Happy Birthday to you
            { noteIndex: 0, delay: 0 },
            { noteIndex: 1, delay: 500 },
            { noteIndex: 2, delay: 800 },
            { noteIndex: 3, delay: 1600 },
            { noteIndex: 4, delay: 2400 },
            { noteIndex: 5, delay: 3200 },
            
            // Line 2: Happy Birthday to you  
            { noteIndex: 6, delay: 4400 },
            { noteIndex: 7, delay: 4900 },
            { noteIndex: 8, delay: 5200 },
            { noteIndex: 9, delay: 6000 },
            { noteIndex: 10, delay: 6800 },
            { noteIndex: 11, delay: 7600 },
            
            // Line 3: Happy Birthday dear Thị Mỳ
            { noteIndex: 12, delay: 8800 },
            { noteIndex: 13, delay: 9300 },
            { noteIndex: 14, delay: 10100 },
            { noteIndex: 15, delay: 10900 },
            { noteIndex: 16, delay: 11700 },
            { noteIndex: 17, delay: 12500 },
            
            // Line 4: Happy Birthday to you
            { noteIndex: 18, delay: 13700 },
            { noteIndex: 19, delay: 14200 },
            { noteIndex: 20, delay: 14500 },
            { noteIndex: 21, delay: 15300 },
            { noteIndex: 22, delay: 16100 },
            { noteIndex: 23, delay: 16900 }
        ];
        
        // Play each note in sequence
        songSequence.forEach(({ noteIndex, delay }) => {
            setTimeout(() => {
                if (noteButtons[noteIndex]) {
                    noteButtons[noteIndex].click();
                }
            }, delay);
        });
        
        // Reset play button after song completes
        setTimeout(() => {
            isPlayingFullSong = false;
            playAllBtn.disabled = false;
            playAllBtn.style.opacity = '1';
        }, 18400);
    });
    
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePartyDetails();
    initializeEventListeners();
    initializeBirthdaySong();
    initializeAnimations();
    initializeParallaxEffects();
    initializeCarousel();
    initializeInteractiveFeatures();
    
    // Add a delay to ensure all elements are rendered
    setTimeout(() => {
        initializeMagicalFeatures();
        
        // Add debug buttons for testing
    }, 100);
    
});

// Initialize party details on the page
function initializePartyDetails() {
    // Update daughter's name in hero section
    const nameElements = document.querySelectorAll('.name-highlight');
    nameElements.forEach(element => {
        element.textContent = PARTY_CONFIG.daughter.name;
    });

    // Update party details
    const detailElements = {
        'party-date': PARTY_CONFIG.details.date,
        'party-time': PARTY_CONFIG.details.time,
        'party-location': PARTY_CONFIG.details.location,
        'party-theme': PARTY_CONFIG.details.theme
    };

    Object.entries(detailElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });

    // Initialize party details animations
    initializePartyDetailsAnimations();
}

// Initialize party details animations
function initializePartyDetailsAnimations() {
    
    const detailCards = document.querySelectorAll('.detail-card');
    
    if (detailCards.length === 0) {
        return;
    }
    
    // Add entrance animations with staggered delays
    detailCards.forEach((card, index) => {
        // Add animation class with delay
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        card.style.transitionDelay = `${index * 0.15}s`;
        
        // Animate icon on hover
        const icon = card.querySelector('i');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.animation = 'icon-bounce 0.6s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.animation = '';
            });
        }
        
        // Add Google Maps integration for location card
        const locationText = card.querySelector('#party-location');
        if (locationText) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                openGoogleMaps();
                createMapClickEffect(card);
            });
            
            // Add visual indicator
            const mapIcon = card.querySelector('i');
            if (mapIcon && mapIcon.classList.contains('fa-map-marker-alt')) {
                const hint = document.createElement('div');
                hint.innerHTML = 'Click to open in Maps';
                hint.style.cssText = `
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-top: 0.5rem;
                    font-weight: 500;
                `;
                card.appendChild(hint);
            }
        }
    });
    
    // Trigger animations when section comes into view
    const partySection = document.querySelector('.party-details');
    if (partySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger card animations
                    detailCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                            
                            // Add sparkle effect
                            createPartySparkleEffect(card);
                        }, index * 150);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px'
        });
        
        observer.observe(partySection);
    }
    
}

// Create sparkle effect for party cards
function createPartySparkleEffect(card) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const rect = card.getBoundingClientRect();
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width * Math.random()}px;
                top: ${rect.top + rect.height * Math.random()}px;
                width: 8px;
                height: 8px;
                background: ${['fa-star', 'fa-star', 'fa-star'][Math.floor(Math.random() * 3)]};
                font-size: 8px;
                pointer-events: none;
                z-index: 1000;
                animation: party-sparkle-fade 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 100);
    }
}

// Open Google Maps with party location
function openGoogleMaps() {
    const location = PARTY_CONFIG.details.location;
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank');
    
    playTone(600, 0.2); // Play sound effect
}

// Create visual effect when clicking location card
function createMapClickEffect(card) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const mapEffect = document.createElement('div');
            const rect = card.getBoundingClientRect();
            
            mapEffect.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width * Math.random()}px;
                top: ${rect.top + rect.height * Math.random()}px;
                width: 12px;
                height: 12px;
                background: ${['fa-map', 'fa-map-marker-alt', 'fa-globe'][Math.floor(Math.random() * 3)]};
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                animation: map-click-effect 1.2s ease-out forwards;
            `;
            
            document.body.appendChild(mapEffect);
            setTimeout(() => mapEffect.remove(), 1200);
        }, i * 50);
    }
}

// Add CSS for party sparkle and map effects
if (!document.getElementById('party-effects-css')) {
    const style = document.createElement('style');
    style.id = 'party-effects-css';
    style.textContent = `
        @keyframes party-sparkle-fade {
            0% { 
                transform: scale(1) rotate(0deg); 
                opacity: 1; 
            }
            50% { 
                transform: scale(1.5) rotate(180deg); 
                opacity: 1; 
            }
            100% { 
                transform: scale(0) rotate(360deg) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
                opacity: 0; 
            }
        }
        
        @keyframes map-click-effect {
            0% { 
                transform: scale(1) rotate(0deg); 
                opacity: 1; 
            }
            50% { 
                transform: scale(2) rotate(180deg); 
                opacity: 0.8; 
            }
            100% { 
                transform: scale(0) rotate(360deg) translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize event listeners
function initializeEventListeners() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}


// Handle smooth scrolling
function handleSmoothScroll(e) {
    e.preventDefault();

    const href = this.getAttribute('href') || '';

    // Bỏ qua nếu chỉ là "#" (không trỏ tới section nào)
    if (href === '#' || href.trim() === '') {
        return;
    }

    // Nếu là dạng "#id" thì lấy phần id và dùng getElementById an toàn hơn
    let targetElement = null;
    if (href.startsWith('#')) {
        const id = href.slice(1);
        if (!id) return;
        targetElement = document.getElementById(id);
    } else {
        // Fallback: thử dùng như một selector nếu không bắt đầu bằng "#"
        try {
            targetElement = document.querySelector(href);
        } catch (err) {
            // Selector không hợp lệ -> bỏ qua để tránh lỗi
            return;
        }
    }

    if (targetElement) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Share party function
function shareParty() {
    const shareData = {
        title: `🎉 You're Invited to ${PARTY_CONFIG.daughter.name}'s Birthday Party!`,
        text: `Join us for ${PARTY_CONFIG.daughter.name}'s ${PARTY_CONFIG.daughter.age} birthday celebration on ${PARTY_CONFIG.details.date}!`,
        url: window.location.href
    };

    if (navigator.share) {
        // Use native sharing if available
        navigator.share(shareData).catch(err => {
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

// Fallback sharing method
function fallbackShare(data) {
    const shareText = `${data.text}\n\nRSVP at: ${data.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('🔗 Invitation link copied to clipboard!', 'success');
        }).catch(() => {
            showManualCopyDialog(shareText);
        });
    } else {
        showManualCopyDialog(shareText);
    }
}

// Show manual copy dialog
function showManualCopyDialog(text) {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; margin: 1rem;">
                <h3 style="margin-bottom: 1rem; color: #2d3748;"> Copy Invitation Text</h3>
                <textarea readonly style="width: 100%; height: 150px; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; resize: none;">${text}</textarea>
                <div style="margin-top: 1rem; text-align: right;">
                    <button onclick="this.closest('div').parentElement.remove()" style="background: #ff6b9d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


// Countdown timer (optional feature)
function initializeCountdown() {
    const partyDate = new Date(PARTY_CONFIG.details.date);
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;

    function updateCountdown() {
        const now = new Date();
        const timeDiff = partyDate - now;
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<h3><i class="fas fa-gift"></i> The party is today! <i class="fas fa-gift"></i></h3>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Initialize party configuration customization
function initializeCustomization() {
    // This function can be extended to allow real-time customization
    // For now, it just logs the current configuration
    
    // In a real application, you might want to:
    // 1. Load configuration from a database
    // 2. Allow admin panel customization
    // 3. Support multiple party templates
    // 4. Enable theme switching
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service (Google Analytics, etc.)
    
    // Example Google Analytics tracking:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track important events
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_loaded', { page: 'birthday_landing' });
    
    // Track navigation clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', { target: this.getAttribute('href') });
        });
    });
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'party-date',
        'party-time',
        'party-location',
        'party-theme',
        'carouselTrack'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
    }
}

// Call error handling on load
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Parallax Effects
function initializeParallaxEffects() {
    let ticking = false;
    
    // Get all parallax elements
    const parallaxElements = document.querySelectorAll('[data-speed]');
    const parallaxContainer = document.querySelector('.parallax-container');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = element.offsetHeight;
            
            // Check if element is in viewport area (with buffer)
            const buffer = windowHeight * 0.5;
            if (elementTop < scrollTop + windowHeight + buffer && 
                elementTop + elementHeight > scrollTop - buffer) {
                
                // Calculate parallax offset
                const yPos = -(scrollTop * speed);
                const xPos = Math.sin(scrollTop * 0.001) * 10; // Subtle horizontal movement
                
                // Apply transform with 3D acceleration
                element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
                element.style.opacity = '1';
            }
        });
        
        // Update main parallax container position
        if (parallaxContainer) {
            const containerSpeed = 0.3;
            const containerY = -(scrollTop * containerSpeed);
            parallaxContainer.style.transform = `translate3d(0, ${containerY}px, 0)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateParallax();
    
    // Add dynamic floating elements based on scroll
    addDynamicFloatingElements();
}

function addDynamicFloatingElements() {
    const dynamicElements = [];
    const icons = ['fa-circle', 'fa-star', 'fa-gift', 'fa-heart', 'fa-star', 'fa-gift', 'fa-gift', 'fa-birthday-cake'];
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'dynamic-float';
        
        // Use Font Awesome icon
        const iconClass = icons[Math.floor(Math.random() * icons.length)];
        const icon = document.createElement('i');
        icon.className = 'fas ' + iconClass;
        element.appendChild(icon);
        
        element.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.6 + 0.2};
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: float-up ${Math.random() * 10 + 15}s linear infinite;
        `;
        
        document.body.appendChild(element);
        dynamicElements.push(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
                const index = dynamicElements.indexOf(element);
                if (index > -1) {
                    dynamicElements.splice(index, 1);
                }
            }
        }, 25000);
    }
    
    // Create floating elements periodically
    function createElements() {
        if (dynamicElements.length < 6) {
            createFloatingElement();
        }
    }
    
    // Create initial elements and set interval
    setInterval(createElements, 3000);
    
    // Create some initial elements
    for (let i = 0; i < 3; i++) {
        setTimeout(createFloatingElement, i * 1000);
    }
}

// Enhanced scroll-based animations for cards
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Mouse parallax effect for hero section
function initializeMouseParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });
    
    function animateMouseParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        const floatingElements = hero.querySelectorAll('.birthday-decorations i');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = currentX * speed * 20;
            const y = currentY * speed * 20;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateMouseParallax);
    }
    
    animateMouseParallax();
}

// Add CSS for dynamic floating elements
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .dynamic-float {
            will-change: transform;
            backface-visibility: hidden;
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Performance optimizations */
        .parallax-container,
        .floating-element,
        .section-float,
        .rsvp-float {
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .floating-element,
            .section-float,
            .rsvp-float,
            .dynamic-float {
                animation: none !important;
                transform: none !important;
            }
            
            .parallax-container {
                transform: none !important;
            }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .floating-element {
                font-size: 1.5rem;
            }
            
            .section-float,
            .rsvp-float {
                font-size: 2rem;
            }
            
            .confetti-1, .confetti-2, .confetti-3, .confetti-4,
            .confetti-5, .confetti-6, .confetti-7, .confetti-8 {
                display: none; /* Hide confetti on mobile for performance */
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced animations
function initializeAnimations() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mouse parallax
    initializeMouseParallax();
    
    // Add dynamic styles
    addDynamicStyles();
    
    // Original intersection observer for basic elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that weren't caught by other observers
    const basicElements = document.querySelectorAll('.special-notes:not(.animate-in)');
    basicElements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// Image Carousel Functionality
function initializeCarousel() {
    const carousel = {
        track: document.getElementById('carouselTrack'),
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        fullscreenBtn: document.getElementById('fullscreenBtn'),
        currentSlide: 0,
        isPlaying: true,
        autoPlayInterval: null,
        touchStartX: 0,
        touchEndX: 0
    };

    // Return early if carousel elements don't exist
    if (!carousel.track || !carousel.slides.length) {
        return;
    }

    // Initialize carousel
    startAutoPlay();
    addEventListeners();
    addTouchSupport();
    addKeyboardSupport();
    preloadImages();

    // Auto-play functionality
    function startAutoPlay() {
        if (carousel.autoPlayInterval) {
            clearInterval(carousel.autoPlayInterval);
        }
        
        carousel.autoPlayInterval = setInterval(() => {
            if (carousel.isPlaying) {
                nextSlide();
            }
        }, 4000); // Change slide every 4 seconds
    }

    function stopAutoPlay() {
        if (carousel.autoPlayInterval) {
            clearInterval(carousel.autoPlayInterval);
            carousel.autoPlayInterval = null;
        }
    }

    function toggleAutoPlay() {
        carousel.isPlaying = !carousel.isPlaying;
        const icon = carousel.playPauseBtn.querySelector('i');
        
        if (carousel.isPlaying) {
            icon.className = 'fas fa-pause';
            startAutoPlay();
        } else {
            icon.className = 'fas fa-play';
            stopAutoPlay();
        }
    }

    // Navigation functions
    function goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        carousel.slides[carousel.currentSlide].classList.remove('active');
        carousel.indicators[carousel.currentSlide].classList.remove('active');
        
        // Update current slide index
        carousel.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        carousel.slides[carousel.currentSlide].classList.add('active');
        carousel.indicators[carousel.currentSlide].classList.add('active');
        
        // Move carousel track
        const translateX = -carousel.currentSlide * 10; // 10% per slide
        carousel.track.style.transform = `translateX(${translateX}%)`;
        
        // Track event
        trackEvent('carousel_slide_change', { 
            slide_index: carousel.currentSlide,
            slide_name: carousel.slides[carousel.currentSlide].querySelector('img').alt
        });
    }

    function nextSlide() {
        const nextIndex = (carousel.currentSlide + 1) % carousel.slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (carousel.currentSlide - 1 + carousel.slides.length) % carousel.slides.length;
        goToSlide(prevIndex);
    }

    // Event listeners
    function addEventListeners() {
        // Navigation buttons
        carousel.nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        carousel.prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Indicators
        carousel.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });

        // Play/Pause button
        carousel.playPauseBtn.addEventListener('click', toggleAutoPlay);

        // Fullscreen button
        carousel.fullscreenBtn.addEventListener('click', openFullscreen);

        // Pause on hover
        carousel.track.addEventListener('mouseenter', () => {
            if (carousel.isPlaying) {
                stopAutoPlay();
            }
        });

        carousel.track.addEventListener('mouseleave', () => {
            if (carousel.isPlaying) {
                startAutoPlay();
            }
        });

        // Image click for fullscreen
        carousel.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('click', openFullscreen);
                img.style.cursor = 'pointer';
            }
        });
    }

    function resetAutoPlay() {
        if (carousel.isPlaying) {
            startAutoPlay();
        }
    }

    // Touch/Swipe support
    function addTouchSupport() {
        carousel.track.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.track.addEventListener('touchend', handleTouchEnd, { passive: true });
        carousel.track.addEventListener('touchmove', handleTouchMove, { passive: true });

        function handleTouchStart(e) {
            carousel.touchStartX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            if (!carousel.touchStartX) return;
            
            carousel.touchEndX = e.touches[0].clientX;
            const diff = carousel.touchStartX - carousel.touchEndX;
            
            // Add visual feedback during swipe
            const opacity = Math.min(Math.abs(diff) / 100, 0.3);
            if (diff > 0) {
                // Swiping left (next)
                carousel.nextBtn.style.backgroundColor = `rgba(255, 107, 157, ${opacity})`;
            } else {
                // Swiping right (prev)
                carousel.prevBtn.style.backgroundColor = `rgba(255, 107, 157, ${opacity})`;
            }
        }

        function handleTouchEnd(e) {
            if (!carousel.touchStartX || !carousel.touchEndX) return;
            
            const diff = carousel.touchStartX - carousel.touchEndX;
            const threshold = 50; // Minimum swipe distance
            
            // Reset button styles
            carousel.nextBtn.style.backgroundColor = '';
            carousel.prevBtn.style.backgroundColor = '';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped left (next)
                    nextSlide();
                } else {
                    // Swiped right (prev)
                    prevSlide();
                }
                resetAutoPlay();
            }
            
            carousel.touchStartX = 0;
            carousel.touchEndX = 0;
        }
    }

    // Keyboard support
    function addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Only handle keys when carousel is in view
            const carouselRect = carousel.track.getBoundingClientRect();
            const isVisible = carouselRect.top < window.innerHeight && carouselRect.bottom > 0;
            
            if (!isVisible) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    resetAutoPlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    resetAutoPlay();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
                case 'f':
                case 'F':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        openFullscreen();
                    }
                    break;
            }
        });
    }

    // Preload images for better performance
    function preloadImages() {
        carousel.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img && !img.complete) {
                img.addEventListener('load', () => {
                    slide.classList.add('loaded');
                });
                
                img.addEventListener('error', () => {
                    slide.classList.add('error');
                });
            } else if (img && img.complete) {
                slide.classList.add('loaded');
            }
        });
    }

    // Fullscreen functionality
    function openFullscreen() {
        const currentImg = carousel.slides[carousel.currentSlide].querySelector('img');
        if (!currentImg) return;

        // Create fullscreen modal
        const modal = document.createElement('div');
        modal.className = 'fullscreen-modal active';
        
        const img = document.createElement('img');
        img.src = currentImg.src;
        img.alt = currentImg.alt;
        img.className = 'fullscreen-image';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close fullscreen');
        
        modal.appendChild(img);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Close functionality
        function closeFullscreen() {
            modal.remove();
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeFullscreen);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeFullscreen();
            }
        });
        
        // Keyboard close
        function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
                document.removeEventListener('keydown', handleKeydown);
            }
        }
        document.addEventListener('keydown', handleKeydown);
        
        // Track event
        trackEvent('image_fullscreen_opened', { 
            image_src: currentImg.src,
            slide_index: carousel.currentSlide
        });
    }

    // Intersection Observer for pause when out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (carousel.isPlaying && !carousel.autoPlayInterval) {
                    startAutoPlay();
                }
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(carousel.track);

    // Update navigation menu to include gallery
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !navMenu.querySelector('a[href="#memories-section"]')) {
        const galleryItem = document.createElement('li');
        galleryItem.innerHTML = '<a href="#memories-section">Gallery</a>';
        // Insert before RSVP
        const rsvpItem = navMenu.querySelector('a[href="#rsvp"]')?.parentElement;
        if (rsvpItem) {
            navMenu.insertBefore(galleryItem, rsvpItem);
        } else {
            navMenu.appendChild(galleryItem);
        }
    }

    // Return carousel object for external access
    return carousel;
}

// Enhanced scroll animations to include gallery
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                
                // Special handling for carousel
                if (entry.target.classList.contains('carousel-container')) {
                    entry.target.style.animation = 'slideInUp 1s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations including carousel
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes, .carousel-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Interactive Features for Baby's First Birthday
function initializeInteractiveFeatures() {
    initializeSpectacularHeroEntrance();
    initializeBabyDragon();
    initializeAsianElements();
    initializeFloatingToys();
    initializeBalloonGame();
    initializeInteractiveCake();
    initializeMouseSparkles();
    initializeMilestoneAnimations();
    initializeDragonZodiacSection();
    addInteractiveSounds();
}

// Spectacular Hero Entrance Effects
function initializeSpectacularHeroEntrance() {
    // Create immediate fireworks on load
    createHeroFireworks();
    
    // Create entrance particles
    setTimeout(() => {
        createHeroEntranceParticles();
    }, 500);
    
    // Add interactive announcement card
    const announcementCard = document.querySelector('.announcement-card');
    if (announcementCard) {
        announcementCard.addEventListener('click', function() {
            createAnnouncementCelebration(this);
            playDragonSound(3);
        });
    }
    
    // Add sparkle effects to buttons
    const spectacularBtns = document.querySelectorAll('.spectacular-btn');
    spectacularBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createButtonSparkles(this);
        });
    });
    
    // Trigger balloon reduction game update
    updateBalloonGame();
}

function createHeroFireworks() {
    const fireworksContainer = document.getElementById('heroFireworks');
    if (!fireworksContainer) return;
    
    // Create 5 firework bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);
            createFireworkBurst(x, y, fireworksContainer);
        }, i * 300);
    }
}

function createFireworkBurst(x, y, container) {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea', '#ff6b6b'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        container.appendChild(particle);
        
        let currentX = x;
        let currentY = y;
        let currentVy = vy;
        const gravity = 300; // pixels per second squared
        const startTime = Date.now();
        
        function animateParticle() {
            const elapsed = (Date.now() - startTime) / 1000;
            currentX += vx * 0.016;
            currentVy += gravity * 0.016;
            currentY += currentVy * 0.016;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = Math.max(0, 1 - elapsed / 2);
            
            if (elapsed < 2 && particle.style.opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
    
    // Play firework sound
    playSound('celebration');
}

function createHeroEntranceParticles() {
    const particlesContainer = document.getElementById('heroEntranceParticles');
    if (!particlesContainer) return;
    
    const particleIcons = ['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-gift', 'fa-gift'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.fontSize = (1 + Math.random() * 2) + 'rem';
            particle.style.pointerEvents = 'none';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.animation = 'magical-particle-rise 4s ease-out forwards';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }, i * 200);
    }
}

function createAnnouncementCelebration(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create dragon celebration
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particleIcon = ['fa-star', 'fa-crown', 'fa-star', 'fa-star', 'fa-gift'][Math.floor(Math.random() * 5)];
            createParticle(centerX, centerY, particleIcon);
        }, i * 100);
    }
    
    showFloatingText('<i class="fas fa-star"></i><i class="fas fa-star"></i> DRAGON BOY! <i class="fas fa-star"></i><i class="fas fa-star"></i>', centerX, centerY - 100, '#ffd700');
    
    // Add special sparkle burst
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            createParticle(centerX, centerY, 'fa-gem');
        }
    }, 800);
}

function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.textContent = '✦';
            sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
}

function updateBalloonGame() {
    // Update balloon game to work with reduced balloons
    const balloons = document.querySelectorAll('.game-balloon');
    let score = 0;
    
    balloons.forEach(balloon => {
        // Remove old event listeners and add new ones
        const newBalloon = balloon.cloneNode(true);
        balloon.parentNode.replaceChild(newBalloon, balloon);
        
        newBalloon.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            popBalloon(this, color);
            score++;
            
            if (score === 3) { // Changed from 5 to 3
                showBalloonGameComplete();
                setTimeout(() => {
                    respawnBalloons();
                    score = 0;
                }, 3000);
            }
        });
    });
}

// Baby Dragon Interaction
function initializeBabyDragon() {
    const dragon = document.getElementById('babyDragon');
    if (!dragon) return;
    
    let dragonClicks = 0;
    
    dragon.addEventListener('click', function() {
        dragonClicks++;
        createDragonMagic(this);
        playDragonSound(dragonClicks);
        
        // Special celebration every 3 clicks
        if (dragonClicks % 3 === 0) {
            createDragonCelebration(this);
        }
        
        // Add celebration effect
        this.style.animation = 'dragon-celebrate 1s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
    });
    
    dragon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(15deg)';
        this.style.filter = 'drop-shadow(0 15px 35px rgba(255,215,0,0.6))';
        playDragonSound(0); // Gentle hover sound
    });
    
    dragon.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.filter = '';
    });
    
    // Make dragon follow mouse slightly
    document.addEventListener('mousemove', function(e) {
        if (!dragon) return;
        const rect = dragon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = (mouseX - centerX) * 0.05;
        const deltaY = (mouseY - centerY) * 0.05;
        
        dragon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
}

function createDragonMagic(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create dragon fire particles
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, getDragonParticle());
        }, i * 50);
    }
    
    // Show dragon message
    showFloatingText('<i class="fas fa-dragon"></i> Little Dragon Magic! <i class="fas fa-dragon"></i>', centerX, centerY - 80, '#ffd700');
}

function createDragonCelebration(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create rainbow dragon celebration
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea', '#ff6b6b'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createColoredParticle(centerX, centerY, 'fa-rainbow', colors[i % colors.length]);
        }, i * 100);
    }
    
    showFloatingText('<i class="fas fa-star"></i><i class="fas fa-crown"></i> DRAGON POWER! <i class="fas fa-crown"></i><i class="fas fa-star"></i>', centerX, centerY - 120, '#ff6b9d');
    playSound('celebration');
}

function getDragonParticle() {
    const dragonParticles = ['fa-fire', 'fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-gem', 'fa-lantern', 'fa-star'];
    return particles[Math.floor(Math.random() * particles.length)];
}

// Asian Cultural Elements Interaction
function initializeAsianElements() {
    initializeLanterns();
    initializeCherryBlossoms();
    initializeCoins();
    initializeFans();
}

function initializeLanterns() {
    const lanterns = document.querySelectorAll('.floating-lantern');
    
    lanterns.forEach(lantern => {
        lantern.addEventListener('click', function() {
            createLanternWish(this);
            playAsianSound('lantern');
        });
    });
}

function initializeCherryBlossoms() {
    const blossoms = document.querySelectorAll('.cherry-blossoms');
    
    blossoms.forEach(blossom => {
        blossom.addEventListener('click', function() {
            createBlossomShower(this);
            playAsianSound('blossom');
        });
    });
}

function initializeCoins() {
    const coins = document.querySelectorAll('.floating-coin');
    
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            createGoldenBurst(this);
            playAsianSound('coin');
        });
    });
}

function initializeFans() {
    const fans = document.querySelectorAll('.floating-fan');
    
    fans.forEach(fan => {
        fan.addEventListener('click', function() {
            createFanBreeze(this);
            playAsianSound('fan');
        });
    });
}

function createLanternWish(lantern) {
    const rect = lantern.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, 'fa-leaf');
    }
    
    showFloatingText('<i class="fas fa-lantern"></i> Good Fortune! <i class="fas fa-lantern"></i>', centerX, centerY - 60, '#ff0000');
}

function createBlossomShower(blossom) {
    const rect = blossom.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'fa-spa');
        }, i * 100);
    }
    
    showFloatingText('<i class="fas fa-heart"></i> Beauty & Growth! <i class="fas fa-heart"></i>', centerX, centerY - 60, '#ffb6c1');
}

function createGoldenBurst(coin) {
    const rect = coin.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        createParticle(centerX, centerY, ['fa-coins', 'fa-coins', 'fa-star'][Math.floor(Math.random() * 3)]);
    }
    
    showFloatingText('<i class="fas fa-coins"></i> Prosperity! <i class="fas fa-coins"></i>', centerX, centerY - 60, '#ffd700');
}

function createFanBreeze(fan) {
    const rect = fan.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['fa-wind', 'fa-heart', 'fa-leaf'][Math.floor(Math.random() * 3)]);
        }, i * 150);
    }
    
    showFloatingText('<i class="fas fa-heart"></i> Gentle Breeze! <i class="fas fa-heart"></i>', centerX, centerY - 60, '#ff69b4');
}

// Dragon Zodiac Section Interactions
function initializeDragonZodiacSection() {
    const zodiacCards = document.querySelectorAll('.element-card');
    const dragonCard = document.querySelector('.dragon-year-card');
    const zodiacDragon = document.querySelector('.zodiac-dragon');
    
    // Zodiac dragon interaction
    if (zodiacDragon) {
        zodiacDragon.addEventListener('click', function() {
            createZodiacCelebration(this);
            playDragonSound(5); // Special zodiac sound
        });
    }
    
    // Element cards interaction
    zodiacCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.className.includes('lantern') ? 'lantern' :
                            this.className.includes('blossom') ? 'blossom' : 'coin';
            createElementCelebration(this, cardType);
            playAsianSound(cardType);
        });
    });
    
    // Dragon card special interaction
    if (dragonCard) {
        dragonCard.addEventListener('click', function() {
            createDragonYearCelebration(this);
            playSound('celebration');
        });
    }
    
    // Dragon stats interaction
    const dragonStats = document.querySelectorAll('.dragon-stat');
    dragonStats.forEach(stat => {
        stat.addEventListener('click', function() {
            createDragonStatCelebration(this);
            playDragonSound(Math.floor(Math.random() * 5));
        });
    });
}

function createZodiacCelebration(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create zodiac power burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['fa-star', 'fa-bolt', 'fa-fire', 'fa-star', 'fa-star'][Math.floor(Math.random() * 5)]);
        }, i * 75);
    }
    
    showFloatingText('<i class="fas fa-star"></i><i class="fas fa-star"></i> YEAR OF THE DRAGON! <i class="fas fa-star"></i><i class="fas fa-star"></i>', centerX, centerY - 100, '#ffd700');
}

function createElementCelebration(card, type) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const lanternParticles = ['fa-lantern', 'fa-star', 'fa-leaf'];
        const blossomParticles = ['fa-spa', 'fa-heart', 'fa-palette'];
        const coinParticles = ['fa-coins', 'fa-coins', 'fa-gem'];
    };
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, particles[type][Math.floor(Math.random() * 3)]);
    }

function createDragonYearCelebration(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Rainbow dragon year celebration
    const dragonElements = ['fa-dragon', 'fa-dragon', 'fa-fire', 'fa-bolt', 'fa-rainbow', 'fa-star', 'fa-star', 'fa-star'];
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, dragonElements[Math.floor(Math.random() * dragonElements.length)]);
        }, i * 100);
    }
    
    showFloatingText('<i class="fas fa-gift"></i> BORN IN THE YEAR OF THE DRAGON! <i class="fas fa-gift"></i>', centerX, centerY - 150, '#ff6b9d');
}

// Floating Toys Interaction
function initializeFloatingToys() {
    const toys = document.querySelectorAll('.floating-toy');
    
    toys.forEach(toy => {
        toy.addEventListener('click', function() {
            const toyType = this.getAttribute('data-toy');
            createToyInteraction(this, toyType);
            playToySound(toyType);
            
            // Add celebration effect
            this.style.animation = 'toy-bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        toy.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 10px 25px rgba(0,0,0,0.3))';
        });
        
        toy.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    });
}

function createToyInteraction(toy, toyType) {
    const rect = toy.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particle effect
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, getToyParticle(toyType));
    }
    
    // Show toy message
    showToyMessage(toyType, centerX, centerY);
}

function getToyParticle(toyType) {
    const particles = {
        bear: ['fa-heart', 'fa-heart', 'fa-heart'],
        blocks: ['fa-puzzle-piece', 'fa-gem', 'fa-gem'],
        rattle: ['fa-music', 'fa-music', 'fa-music'],
        bottle: ['fa-baby', 'fa-heart', 'fa-female'],
        duck: ['fa-water', 'fa-droplet', 'fa-water'],
        pacifier: ['fa-candy-cane', 'fa-moon', 'fa-moon']
    };
    const options = particles[toyType] || ['fa-star', 'fa-star', 'fa-star'];
    return options[Math.floor(Math.random() * options.length)];
}

// Balloon Popping Game
function initializeBalloonGame() {
    const balloons = document.querySelectorAll('.game-balloon');
    let score = 0;
    
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            popBalloon(this, color);
            score++;
            
            if (score === 5) {
                showBalloonGameComplete();
                setTimeout(() => {
                    respawnBalloons();
                    score = 0;
                }, 3000);
            }
        });
    });
}

function popBalloon(balloon, color) {
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Pop animation
    balloon.style.animation = 'balloon-pop 0.3s ease-out forwards';
    balloon.style.transform = 'scale(0)';
    
    // Create pop particles
    for (let i = 0; i < 12; i++) {
        createParticle(centerX, centerY, 'fa-gift');
    }
    
    // Play pop sound
    playSound('pop');
    
    // Show points
    showFloatingText('+10', centerX, centerY - 50, '#ff6b9d');
    
    // Hide balloon temporarily
    setTimeout(() => {
        balloon.style.display = 'none';
    }, 300);
}

function respawnBalloons() {
    const balloons = document.querySelectorAll('.game-balloon');
    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            balloon.style.display = 'block';
            balloon.style.transform = '';
            balloon.style.animation = '';
        }, index * 200);
    });
}

// Interactive Birthday Cake
function initializeInteractiveCake() {
    const cake = document.getElementById('interactiveCake');
    if (!cake) return; // Exit if cake element doesn't exist
    
    const candles = document.querySelectorAll('.candle');
    let candlesLit = candles.length;
    
    cake.addEventListener('click', function() {
        if (candlesLit > 0) {
            blowOutCandles();
        } else {
            relightCandles();
        }
    });
}

function blowOutCandles() {
    const candles = document.querySelectorAll('.candle');
    const particles = document.getElementById('wishParticles');
    
    candles.forEach((candle, index) => {
        setTimeout(() => {
            const flame = candle.querySelector('.flame');
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
            
            // Create smoke effect
            createSmokeEffect(candle);
        }, index * 100);
    });
    
    // Show wish particles
    setTimeout(() => {
        createWishEffect();
        showFloatingText('<i class="fas fa-star"></i> Make a wish! <i class="fas fa-star"></i>', window.innerWidth / 2, window.innerHeight / 2, '#ffd93d');
        playSound('wish');
    }, 500);
    
    // Update instruction
    const instruction = document.querySelector('.cake-instruction p');
    instruction.textContent = '<i class="fas fa-star"></i> Wish made! Click to relight! <i class="fas fa-star"></i>';
}

function relightCandles() {
    const candles = document.querySelectorAll('.candle');
    
    candles.forEach((candle, index) => {
        setTimeout(() => {
            const flame = candle.querySelector('.flame');
            flame.style.opacity = '1';
            flame.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    const instruction = document.querySelector('.cake-instruction p');
    instruction.textContent = '<i class="fas fa-wind"></i> Click to blow out the candle! <i class="fas fa-wind"></i>';
    
    playSound('light');
}

// Mouse Sparkle Trail
function initializeMouseSparkles() {
    const sparkleTrail = document.querySelector('.sparkle-trail');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create sparkle every few pixels
        if (Math.random() > 0.8) {
            createSparkle(mouseX, mouseY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = ['fa-star', 'fa-star', 'fa-star', 'fa-star'][Math.floor(Math.random() * 4)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkleTrail.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Milestone Animations
function initializeMilestoneAnimations() {
    const milestones = document.querySelectorAll('.milestone-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const milestone = entry.target;
                const milestoneType = milestone.getAttribute('data-milestone');
                
                // Add special animation
                milestone.style.animation = 'milestone-celebrate 1s ease-out';
                
                // Create celebration effect
                if (milestoneType === 'birthday') {
                    setTimeout(() => {
                        createBirthdayExplosion(milestone);
                    }, 500);
                }
                
                // Add floating particles
                createMilestoneParticles(milestone);
            }
        });
    }, { threshold: 0.5 });
    
    milestones.forEach(milestone => {
        observer.observe(milestone);
        
        milestone.addEventListener('click', function() {
            const milestoneType = this.getAttribute('data-milestone');
            createMilestoneInteraction(this, milestoneType);
        });
    });
    
    // Add birth stats interactivity
    const birthStats = document.querySelectorAll('.stat');
    birthStats.forEach(stat => {
        stat.addEventListener('click', function() {
            createBirthStatCelebration(this);
            playSound('celebration');
        });
    });
}

// Helper Functions
function createParticle(x, y, iconClass) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    // Check if iconClass is a Font Awesome class or emoji
    if (iconClass.startsWith('fa-')) {
        const icon = document.createElement('i');
        icon.className = 'fas ' + iconClass;
        particle.appendChild(icon);
    } else {
        particle.textContent = iconClass;
    }
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(particle);
    
    function animate() {
        x += vx;
        y += vy;
        vy += gravity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.max(0, 1 - y / window.innerHeight);
        
        if (y < window.innerHeight && parseFloat(particle.style.opacity) > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

function showFloatingText(text, x, y, color = '#ff6b9d') {
    const textElement = document.createElement('div');
    textElement.style.position = 'fixed';
    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.color = color;
    textElement.style.fontSize = '2rem';
    textElement.style.fontWeight = 'bold';
    textElement.style.pointerEvents = 'none';
    textElement.style.zIndex = '9999';
    textElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    textElement.textContent = text;
    textElement.style.animation = 'float-up-fade 2s ease-out forwards';
    
    document.body.appendChild(textElement);
    
    setTimeout(() => {
        textElement.remove();
    }, 2000);
}

function createWishEffect() {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = (window.innerWidth / 2) + 'px';
            particle.style.top = (window.innerHeight / 2) + 'px';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            particle.style.animation = `wish-particle 2s ease-out forwards`;
            particle.style.setProperty('--target-x', targetX + 'px');
            particle.style.setProperty('--target-y', targetY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
}

// Sound Effects (Web Audio API)
function addInteractiveSounds() {
    // Khởi tạo AudioContext nếu chưa có
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume nếu đang suspended
    if (window.audioContext.state === 'suspended') {
        window.audioContext.resume();
    }
    
    // Sound library
    window.sounds = {
        toy: () => playTone(523.25, 0.1), // C5
        pop: () => playTone(659.25, 0.05), // E5
        wish: () => playTone(783.99, 0.2), // G5
        light: () => playTone(440, 0.1), // A4
        celebration: () => playCelebrationChord()
    };
}

function playSound(soundName) {
    if (window.sounds && window.sounds[soundName]) {
        window.sounds[soundName]();
    }
}

function playTone(frequency, duration) {
    console.log('playTone called with:', frequency, duration);
    
    // Khởi tạo AudioContext nếu chưa có
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Created AudioContext in playTone');
    }
    
    // Bắt buộc resume nếu đang bị treo (đây là mấu chốt)
    if (window.audioContext.state === 'suspended') {
        console.log('Resuming suspended AudioContext...');
        window.audioContext.resume();
    }
    
    console.log('AudioContext state:', window.audioContext.state);
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + duration);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + duration);
    
    console.log('Oscillator started');
}

function playToySound(toyType) {
    playSound('toy');
}

function playDragonSound(clickCount) {
    // Different dragon sounds based on interaction
    const frequencies = [523.25, 659.25, 783.99, 987.77, 1174.66]; // C5, E5, G5, B5, D6
    const frequency = frequencies[clickCount % frequencies.length];
    playTone(frequency, 0.2);
}

function playAsianSound(elementType) {
    const sounds = {
        lantern: 880,    // A5 - warm, glowing
        blossom: 1174.66, // D6 - light, delicate  
        coin: 698.46,    // F5 - metallic, prosperity
        fan: 1046.50     // C6 - airy, gentle
    };
    playTone(sounds[elementType] || 440, 0.15);
}

function createColoredParticle(x, y, iconClass, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.color = color;
    
    // Check if iconClass is a Font Awesome class or emoji
    if (iconClass.startsWith('fa-')) {
        const icon = document.createElement('i');
        icon.className = 'fas ' + iconClass;
        particle.appendChild(icon);
    } else {
        particle.textContent = iconClass;
    }
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(particle);
    
    function animate() {
        x += vx;
        y += vy;
        vy += gravity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.max(0, 1 - y / window.innerHeight);
        
        if (y < window.innerHeight && parseFloat(particle.style.opacity) > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Missing helper functions
function showToyMessage(toyType, x, y) {
    const messages = {
        bear: 'Teddy Bear Hugs! <i class="fas fa-heart"></i>',
        blocks: 'Building Fun! <i class="fas fa-puzzle-piece"></i>',
        rattle: 'Shake It! <i class="fas fa-music"></i>',
        bottle: 'Feeding Time! 🍼',
        duck: 'Rubber Ducky! <i class="fas fa-water"></i>',
        pacifier: 'Sweet Dreams! <i class="fas fa-moon"></i>'
    };
    showFloatingText(messages[toyType] || 'So Fun!', x, y - 50, '#ff6b9d');
}

function showBalloonGameComplete() {
    showFloatingText('<i class="fas fa-gift"></i> All Balloons Popped! <i class="fas fa-gift"></i>', window.innerWidth / 2, window.innerHeight / 2, '#ffd93d');
    playSound('celebration');
}

function createSmokeEffect(candle) {
    const rect = candle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(x, y, 'fa-wind');
        }, i * 100);
    }
}

function createBirthdayExplosion(milestone) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        createParticle(centerX, centerY, ['fa-gift', 'fa-gift', 'fa-star', 'fa-star'][Math.floor(Math.random() * 4)]);
    }
    
    playSound('celebration');
}

function createMilestoneParticles(milestone) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['fa-star', 'fa-star', 'fa-star'][Math.floor(Math.random() * 3)]);
        }, i * 200);
    }
}

function createMilestoneInteraction(milestone, milestoneType) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const messages = {
        birth: 'Hello World! <i class="fas fa-baby"></i>',
        smile: 'First Smile! <i class="fas fa-face-smile"></i>',
        laugh: 'Giggles! <i class="fas fa-face-laugh"></i>',
        rollover: 'Rolling! <i class="fas fa-person-falling"></i>',
        sitting: 'Sitting Up! <i class="fas fa-chair"></i>',
        crawling: 'Crawling! <i class="fas fa-baby"></i>',
        walking: 'First Steps! <i class="fas fa-person-walking"></i>',
        birthday: 'Happy 6th Birthday! <i class="fas fa-gift"></i>'
    };
    
    showFloatingText(messages[milestoneType] || 'Milestone!', centerX, centerY - 100, '#6bcf7f');
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, 'fa-star');
    }
}

function playCelebrationChord() {
    // Play a happy chord
    playTone(523.25, 0.3); // C5
    setTimeout(() => playTone(659.25, 0.3), 50); // E5
    setTimeout(() => playTone(783.99, 0.3), 100); // G5
}

function createBirthStatCelebration(stat) {
    const rect = stat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Determine if it's weight or height stat
    const isWeight = stat.querySelector('.stat-text').textContent.includes('kg');
    const isHeight = stat.querySelector('.stat-text').textContent.includes('cm');
    
    if (isWeight) {
        // Weight celebration - golden particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['fa-balance-scale', 'fa-heart', 'fa-baby', 'fa-star', 'fa-star'][Math.floor(Math.random() * 5)]);
            }, i * 100);
        }
        showFloatingText('<i class="fas fa-heart"></i> Perfect Weight! <i class="fas fa-heart"></i>', centerX, centerY - 80, '#ffd700');
    } else if (isHeight) {
        // Height celebration - growth particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['fa-ruler', 'fa-seedling', 'fa-baby', 'fa-heart', 'fa-rainbow'][Math.floor(Math.random() * 5)]);
            }, i * 100);
        }
        showFloatingText('<i class="fas fa-star"></i> Perfect Size! <i class="fas fa-star"></i>', centerX, centerY - 80, '#ff6b9d');
    }
    
    // Add special dragon celebration
    setTimeout(() => {
        createParticle(centerX, centerY, 'fa-dragon');
        showFloatingText('Little Dragon Stats! <i class="fas fa-star"></i>', centerX, centerY - 120, '#667eea');
    }, 500);
}

function createDragonStatCelebration(stat) {
    const rect = stat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Determine if it's weight or height stat in dragon section
    const statText = stat.textContent.trim();
    const isWeight = statText.includes('kg');
    const isHeight = statText.includes('cm');
    
    if (isWeight) {
        // Dragon weight celebration
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['fa-dragon', 'fa-balance-scale', 'fa-gem', 'fa-star', 'fa-star'][Math.floor(Math.random() * 5)]);
            }, i * 80);
        }
        showFloatingText('<i class="fas fa-star"></i><i class="fas fa-star"></i> Strong Dragon! <i class="fas fa-star"></i><i class="fas fa-star"></i>', centerX, centerY - 90, '#ffd700');
    } else if (isHeight) {
        // Dragon height celebration
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['fa-dragon', 'fa-ruler', 'fa-rainbow', 'fa-star', 'fa-star'][Math.floor(Math.random() * 5)]);
            }, i * 80);
        }
        showFloatingText('<i class="fas fa-star"></i><i class="fas fa-star"></i> Mighty Dragon! <i class="fas fa-star"></i><i class="fas fa-star"></i>', centerX, centerY - 90, '#ff6b9d');
    }
    
    // Add special dragon power burst
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createParticle(centerX, centerY, 'fa-fire');
        }
        showFloatingText('<i class="fas fa-bolt"></i> Dragon Power Stats! <i class="fas fa-bolt"></i>', centerX, centerY - 130, '#667eea');
    }, 800);
}

// Add custom CSS for new animations
function addInteractiveCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes balloon-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes float-up-fade {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100px); }
        }
        
        @keyframes milestone-celebrate {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.05) rotate(2deg); }
            75% { transform: scale(1.05) rotate(-2deg); }
        }
        
        @keyframes wish-particle {
            0% { 
                opacity: 1; 
                transform: translate(0, 0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translate(var(--target-x), var(--target-y)) scale(0); 
            }
        }
        
        @keyframes magical-particle-rise {
            0% { 
                opacity: 0; 
                transform: translateY(0px) scale(0) rotate(0deg); 
            }
            20% { 
                opacity: 1; 
                transform: translateY(-200px) scale(1) rotate(180deg); 
            }
            80% { 
                opacity: 1; 
                transform: translateY(-600px) scale(1.2) rotate(540deg); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-800px) scale(0) rotate(720deg); 
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================================
// ✨ MAGICAL NEW FEATURES JAVASCRIPT ✨
// ===================================================

// ===== MAGICAL TIME CAPSULE =====
function initializeTimeCapsule() {
    const bottle = document.getElementById('timeCapsuleBottle');
    const modal = document.getElementById('timeCapsuleModal');
    const closeBtn = document.getElementById('closeTimeCapsule');
    const saveBtn = document.getElementById('saveMessage');
    const messageInput = document.getElementById('timeCapsuleMessage');
    const nameInput = document.getElementById('senderName');
    const savedMessagesContainer = document.getElementById('savedMessages');
    const charCounter = document.getElementById('charCount');
    const messagesCounter = document.getElementById('messagesCounter');
    const messageForm = document.getElementById('messageForm');
    const openButton = document.getElementById('openTimeCapsuleBtn');

    // Modal must exist; bottle / button are optional ways to open it
    if (!modal) {
        return;
    }

    // Initialize character counter
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            charCounter.textContent = count;
            charCounter.style.color = count > 450 ? '#EF4444' : '#6B7280';
        });
    }

    // Helper: open modal and show it
    function openModal() {
        modal.classList.add('active');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        
        document.body.classList.add('modal-open');
        loadSavedMessages();
        try { playTone(523.25, 0.2); } catch (err) { /* ignore */ }
    }

    // Open modal when bottle/letter (bức thư) or "Send Wishes" button is clicked (event delegation for reliability)
    document.addEventListener('click', (e) => {
        const openTrigger = e.target.closest('#timeCapsuleBottle, #openTimeCapsuleBtn');
        if (!openTrigger) return;
        e.preventDefault();
        e.stopPropagation();
        openModal();
        if (openTrigger.id === 'timeCapsuleBottle') {
            openTrigger.style.animation = 'none';
            setTimeout(() => {
                openTrigger.style.animation = 'magical-bottle-float 6s ease-in-out infinite';
            }, 100);
        }
    });

    // Close modal (only attach if elements exist)
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.visibility = '';
        modal.style.opacity = '';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        try { playTone(391.995, 0.2); } catch (err) { /* ignore */ }
        if (messageForm) messageForm.reset();
        if (charCounter) charCounter.textContent = '0';
    }

    // Handle form submission
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveMessage();
        });
    } else if (saveBtn) {
        saveBtn.addEventListener('click', saveMessage);
    }

    async function saveMessage() {
        const message = messageInput.value.trim();
        const name = nameInput.value.trim() || 'Anonymous';

        if (!message) {
            showNotification('Please write a message for Thị Mỳ! <i class="fas fa-heart"></i>', 'error');
            return;
        }

        const messageData = {
            text: message,
            author: name,
            date: new Date().toLocaleDateString(),
            timestamp: Date.now(),
            id: Date.now().toString() // Simple ID for now
        };

        try {
            if (isFirebaseEnabled && db) {
                
                // Save to Firebase Firestore
                const docRef = await db.collection('timeCapsuleMessages').add(messageData);
                showNotification(`Message saved to the cloud for 's future! <i class="fas fa-cloud"></i><i class="fas fa-star"></i>`, 'success');
            } else {
                // Fallback to localStorage
                let savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
                savedMessages.push(messageData);
                localStorage.setItem('timeCapsuleMessages', JSON.stringify(savedMessages));
                showNotification(`Message saved for Thị Mỳ's future! <i class="fas fa-star"></i>`, 'success');
            }

            // Create celebration effect
            createTimeCapsuleCelebration();

            // Clear inputs and reload messages
            messageInput.value = '';
            nameInput.value = '';
            loadSavedMessages();

            playTone(659.25, 0.3); // E5 note
        } catch (error) {
            // Try to save locally as fallback
            try {
                let savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
                savedMessages.push(messageData);
                localStorage.setItem('timeCapsuleMessages', JSON.stringify(savedMessages));
                showNotification('Message saved locally (cloud connection failed) ', 'warning');
                
                // Create celebration effect
                createTimeCapsuleCelebration();
                
                // Clear inputs and reload messages
                messageInput.value = '';
                nameInput.value = '';
                loadSavedMessages();
                
                playTone(659.25, 0.3); // E5 note
            } catch (fallbackError) {
                showNotification('Error saving message. Please try again! ', 'error');
            }
        }
    }

    async function loadSavedMessages() {
        const loadingHTML = `
            <div style="text-align: center; padding: 40px; opacity: 0.7;">
                <div style="font-size: 2rem; margin-bottom: 10px;"><i class="fas fa-hourglass-half"></i></div>
                <p>Loading magical messages...</p>
            </div>
        `;
        
        if (!savedMessagesContainer) {
            return;
        }
        
        savedMessagesContainer.innerHTML = loadingHTML;

        try {
            let savedMessages = [];
            let displayFromCloud = isFirebaseEnabled;
            
            if (isFirebaseEnabled && db) {
                // Load from Firebase Firestore
                try {
                    const snapshot = await db.collection('timeCapsuleMessages')
                        .orderBy('timestamp', 'desc')
                        .get();
                    
                    savedMessages = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                } catch (firebaseError) {
                    // Fallback to localStorage on Firebase error
                    savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
                    savedMessages.sort((a, b) => b.timestamp - a.timestamp);
                    displayFromCloud = false;
                }
            } else {
                // Fallback to localStorage
                savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
                // Sort by timestamp descending (newest first)
                savedMessages.sort((a, b) => b.timestamp - a.timestamp);
                displayFromCloud = false;
            }

            // Update message counter
            if (messagesCounter) {
                const storageIcon = displayFromCloud ? '<i class="fas fa-cloud"></i>' : '<i class="fas fa-save"></i>';
                messagesCounter.innerHTML = `${savedMessages.length} messages ${storageIcon}`;
            }

            // Clear container
            savedMessagesContainer.innerHTML = '';

            if (savedMessages.length === 0) {
                const noMessagesHTML = `
                    <div style="text-align: center; padding: 40px; opacity: 0.7;">
                        <div style="font-size: 3rem; margin-bottom: 15px;"><i class="fas fa-envelope"></i></div>
                        <p style="font-size: 1.1rem; color: #6B7280;">
                            ${displayFromCloud ? 
                                'No messages in the cloud yet. Be the first to share your love!' :
                                'No messages saved yet. Be the first to share your love!'
                            }
                        </p>
                    </div>
                `;
                
                savedMessagesContainer.innerHTML = noMessagesHTML;
                return;
            }

            // Display messages with beautiful cards
            savedMessages.forEach((msg, index) => {
                const messageCard = createMagicalMessageCard(msg, index, displayFromCloud);
                savedMessagesContainer.appendChild(messageCard);
            });

        } catch (error) {
            const errorHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 2.5rem; margin-bottom: 15px;"><i class="fas fa-sad-tear"></i></div>
                    <p style="color: #EF4444; font-weight: 600;">
                        Error loading messages: ${error.message}
                    </p>
                </div>
            `;
            savedMessagesContainer.innerHTML = errorHTML;
        }
    }

    // Create beautiful message cards
    function createMagicalMessageCard(msg, index, isFromCloud) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'magical-message-card';
        messageDiv.style.cssText = `
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.95) 100%);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(124, 58, 237, 0.1);
            animation: message-card-enter 0.6s ease-out forwards;
            animation-delay: ${index * 0.1}s;
            opacity: 0;
            transform: translateY(20px);
        `;
        
        const storageIcon = isFromCloud ? '<i class="fas fa-cloud"></i>' : '<i class="fas fa-save"></i>';
        const cardIcon = ['fa-heart', 'fa-envelope', 'fa-gift', 'fa-star', 'fa-heart', 'fa-star', 'fa-heart', 'fa-heart'][index % 8];
        
        messageDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 1.5rem;">${cardIcon}</span>
                <span style="font-size: 0.85rem; color: #6B7280; font-weight: 500;">
                    ${msg.author || 'Anonymous'} • ${msg.date} ${storageIcon}
                </span>
            </div>
            <div style="margin-bottom: 16px;">
                <p style="
                    font-style: italic; 
                    font-size: 1rem; 
                    line-height: 1.5; 
                    color: #374151; 
                    margin: 0; 
                    border-left: 3px solid #7C3AED; 
                    padding-left: 12px;
                ">
                    "${msg.text}"
                </p>
            </div>
            <div style="text-align: right; opacity: 0.7;">
                <span style="font-size: 0.8rem; color: #7C3AED; font-weight: 500;">
                    — With love for Future Thị Mỳ <i class="fas fa-heart"></i>
                </span>
            </div>
        `;
        
        // Trigger entrance animation
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
        
        return messageDiv;
    }

    function createTimeCapsuleCelebration() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    right: 60px;
                    top: 25%;
                    width: 20px;
                    height: 20px;
                    background: ${['fa-envelope', 'fa-heart', 'fa-star', 'fa-star', 'fa-star'][Math.floor(Math.random() * 5)]};
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: time-capsule-particle 2s ease-out forwards;
                `;
                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    // Add CSS for time capsule effects
    if (!document.getElementById('time-capsule-css')) {
        const style = document.createElement('style');
        style.id = 'time-capsule-css';
        style.textContent = `
            @keyframes time-capsule-particle {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.2); opacity: 1; }
                100% { transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0); opacity: 0; }
            }
            
            @keyframes message-appear {
                0% { 
                    opacity: 0; 
                    transform: translateY(20px) scale(0.95); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            .saved-message {
                transition: all 0.3s ease;
                margin-bottom: 1rem;
                padding: 0.8rem;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .saved-message:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INTERACTIVE STORY BOOK =====
function initializeStoryBook() {
    const openBookBtn = document.getElementById('openBook');
    const bookCover = document.querySelector('.book-cover');
    const storyPages = document.getElementById('storyPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    let currentPage = 1;
    const totalPages = 4;

    if (!openBookBtn || !bookCover || !storyPages) {
        return;
    }

    // Ensure button is fully clickable
    openBookBtn.style.cssText = `
        ${openBookBtn.style.cssText || ''}
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 9999 !important;
        position: relative !important;
    `;

    // Open book - multiple event listeners for reliability
    openBookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openBook();
    });
    
    openBookBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openBook();
    });
    
    // Also add direct onclick as backup
    openBookBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        openBook();
        return false;
    };

    function openBook() {
        
        bookCover.classList.add('opened');
        storyPages.classList.add('active');
        
        // Show navigation when story is opened
        const storyNav = document.querySelector('.story-nav');
        if (storyNav) {
            storyNav.classList.add('active');
            storyNav.style.display = 'flex';
            storyNav.style.opacity = '1';
        } else {
        }
        
        playTone(523.25, 0.3); // C5 note
        createBookOpenEffect();
        updatePageDisplay();
        
        // Show success notification
        showNotification('Story book opened! <i class="fas fa-book"></i>', 'success');
    }

    // Navigation - add event listeners even if hidden initially
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    }
    
    // Close story functionality
    const closeBtn = document.getElementById('closeStory');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBook);
    }

    function closeBook() {
        bookCover.classList.remove('opened');
        storyPages.classList.remove('active');
        
        // Hide navigation when story is closed
        const storyNav = document.querySelector('.story-nav');
        if (storyNav) {
            storyNav.classList.remove('active');
        }
        
        // Reset to first page
        currentPage = 1;
        updatePageDisplay();
        
        playTone(391.995, 0.3); // G4 note (lower than open)
    }

    function changePage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;

        // Hide current page
        const currentPageElement = document.querySelector(`.story-page[data-page="${currentPage}"]`);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        currentPage = newPage;

        // Show new page
        const newPageElement = document.querySelector(`.story-page[data-page="${currentPage}"]`);
        if (newPageElement) {
            newPageElement.classList.add('active');
        }

        updatePageDisplay();
        createPageTurnEffect();
        playTone(392 + (currentPage * 50), 0.2); // Different note for each page
    }

    function updatePageDisplay() {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    function createBookOpenEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 15px;
                    height: 15px;
                    background: ${['fa-book', 'fa-star', 'fa-star', 'fa-star', 'fa-masks'][Math.floor(Math.random() * 5)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 100;
                    animation: book-open-particle 2s ease-out forwards;
                `;
                document.querySelector('.story-book').appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 50);
        }
    }

    function createPageTurnEffect() {
        const storyBook = document.querySelector('.story-book');
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: var(--sparkle-color, '#ffd700');
                font-size: 10px;
                pointer-events: none;
                z-index: 100;
                animation: page-turn-sparkle 1s ease-out forwards;
            `;
            storyBook.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Add CSS for story book effects
    if (!document.getElementById('story-book-css')) {
        const style = document.createElement('style');
        style.id = 'story-book-css';
        style.textContent = `
            @keyframes book-open-particle {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(0); opacity: 0; }
            }
            @keyframes page-turn-sparkle {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== GROWING MEMORY GARDEN =====
function initializeMemoryGarden() {
    
    const flowerBed = document.getElementById('flowerBed');
    const butterfliesContainer = document.getElementById('butterfliesContainer');
    const flowerCountEl = document.getElementById('flowerCount');
    const butterflyCountEl = document.getElementById('butterflyCount');
    const memoryCountEl = document.getElementById('memoryCount');
    
    let flowerCount = parseInt(localStorage.getItem('gardenFlowerCount') || '0');
    let butterflyCount = 0;
    let memoryCount = parseInt(localStorage.getItem('gardenMemoryCount') || '0');
    
    const flowerTypes = ['fa-spa', 'fa-spa', 'fa-sun', 'fa-spa', 'fa-spa', 'fa-spa', 'fa-spa', 'fa-heart'];
    const butterflyTypes = ['fa-butterfly', 'fa-horse', 'fa-user-astronaut'];
    
    if (!flowerBed) {
        return;
    }
    
    // Initialize garden
    updateGardenStats();
    loadExistingFlowers();
    initializeCarouselPhotoClicks();
    
    function initializeCarouselPhotoClicks() {
        // Add click handlers to all carousel images
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        
        carouselImages.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent carousel navigation
                plantFlowerFromPhoto(img, index);
            });
            
            // Add visual indication that photos are clickable
            img.style.cursor = 'pointer';
            img.title = 'Click to plant a flower for this memory!';
        });
    }
    
    function plantFlowerFromPhoto(imgElement, photoIndex) {
        
        // Check if already planted
        const existingFlower = flowerBed.querySelector(`[data-photo="${photoIndex}"]`);
        if (existingFlower) {
            // Animate existing flower
            existingFlower.style.animation = 'flower-celebrate 1s ease-out';
            showNotification('This memory is already blooming in your garden!', 'info');
            return;
        }
        
        // Create new flower
        const flower = document.createElement('div');
        flower.className = 'garden-flower';
        flower.setAttribute('data-photo', photoIndex);
        
        // Choose flower type based on photo index
        const flowerType = flowerTypes[photoIndex % flowerTypes.length];
        flower.textContent = flowerType;
        
        // Random position in flower bed
        const x = 10 + Math.random() * 80; // 10% to 90% width
        const y = 20 + Math.random() * 60; // 20% to 80% height
        
        flower.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        // Add to flower bed
        flowerBed.appendChild(flower);
        
        // Animate flower growth
        setTimeout(() => {
            flower.classList.add('bloomed');
        }, 100);
        
        // Update stats
        flowerCount++;
        memoryCount++;
        updateGardenStats();
        saveGardenProgress();
        
        // Create planting effect
        createPlantingEffect(flower);
        
        // Spawn butterfly after flower blooms
        setTimeout(() => {
            if (Math.random() < 0.7) { // 70% chance
                spawnButterfly(flower);
            }
        }, 2000);
        
        // Show success message
        showNotification(`Beautiful flower planted for this memory!`, 'success');
        playTone(523.25 + (photoIndex * 25), 0.3);
        
        // Add click handler to flower
        flower.addEventListener('click', () => {
            createFlowerClickEffect(flower);
            showImageFromFlower(imgElement);
        });
    }
    
    function createPlantingEffect(flower) {
        const rect = flower.getBoundingClientRect();
        const gardenRect = flowerBed.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${flower.style.left};
                    top: ${flower.style.top};
                    width: 15px;
                    height: 15px;
                    background: ${['fa-star', 'fa-star', 'fa-star', 'fa-spa'][Math.floor(Math.random() * 4)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 100;
                    animation: planting-particle 1.5s ease-out forwards;
                `;
                flowerBed.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
    }
    
    function createFlowerClickEffect(flower) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${flower.style.left};
                    top: ${flower.style.top};
                    width: 12px;
                    height: 12px;
                    background: ${flower.textContent};
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 100;
                    animation: flower-click-burst 1s ease-out forwards;
                `;
                flowerBed.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }, i * 40);
        }
    }
    
    function spawnButterfly(targetFlower) {
        const butterfly = document.createElement('div');
        butterfly.className = 'garden-butterfly';
        butterfly.textContent = butterflyTypes[Math.floor(Math.random() * butterflyTypes.length)];
        
        butterfly.style.cssText = `
            left: -50px;
            top: ${20 + Math.random() * 60}%;
            animation-delay: ${Math.random() * 2}s;
            animation-duration: ${6 + Math.random() * 4}s;
        `;
        
        butterfliesContainer.appendChild(butterfly);
        
        setTimeout(() => {
            butterfly.classList.add('active');
        }, 100);
        
        butterflyCount++;
        updateGardenStats();
        
        // Remove butterfly after animation
        setTimeout(() => {
            butterfly.remove();
            butterflyCount = Math.max(0, butterflyCount - 1);
            updateGardenStats();
        }, 8000);
    }
    
    function showImageFromFlower(imgElement) {
        // Create modal to show the original image
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = imgElement.src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    }
    
    function updateGardenStats() {
        if (flowerCountEl) flowerCountEl.textContent = flowerCount;
        if (butterflyCountEl) butterflyCountEl.textContent = butterflyCount;
        if (memoryCountEl) memoryCountEl.textContent = memoryCount;
    }
    
    function saveGardenProgress() {
        localStorage.setItem('gardenFlowerCount', flowerCount.toString());
        localStorage.setItem('gardenMemoryCount', memoryCount.toString());
        
        // Save flower positions and types
        const flowers = Array.from(flowerBed.querySelectorAll('.garden-flower')).map(flower => ({
            photoIndex: flower.getAttribute('data-photo'),
            type: flower.textContent,
            left: flower.style.left,
            top: flower.style.top
        }));
        localStorage.setItem('gardenFlowers', JSON.stringify(flowers));
    }
    
    function loadExistingFlowers() {
        const savedFlowers = JSON.parse(localStorage.getItem('gardenFlowers') || '[]');
        
        savedFlowers.forEach(flowerData => {
            const flower = document.createElement('div');
            flower.className = 'garden-flower bloomed';
            flower.setAttribute('data-photo', flowerData.photoIndex);
            flower.textContent = flowerData.type;
            flower.style.cssText = `
                left: ${flowerData.left};
                top: ${flowerData.top};
            `;
            
            flowerBed.appendChild(flower);
            
            // Add click handler
            flower.addEventListener('click', () => {
                createFlowerClickEffect(flower);
                const carouselImg = document.querySelector(`.carousel-slide:nth-child(${parseInt(flowerData.photoIndex) + 1}) img`);
                if (carouselImg) {
                    showImageFromFlower(carouselImg);
                }
            });
        });
    }
    
    // Add CSS for garden effects
    if (!document.getElementById('garden-effects-css')) {
        const style = document.createElement('style');
        style.id = 'garden-effects-css';
        style.textContent = `
            @keyframes planting-particle {
                0% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.3) translateY(-20px) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) translateY(-40px) rotate(360deg); opacity: 0; }
            }
            @keyframes flower-click-burst {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); opacity: 0; }
            }
            @keyframes flower-celebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.2) rotate(5deg); }
                50% { transform: scale(1.3) rotate(-5deg); }
                75% { transform: scale(1.1) rotate(3deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== HORIZONTAL PARALLAX MEMORIES CAROUSEL =====
function initializeMemoriesGallery() {
    
    // Get all memory images from organized category folders
    const memoryImagesByCategory = {
        hangout: [
            'hang out/hang out1.jpg', 'hang out/hang out2.jpg', 'hang out/hang out3.jpg', 
            'hang out/hang out4.jpg', 'hang out/hang out5.jpg', 'hang out/hang out6.jpg', 
            'hang out/hang out7.jpg', 'hang out/hang out8.jpg', 'hang out/hang out9.jpg', 
            'hang out/hang out10.jpg', 'hang out/hang out11.jpg', 'hang out/hang out12.jpg', 
            'hang out/hang out13.jpg', 'hang out/hang out14.jpg', 'hang out/hang out15.jpg', 
            'hang out/hang out16.jpg', 'hang out/hang out17.jpg', 'hang out/hang out18.jpg', 
            'hang out/hang out19.jpg', 'hang out/hang out20.jpg', 'hang out/hang out21.jpg', 
            'hang out/hang out22.jpg', 'hang out/hang out23.jpg', 'hang out/hang out24.jpg', 
            'hang out/hang out25.jpg', 'hang out/hang out26.jpg', 'hang out/hang out27.jpg'
        ],
        halloween: [
            'halloween/halloween1.jpg', 'halloween/halloween2.jpg', 'halloween/halloween3.jpg', 
            'halloween/halloween4.jpg', 'halloween/halloween5.jpg', 'halloween/halloween6.jpg', 
            'halloween/halloween7.jpg', 'halloween/halloween8.jpg', 'halloween/halloween9.jpg', 
            'halloween/halloween10.jpg', 'halloween/halloween11.jpg', 'halloween/10.jpg'
        ],
        family: [
            'family/family1.jpg', 'family/family2.jpg', 'family/family3.jpg', 
            'family/family4.jpg', 'family/family5.jpg', 'family/family6.jpg', 
            'family/family7.jpg', 'family/family8.jpg'
        ],
        christmas: [
            'Christmas/Christmas1.jpg', 'Christmas/Christmas2.jpg', 'Christmas/Christmas3.jpg', 
            'Christmas/Christmas4.jpg', 'Christmas/Christmas5.jpg'
        ],
        friend: [
            'friend/friend1.jpg', 'friend/friend2.jpg', 'friend/friend3.jpg', 'friend/friend4.jpg'
        ],
        sea: [
            'sea/sea1.jpg', 'sea/sea2.jpg', 'sea/sea3.jpg', 'sea/sea4.jpg'
        ],
        cry: [
            'cry/cry1.jpg', 'cry/cry2.jpg'
        ]
    };
    
    // Flatten all images with proper category mapping
    const memoryImages = [];
    Object.entries(memoryImagesByCategory).forEach(([category, images]) => {
        images.forEach(imagePath => {
            memoryImages.push({
                src: imagePath,
                category: category,
                actualCategory: category // Store the real category
            });
        });
    });
    
    
    // Count by category for debugging
    const categoryCounts = {};
    memoryImages.forEach(img => {
        categoryCounts[img.category] = (categoryCounts[img.category] || 0) + 1;
    });

    // Base path for images: use absolute /images/ on dev so Vite middleware is always hit
    function getImagesBase() {
        const pathname = window.location.pathname || '';
        const hostname = window.location.hostname || '';
        const href = window.location.href || '';
        // Vite dev server: use absolute path so browser always requests /images/ (served by plugin)
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
            if (href.includes('/html/') || pathname.includes('/html/') || href.includes('main.html'))
                return '/images/';
            return '/images/';
        }
        // Production / built: relative paths
        if (pathname.includes('/html/') || pathname.includes('html\\')) return '../images/';
        if (pathname === '/' || pathname.endsWith('.html') || pathname.endsWith('main.html')) return '/images/';
        return '../images/';
    }

    // Initialize the new masonry gallery (with retry if DOM not ready)
    let galleryRetryCount = 0;
    function tryInitMasonryGallery() {
        const grid = document.getElementById('memoriesMasonryGrid');
        if (grid) {
            initMasonryGallery();
        } else if (galleryRetryCount < 20) {
            galleryRetryCount++;
            setTimeout(tryInitMasonryGallery, 100);
        }
    }
    tryInitMasonryGallery();

    function initMasonryGallery() {
        
        const masonryGrid = document.getElementById('memoriesMasonryGrid');
        const totalPhotosEl = document.getElementById('totalPhotos');
        const infiniteLoadingIndicator = document.getElementById('infiniteLoadingIndicator');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const memoriesLightbox = document.getElementById('memoriesLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxSubtitle = document.getElementById('lightboxSubtitle');
        const closeLightbox = document.getElementById('closeLightbox');
        const prevMemory = document.getElementById('prevMemory');
        const nextMemory = document.getElementById('nextMemory');
        const currentMemoryIndex = document.getElementById('currentMemoryIndex');
        const totalMemoryCount = document.getElementById('totalMemoryCount');
        const downloadPhoto = document.getElementById('downloadPhoto');
        const sharePhoto = document.getElementById('sharePhoto');


        if (!masonryGrid) {
            return;
        }
        
        const imagesBase = getImagesBase();

        let currentFilter = 'all';
        let currentLightboxIndex = 0;
        let filteredImages = [...memoryImages];

        // Use actual categories from organized folder structure
        const imageCategories = memoryImages.map((imageData, index) => {
            return {
                src: imageData.src,
                category: imageData.category,
                title: getImageTitle(imageData.category, index),
                subtitle: getImageSubtitle(imageData.category)
            };
        });

        function getImageTitle(category, index) {
            const titles = {
                hangout: [
                    'Fun Together', 'Play Time', 'Happy Moments', 'Sweet Memories', 'Laughter & Joy',
                    'Best Times', 'Precious Moments', 'Together Forever', 'Making Memories', 'Joyful Times',
                    'Fun & Games', 'Smile & Shine', 'Happy Days', 'Beautiful Moments', 'Cherished Times',
                    'Friends & Fun', 'Playful Day', 'Joyful Moments', 'Happy Times', 'Fun Memories',
                    'Sweet Together', 'Playful Memories', 'Happy Together', 'Fun Moments', 'Joyful Times', 'Precious Day'
                ],
                halloween: [
                    'Spooky Fun', 'Halloween Magic', 'Costume Time', 'Trick or Treat', 'Spooky Night',
                    'Festive Fun', 'Costume Party', 'Halloween Joy', 'Spooky Memories', 'Treat Time', 'Festive Night', 'Spooky Smile'
                ],
                family: [
                    'Family Love', 'Together Time', 'Family Bond', 'Precious Family', 'Love & Togetherness',
                    'Family Moments', 'Cherished Family', 'Family Joy'
                ],
                christmas: [
                    'Christmas Magic', 'Holiday Joy', 'Festive Season', 'Christmas Love', 'Holiday Memories'
                ],
                friend: [
                    'Best Friends', 'Friend Moments', 'Friendship Joy', 'Precious Friends'
                ],
                sea: [
                    'Beach Fun', 'Sea & Sky', 'Ocean Memories', 'Beach Day'
                ],
                cry: [
                    'Tender Moment', 'Sensitive Soul'
                ]
            };
            return titles[category] ? titles[category][index % titles[category].length] : 'Precious Memory';
        }

        function getImageSubtitle(category) {
            const subtitles = {
                hangout: 'Fun moments with friends and family',
                halloween: 'Spooky and festive Halloween memories',
                family: 'Beautiful family memories',
                christmas: 'Christmas and holiday joy',
                friend: 'Precious friendship moments',
                sea: 'Beach and sea adventures',
                cry: 'Tender emotional moments'
            };
            return subtitles[category] || 'Precious memories of Thị Mỳ';
        }

        // Update total photos counter
        if (totalPhotosEl) {
            totalPhotosEl.textContent = memoryImages.length;
        }

        // Initialize lightbox counter
        if (totalMemoryCount) {
            totalMemoryCount.textContent = memoryImages.length;
        }

        function createMemoryItem(imageData, index) {
            
            const item = document.createElement('div');
            item.className = 'memory-item';
            item.setAttribute('data-category', imageData.category);
            item.style.animationDelay = `${index * 0.1}s`;

            const img = document.createElement('img');
            
            // Smart path construction for organized category folders
            if (imageData.src.startsWith('http')) {
                // External URL (placeholder)
                img.src = imageData.src; 
            } else {
                img.src = imagesBase + imageData.src;
            }
            
            
            img.alt = imageData.title;
            img.loading = 'lazy';
            img.decoding = 'async';
            
            // Add error handling for images
            img.onerror = () => {
                
                // Check if it's a HEIC file
                if (img.src.includes('.HEIC') || img.src.includes('.heic')) {
                    img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23ff69b4"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23ffffff" font-size="14"%3EHEIC Format%3C/text%3E%3Ctext x="50%" y="70%" text-anchor="middle" dy=".3em" fill="%23ffffff" font-size="12"%3ENot Supported%3C/text%3E%3C/svg%3E';
                } else {
                    img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23ff69b4"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23ffffff" font-size="16"%3E❌ Image Not Found%3C/text%3E%3C/svg%3E';
                }
            };
            
            img.onload = () => {
            };

            const overlay = document.createElement('div');
            overlay.className = 'memory-overlay';
            overlay.innerHTML = '<div class="memory-play-icon"><i class="fas fa-eye"></i></div>';

            item.appendChild(img);
            item.appendChild(overlay);

            // Add click handler for lightbox
            item.addEventListener('click', () => {
                currentLightboxIndex = index; // Use the passed index directly
                openLightbox();
            });

            return item;
        }

        function loadAllImages() {
            
            if (filteredImages.length === 0) {
                return;
            }
            
            const fragment = document.createDocumentFragment();


            filteredImages.forEach((imageData, index) => {
                const memoryItem = createMemoryItem(imageData, index);
                fragment.appendChild(memoryItem);
            });

            if (masonryGrid) {
                masonryGrid.innerHTML = ''; // Clear existing content
                masonryGrid.appendChild(fragment);
            } else {
            }

            // Hide loading indicator
            showInfiniteLoading(false);
        }

        function showInfiniteLoading(show = false) {
            if (infiniteLoadingIndicator) {
                infiniteLoadingIndicator.style.display = show ? 'block' : 'none';
            }
        }

        // Removed loading placeholders - not needed when loading all images at once

        // Removed preloadImages - not needed when loading all images at once

        function filterImages(category) {
            currentFilter = category;
            
            if (category === 'all') {
                filteredImages = [...imageCategories];
            } else {
                filteredImages = imageCategories.filter(img => img.category === category);
            }

            // Load all images for the selected filter
            loadAllImages();

            // Update total count
            if (totalPhotosEl) {
                totalPhotosEl.textContent = filteredImages.length;
            }
            if (totalMemoryCount) {
                totalMemoryCount.textContent = filteredImages.length;
            }
        }

        // Filter button handlers
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                filterImages(filter);
                
                playTone(523.25, 0.1);
            });
        });

        // Removed infinite scroll - loading all images at once

        // Lightbox functionality
        function openLightbox() {
            if (currentLightboxIndex >= 0 && currentLightboxIndex < filteredImages.length) {
                const imageData = filteredImages[currentLightboxIndex];
                
                // Use same smart path logic as main gallery
                if (imageData.src.startsWith('http')) {
                    lightboxImage.src = imageData.src;
                } else {
                    lightboxImage.src = imagesBase + imageData.src;
                }
                
                lightboxImage.alt = imageData.title;
                
                if (lightboxTitle) lightboxTitle.textContent = imageData.title;
                if (lightboxSubtitle) lightboxSubtitle.textContent = imageData.subtitle;
                if (currentMemoryIndex) currentMemoryIndex.textContent = currentLightboxIndex + 1;
                
                memoriesLightbox.classList.add('active');
                document.body.classList.add('modal-open');
                
                playTone(659.25, 0.1);
            }
        }

        function closeLightboxHandler() {
            memoriesLightbox.classList.remove('active');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            playTone(523.25, 0.1);
        }

        function nextLightboxImage() {
            currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
            openLightbox();
        }

        function prevLightboxImage() {
            currentLightboxIndex = currentLightboxIndex === 0 ? filteredImages.length - 1 : currentLightboxIndex - 1;
            openLightbox();
        }

        // Lightbox event handlers
        if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxHandler);
        if (nextMemory) nextMemory.addEventListener('click', nextLightboxImage);
        if (prevMemory) prevMemory.addEventListener('click', prevLightboxImage);
        
        if (memoriesLightbox) {
            memoriesLightbox.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightboxHandler);
        }

        // Download functionality
        if (downloadPhoto) {
            downloadPhoto.addEventListener('click', () => {
                if (filteredImages[currentLightboxIndex]) {
                    const link = document.createElement('a');
                    const imageData = filteredImages[currentLightboxIndex];
                    
                    // Use same smart path logic
                    if (imageData.src.startsWith('http')) {
                        link.href = imageData.src;
                    } else {
                        link.href = imagesBase + imageData.src;
                    }
                    
                    link.download = `minh-chau-memory-${currentLightboxIndex + 1}.jpg`;
                    link.click();
                    playTone(783.99, 0.2);
                }
            });
        }

        // Share functionality
        if (sharePhoto) {
            sharePhoto.addEventListener('click', async () => {
                const imageData = filteredImages[currentLightboxIndex];
                if (imageData && navigator.share) {
                    try {
                        await navigator.share({
                            title: `${imageData.title} - Thị Mỳ's Memories`,
                            text: `Beautiful memory of Thị Mỳ!`,   
                            url: window.location.href
                        });
                        playTone(880, 0.2);
                    } catch (err) {
                    }
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    showNotification('Link copied to clipboard! <i class="fas fa-link"></i>', 'success');
                    playTone(880, 0.2);
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!memoriesLightbox.classList.contains('active')) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    prevLightboxImage();
                    break;
                case 'ArrowRight':
                    nextLightboxImage();
                    break;
                case 'Escape':
                    closeLightboxHandler();
                    break;
            }
        });

        // Initialize with all images loaded
        filterImages('all');
        
        // Add a simple test to see if the gallery container is working
        setTimeout(() => {
        }, 2000);
        
    }

    // Fallback function if main gallery fails
    function createSimpleTestGallery() {
        const masonryGrid = document.getElementById('memoriesMasonryGrid');
        if (!masonryGrid) {
            return;
        }

        // Clear any existing content
        masonryGrid.innerHTML = '';

        // Create 3 simple test images
        const testImages = [
            { src: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Test+Image+1', title: 'Test Image 1' },
            { src: 'https://via.placeholder.com/300x300/ff1493/ffffff?text=Test+Image+2', title: 'Test Image 2' },
            { src: 'https://via.placeholder.com/300x250/ff69b4/ffffff?text=Test+Image+3', title: 'Test Image 3' }
        ];

        testImages.forEach((imageData, index) => {
            const item = document.createElement('div');
            item.className = 'memory-item';
            item.style.cssText = `
                break-inside: avoid;
                margin-bottom: 15px;
                border-radius: 12px;
                overflow: hidden;
                background: rgba(255, 255, 255, 0.9);
                animation: memory-item-appear 0.6s ease-out forwards;
                animation-delay: ${index * 0.2}s;
            `;

            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.title;
            img.style.cssText = `
                width: 100%;
                height: auto;
                display: block;
            `;

            item.appendChild(img);
            masonryGrid.appendChild(item);
        });

    }

    // If main gallery fails, try simple version after a delay
    setTimeout(() => {
        const masonryGrid = document.getElementById('memoriesMasonryGrid');
        if (masonryGrid && masonryGrid.children.length === 0) {
            createSimpleTestGallery();
        }
    }, 3000);

    // OLD CODE DISABLED - keeping as backup but not executed
    const preloadedImagesOld = [];
    memoryImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
        };
        img.onerror = () => {
        };
        img.src = src;
        preloadedImages.push(img);
    });
    
    const track = document.getElementById('parallaxTrack');
    const dotsContainer = document.getElementById('parallaxDots');
    const prevBtn = document.getElementById('parallaxPrev');
    const nextBtn = document.getElementById('parallaxNext');
    const currentMemorySpan = document.getElementById('currentMemory');
    const totalMemoriesSpan = document.getElementById('totalMemories');
    const lightbox = document.getElementById('memoriesLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevMemory = document.getElementById('prevMemory');
    const nextMemory = document.getElementById('nextMemory');
    
    if (!track || !dotsContainer) {
        return;
    }
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoplayInterval;
    
    // Initialize carousel
    function initCarousel() {
        // Create slides grouped by 3 images each
        const slidesData = [];
        for (let i = 0; i < memoryImages.length; i += 3) {
            slidesData.push(memoryImages.slice(i, i + 3));
        }
        
        // Generate slides HTML
        track.innerHTML = '';
        slidesData.forEach((slideImages, slideIndex) => {
            const slide = document.createElement('div');
            slide.className = 'parallax-slide';
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'parallax-image-container';
            
            slideImages.forEach((imageSrc, imgIndex) => {
                const imageDiv = document.createElement('div');
                const imageClass = imgIndex === 1 ? 'main' : (imgIndex === 0 ? 'side' : 'hidden');
                imageDiv.className = `parallax-image ${imageClass}`;
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Memory of Thị Mỳ`;
                img.loading = 'lazy';
                
                const caption = document.createElement('div');
                caption.className = 'image-caption';
                caption.textContent = `Memory ${slideIndex * 3 + imgIndex + 1}`;
                
                imageDiv.appendChild(img);
              //  imageDiv.appendChild(caption);
                imageContainer.appendChild(imageDiv);
                
                // Add click handler for lightbox
                imageDiv.addEventListener('click', () => {
                    openLightbox(slideIndex * 3 + imgIndex);
                });
            });
            
            slide.appendChild(imageContainer);
            track.appendChild(slide);
        });
        
        // Generate dots
        dotsContainer.innerHTML = '';
        slidesData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `parallax-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Update counters
        if (totalMemoriesSpan) totalMemoriesSpan.textContent = memoryImages.length;
        if (currentMemorySpan) currentMemorySpan.textContent = 1;
        
    }
    
    // Navigation functions
    function goToSlide(index) {
        if (isTransitioning) return;
        
        const slides = track.children;
        const totalSlides = slides.length;
        
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        isTransitioning = true;
        
        // Update track position
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        document.querySelectorAll('.parallax-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update counter
        if (currentMemorySpan) {
            currentMemorySpan.textContent = currentIndex * 3 + 2; // Focus on main image
        }
        
        // Create parallax effect
        createParallaxEffect();
        playTone(440 + currentIndex * 50, 0.15);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Lightbox functions
    function openLightbox(imageIndex) {
        if (!lightbox || !lightboxImage) return;
        
        lightboxImage.src = memoryImages[imageIndex];
        lightboxImage.alt = `Memory ${imageIndex + 1} of Thị Mỳ`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        createMemoryViewEffect();
        playTone(550, 0.2);
    }
    
    function closeLightboxHandler() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }
    
    // Effects
    function createParallaxEffect() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight / 2 + Math.random() * 100 - 50}px;
                    width: 12px;
                    height: 12px;
                    background: ${['fa-star', 'fa-star', 'fa-star'][Math.floor(Math.random() * 3)]};
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: parallax-slide-in 1s ease-out forwards;
                `;
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }, i * 100);
        }
    }
    
    function createMemoryViewEffect() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${window.innerWidth / 2}px;
                    top: ${window.innerHeight / 2}px;
                    width: 15px;
                    height: 15px;
                    background: ${['fa-camera', 'fa-heart', 'fa-star', 'fa-star'][Math.floor(Math.random() * 4)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: memory-view-particle 1.5s ease-out forwards;
                `;
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxHandler);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxHandler();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightboxHandler();
                    break;
                case 'ArrowLeft':
                    if (prevMemory) prevMemory.click();
                    break;
                case 'ArrowRight':
                    if (nextMemory) nextMemory.click();
                    break;
            }
        } else {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        }
    });
    
    // Auto-play
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (!isTransitioning && (!lightbox || !lightbox.classList.contains('active'))) {
                nextSlide();
            }
        }, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize and start autoplay
    initCarousel();
    startAutoplay();
    
    // Pause autoplay on hover
    const parallaxViewer = document.getElementById('parallaxViewer');
    if (parallaxViewer) {
        parallaxViewer.addEventListener('mouseenter', stopAutoplay);
        parallaxViewer.addEventListener('mouseleave', startAutoplay);
    }
    
    // Add dynamic CSS for particle animations
    if (!document.getElementById('parallax-effects-css')) {
        const style = document.createElement('style');
        style.id = 'parallax-effects-css';
        style.textContent = `
            @keyframes memory-view-particle {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZE ALL NEW FEATURES =====
function initializeMagicalFeatures() {
    initializeTimeCapsule();
    initializeMemoryGarden();
    initializeMemoriesGallery();
}


// Initialize interactive CSS
document.addEventListener('DOMContentLoaded', addInteractiveCSS);


// Export functions for potential external use
window.partyApp = {
    shareParty,
    showNotification,
    PARTY_CONFIG,
    trackEvent,
    initializeParallaxEffects,
    addDynamicFloatingElements,
    initializeCarousel,
    initializeInteractiveFeatures,
    initializeMagicalFeatures,
    initializeTimeCapsule,
    openTimeCapsuleModal,
};
