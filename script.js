// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    initMobileMenu();
    initScrollEffects();
    initFormValidation();
    initSmoothScroll();
});

// ===== PLAYER DE MÚSICA =====
function initMusicPlayer() {
    const audio = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('toggleMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicIcon = toggleBtn.querySelector('i');
    
    if (!audio || !toggleBtn || !volumeSlider) return;
    
    // Configurações iniciais
    audio.volume = 0.3;
    
    // Tentar reproduzir música automaticamente
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            updateMusicIcon(true);
        }).catch(() => {
            updateMusicIcon(false);
        });
    }
    
    // Toggle play/pause
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (audio.paused) {
            audio.play();
            updateMusicIcon(true);
            showNotification('♪ Música ativada ♪', 'success');
        } else {
            audio.pause();
            updateMusicIcon(false);
            showNotification('♪ Música pausada ♪', 'info');
        }
    });
    
    // Controle de volume
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
    
    function updateMusicIcon(isPlaying) {
        if (isPlaying) {
            musicIcon.className = 'fas fa-music';
            toggleBtn.classList.add('playing');
        } else {
            musicIcon.className = 'fas fa-play';
            toggleBtn.classList.remove('playing');
        }
    }
}

// ===== NOTIFICAÇÃO FLUTUANTE =====
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF00C8, #6A00FF);
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(106, 0, 255, 0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        // Mudar estilo da navbar ao scrollar
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(240, 234, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(106, 0, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(240, 234, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(106, 0, 255, 0.1)';
        }
        
        // Atualizar link ativo baseado na seção visível
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido!', 'error');
                return;
            }
            
            // Simular envio
            showNotification('Mensagem enviada com sucesso! ✨', 'success');
            form.reset();
            createConfetti();
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===== EFEITO DE CONFETES =====
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        createConfettiPiece();
    }
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    const colors = ['#FF00C8', '#6A00FF', '#00FFFF', '#9FFFFF'];
    
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 9999;
        pointer-events: none;
        animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Adicionar animações ao CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(720deg); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; transform: translateX(100%); }
    }
    
    .notification {
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    }
`;

document.head.appendChild(style);

// ===== DETECTAR PRIMEIRA INTERAÇÃO DO USUÁRIO =====
document.addEventListener('click', function firstInteraction() {
    const audio = document.getElementById('bgMusic');
    if (audio && audio.paused) {
        audio.play().catch(() => {});
    }
    document.removeEventListener('click', firstInteraction);
}, { once: true });

// ===== AJUSTE PARA DISPOSITIVOS MÓVEIS =====
window.addEventListener('resize', function() {
    // Ajustar altura do menu mobile se necessário
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Inicializar altura correta para mobile
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);