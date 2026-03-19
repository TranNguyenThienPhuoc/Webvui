// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 12 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ff8fab', '#ffa8c5', '#ffc0d9', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 6) + 'px';
        confetti.style.height = (Math.random() * 8 + 6) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confettiContainer.appendChild(confetti);
    }
}

// Create confetti explosion
function createConfettiExplosion() {
    const card = document.getElementById('card');
    const explosion = document.createElement('div');
    explosion.className = 'confetti-explosion';
    card.appendChild(explosion);

    const colors = ['#ff6b9d', '#ff8fab', '#ffa8c5', '#ffc0d9', '#ffffff'];
    const pieceCount = 30;

    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = '50%';
        piece.style.top = '50%';
        
        const angle = (Math.PI * 2 * i) / pieceCount;
        const velocity = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        piece.style.setProperty('--tx', tx + 'px');
        piece.style.setProperty('--ty', ty + 'px');
        piece.style.animationDelay = Math.random() * 0.3 + 's';
        
        explosion.appendChild(piece);
    }

    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// Card open animation
const cardContainer = document.getElementById('cardContainer');
const card = document.getElementById('card');
const enterButton = document.getElementById('enterButton');
const openHint = document.getElementById('openHint');

let isOpened = false;

// Chỉ lật thiệp khi nhấn vào nút "Nhấn để mở thiệp"
openHint.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!isOpened) {
        card.classList.add('opened');
        cardContainer.classList.add('opened');
        isOpened = true;
        createConfettiExplosion();
        
        // Add more confetti when opened
        setTimeout(() => {
            createConfettiExplosion();
        }, 500);
    }
});

// Enter button click
enterButton.addEventListener('click', function(e) {
    e.stopPropagation();
    // Add fade out effect
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    setTimeout(function() {
        window.location.href = 'main.html';
    }, 500);
});

// Create heart explosion effect
function createHeartExplosion(heartElement) {
    const heartsContainer = document.getElementById('floatingHeartsContainer');
    if (!heartsContainer) return;
    
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🧡'];
    const rect = heartElement.getBoundingClientRect();
    const containerRect = heartsContainer.getBoundingClientRect();
    
    // Tính vị trí tương đối trong container
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    const explosion = document.createElement('div');
    explosion.className = 'heart-explosion';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    heartsContainer.appendChild(explosion);
    
    const particleCount = 8; // Số lượng trái tim nhỏ nổ ra
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Tính toán hướng nổ
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 60 + Math.random() * 40;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rotate = Math.random() * 720 - 360; // -360 đến 360 độ
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.setProperty('--rotate', rotate + 'deg');
        particle.style.animationDelay = Math.random() * 0.2 + 's';
        
        explosion.appendChild(particle);
    }
    
    // Xóa explosion sau khi animation kết thúc
    setTimeout(() => {
        explosion.remove();
    }, 1000);
    
    // Xóa trái tim gốc
    heartElement.style.animation = 'none';
    heartElement.style.opacity = '0';
    heartElement.style.transform = 'scale(0)';
    setTimeout(() => {
        heartElement.remove();
    }, 300);
}

// Create floating hearts on card
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHeartsContainer');
    if (!heartsContainer) return;
    
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🧡'];
    const heartCount = 16; // Số lượng trái tim
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Emoji trái tim ngẫu nhiên
        const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.textContent = emoji;
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 20 + 18; // 18px - 38px
        heart.style.fontSize = size + 'px';
        
        // Vị trí ngẫu nhiên trên thiệp (tránh các góc và cạnh)
        heart.style.left = Math.random() * 80 + 10 + '%'; // 10% - 90%
        heart.style.top = Math.random() * 80 + 10 + '%'; // 10% - 90%
        
        // Animation delay và duration ngẫu nhiên
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        
        // Rotation ngẫu nhiên
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Thêm event listener để tạo hiệu ứng nổ khi click
        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            createHeartExplosion(heart);
        });
        
        // Thêm touch support cho mobile
        heart.addEventListener('touchend', function(e) {
            e.stopPropagation();
            e.preventDefault();
            createHeartExplosion(heart);
        });
        
        heartsContainer.appendChild(heart);
    }
}

// Initialize
createParticles();
createConfetti();
createFloatingHearts();

// Add touch support for mobile - chỉ khi nhấn vào nút "Nhấn để mở thiệp"
let touchStartX = 0;
let touchEndX = 0;

openHint.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

openHint.addEventListener('touchend', function(e) {
    e.stopPropagation();
    touchEndX = e.changedTouches[0].screenX;
    if (!isOpened && Math.abs(touchStartX - touchEndX) < 50) {
        card.classList.add('opened');
        cardContainer.classList.add('opened');
        isOpened = true;
        createConfettiExplosion();
        
        // Add more confetti when opened
        setTimeout(() => {
            createConfettiExplosion();
        }, 500);
    }
});

