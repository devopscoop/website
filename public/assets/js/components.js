document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                highlightCurrentPage();
            });
    }
    
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            });
    }
    
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
            if (currentPage === 'index.html' && href === 'index.html') {
                return;
            }
        });
    }
});
