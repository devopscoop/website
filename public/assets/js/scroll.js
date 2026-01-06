document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('floating-logo');
    const wrapper = document.querySelector('.hero-logo-wrapper');
    const headerSlot = document.querySelector('.nav-logo-slot');
    
    if (!logo || !wrapper || !headerSlot) return;
    
    let startRect, headerSlotFixed;
    let logoOriginalHeight, logoOriginalWidth;
    const targetScale = 0.25;
    let isFloating = false;
    let ticking = false;
    let scrollStart, scrollEnd;
    
    function calculateMetrics() {
        logo.classList.remove('floating');
        logo.style.cssText = '';
        
        const wrapperRect = wrapper.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        
        logoOriginalHeight = logoRect.height;
        logoOriginalWidth = logoRect.width;
        
        startRect = {
            top: wrapperRect.top + window.scrollY + (wrapperRect.height - logoRect.height) / 2,
            left: wrapperRect.left + (wrapperRect.width - logoRect.width) / 2
        };
        
        const headerSlotRect = headerSlot.getBoundingClientRect();
        const targetHeight = 40;
        const scaledWidth = (logoRect.width / logoRect.height) * targetHeight;
        
        headerSlotFixed = {
            top: headerSlotRect.top + (headerSlotRect.height - targetHeight) / 2,
            left: headerSlotRect.left + 5
        };
        
        scrollStart = startRect.top - 80;
        scrollEnd = startRect.top + logoOriginalHeight * 0.5;
        
        updateLogo();
    }
    
    function lerp(start, end, t) {
        return start + (end - start) * t;
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function updateLogo() {
        const scrollY = window.scrollY;
        
        if (scrollY <= scrollStart) {
            if (isFloating) {
                logo.classList.remove('floating');
                logo.style.cssText = '';
                isFloating = false;
            }
            return;
        }
        
        let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));
        const easedProgress = easeInOutCubic(progress);
        
        if (!isFloating) {
            logo.classList.add('floating');
            isFloating = true;
        }
        
        const scale = lerp(1, targetScale, easedProgress);
        
        const startViewportTop = startRect.top - scrollY;
        const endViewportTop = headerSlotFixed.top;
        
        const scaledHeight = logoOriginalHeight * scale;
        const scaledWidth = logoOriginalWidth * scale;
        
        const startCenterX = startRect.left + logoOriginalWidth / 2;
        const startCenterY = startViewportTop + logoOriginalHeight / 2;
        
        const endCenterX = headerSlotFixed.left + scaledWidth / 2;
        const endCenterY = endViewportTop + scaledHeight / 2;
        
        const currentCenterX = lerp(startCenterX, endCenterX, easedProgress);
        const currentCenterY = lerp(startCenterY, endCenterY, easedProgress);
        
        const currentTop = currentCenterY - (logoOriginalHeight * scale) / 2;
        const currentLeft = currentCenterX - (logoOriginalWidth * scale) / 2;
        
        logo.style.top = currentTop + 'px';
        logo.style.left = currentLeft + 'px';
        logo.style.transform = `scale(${scale})`;
        logo.style.transformOrigin = 'top left';
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateLogo();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    function onResize() {
        calculateMetrics();
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        
        setTimeout(calculateMetrics, 100);
    }
});
