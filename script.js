document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const cover = document.querySelector('.cover');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const closeBtn = document.getElementById('close-btn');
    
    let currentPage = 0;
    let isOpen = false;
    
    // Initial setup - only the cover is visible
    function initBook() {
        pages.forEach((page, index) => {
            if (index === 0) {
                page.classList.add('active');
                page.style.pointerEvents = 'auto'; // Habilitamos eventos en la página activa
            } else {
                page.classList.remove('active');
                page.style.pointerEvents = 'none'; // Deshabilitamos eventos en páginas inactivas
            }
        });
        
        updateButtons();
    }
    
    // Toggle book open/closed
    function toggleBook() {
        if (!isOpen) {
            book.classList.add('open');
            isOpen = true;
            // Aseguramos que la página actual tenga interacción habilitada
            pages[currentPage].style.pointerEvents = 'auto';
            updateButtons();
        }
    }
    
    // Close the book
    function closeBook() {
        book.classList.remove('open');
        isOpen = false;
        currentPage = 0;
        initBook();
    }
    
    // Navigate to previous page
    function prevPage() {
        if (currentPage > 0) {
            pages[currentPage].classList.remove('active');
            pages[currentPage].style.pointerEvents = 'none'; // Deshabilitamos eventos en la página anterior
            currentPage--;
            pages[currentPage].classList.add('active');
            pages[currentPage].style.pointerEvents = 'auto'; // Habilitamos eventos en la nueva página activa
            updateButtons();
        }
    }
    
    // Navigate to next page
    function nextPage() {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.remove('active');
            pages[currentPage].style.pointerEvents = 'none'; // Deshabilitamos eventos en la página anterior
            currentPage++;
            pages[currentPage].classList.add('active');
            pages[currentPage].style.pointerEvents = 'auto'; // Habilitamos eventos en la nueva página activa
            updateButtons();
        }
    }
    
    // Update button states based on current page
    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pages.length - 1;
    }
    
    // Función para hacer scroll con rueda del mouse
    function handleScroll(event) {
        // Solo procesar el evento si el libro está abierto
        if (isOpen) {
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                // El scroll se manejará automáticamente
                event.stopPropagation();
            }
        }
    }
    
    // Event listeners
    cover.addEventListener('click', toggleBook);
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    closeBtn.addEventListener('click', closeBook);
    document.addEventListener('wheel', handleScroll, { passive: true });
    
    // Manejar teclado para scroll
    document.addEventListener('keydown', function(e) {
        if (isOpen) {
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                if (e.key === 'ArrowDown') {
                    activePage.scrollBy(0, 40); // Scroll hacia abajo
                } else if (e.key === 'ArrowUp') {
                    activePage.scrollBy(0, -40); // Scroll hacia arriba
                }
            }
        }
    });
    
    // Verificar si las imágenes existen
    function checkImages() {
        const images = document.querySelectorAll('.emotion-gif');
        
        images.forEach(img => {
            img.onerror = function() {
                console.error("Error cargando imagen: " + img.src);
                img.style.display = 'none';
            };
        });
    }
    
    // Comprobar las imágenes después de cargar la página
    checkImages();
    
    // Hacer que todas las páginas sean interactivas para el scroll
    pages.forEach(page => {
        // Aseguramos que los eventos de scroll funcionen
        page.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        page.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
    });
    
    // Inicializar
    initBook();
});