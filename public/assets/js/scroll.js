document.addEventListener('DOMContentLoaded', function() {
    const heroLogo = document.querySelector('.hero-logo');
    let scrollThreshold = 100;
    
    if (heroLogo) {
        scrollThreshold = heroLogo.offsetTop + heroLogo.offsetHeight;
    }
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});
