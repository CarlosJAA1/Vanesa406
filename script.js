document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Funcionalidad del Menú Móvil
    // =============================================
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
            
            // Cambiar ícono del botón
            const icon = this.querySelector('i');
            if (mainMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // =============================================
    // Funcionalidad de Submenús (Responsive)
    // =============================================
    document.querySelectorAll('.has-submenu > a').forEach(submenuTrigger => {
        submenuTrigger.addEventListener('click', function(e) {
            // Solo aplicar en móvil
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parentItem = this.parentElement;
                const submenu = parentItem.querySelector('.submenu');
                const isActive = parentItem.classList.contains('active');
                
                // Cerrar todos los submenús primero
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Alternar el submenú actual
                parentItem.classList.toggle('active');
                
                // Animación de altura
                if (submenu) {
                    if (parentItem.classList.contains('active')) {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                }
            }
        });
    });

    // Cerrar menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('nav a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', function() {
            if (mainMenu && mainMenu.classList.contains('show')) {
                mainMenu.classList.remove('show');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                
                // Cerrar todos los submenús
                document.querySelectorAll('.has-submenu').forEach(item => {
                    item.classList.remove('active');
                    const submenu = item.querySelector('.submenu');
                    if (submenu) submenu.style.maxHeight = '0';
                });
            }
        });
    });

    // =============================================
    // Funcionalidad de Búsqueda
    // =============================================
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            if (searchInput.value.trim() !== '') {
                alert(`Buscando: ${searchInput.value}`);
                // Aquí iría la lógica de búsqueda real
                // Ejemplo: window.location.href = `busqueda.html?q=${encodeURIComponent(searchInput.value)}`;
            }
        });
    }

    // =============================================
    // Interacción con Tarjetas de Juegos
    // =============================================
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar que se active si se hace clic en un botón dentro de la tarjeta
            if (!e.target.closest('a, button')) {
                const gameTitle = this.querySelector('h3').textContent;
                alert(`Mostrando detalles de: ${gameTitle}`);
                // Aquí iría la navegación a la página de detalles del juego
                // Ejemplo: window.location.href = `juego-detalle.html?game=${encodeURIComponent(gameTitle)}`;
            }
        });
    });

    // =============================================
    // Sistema de Likes en el Foro
    // =============================================
    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            const likeCount = this.querySelector('.like-count') || this.childNodes[1];
            
            if (likeCount) {
                let countText = likeCount.textContent.trim();
                let count = parseInt(countText) || 0;
                
                if (this.classList.contains('liked')) {
                    count--;
                    this.classList.remove('liked');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                } else {
                    count++;
                    this.classList.add('liked');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
                
                // Actualizar contador
                if (likeCount.classList && likeCount.classList.contains('like-count')) {
                    likeCount.textContent = count;
                } else {
                    likeCount.textContent = ` ${count}`;
                }
            }
        });
    });

    // =============================================
    // Animación de Tarjetas al Cargar
    // =============================================
    const animateCards = () => {
        const cards = document.querySelectorAll('.game-card, .news-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };

    // Inicializar animaciones
    animateCards();

    // =============================================
    // Manejo de Eventos de Ventana
    // =============================================
    window.addEventListener('resize', function() {
        // Cerrar menú móvil si se cambia a desktop
        if (window.innerWidth > 768 && mainMenu && mainMenu.classList.contains('show')) {
            mainMenu.classList.remove('show');
            if (menuToggle) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        }
    });
});