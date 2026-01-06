document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('floating-logo');
    const wrapper = document.querySelector('.hero-logo-wrapper');
    const headerSlot = document.querySelector('.nav-logo-slot');
    
    if (!logo || !wrapper || !headerSlot) return;
    
    let startRect, endRect, scrollStart, scrollEnd;
    let logoOriginalHeight;
    const targetScale = 0.25;
    let isFloating = false;
    let ticking = false;
    
    function calculateMetrics() {
        logo.classList.remove('floating');
        logo.style.cssText = '';
        
        const wrapperRect = wrapper.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        
        startRect = {
            top: wrapperRect.top + window.scrollY + (wrapperRect.height - logoRect.height) / 2,
            left: wrapperRect.left + (wrapperRect.width - logoRect.width) / 2,
            width: logoRect.width,
            height: logoRect.height
        };
        
        logoOriginalHeight = logoRect.height;
        
        const headerSlotRect = headerSlot.getBoundingClientRect();
        const targetHeight = 40;
        const scaledWidth = (logoRect.width / logoRect.height) * targetHeight;
        
        endRect = {
            top: headerSlotRect.top + window.scrollY + (headerSlotRect.height - targetHeight) / 2,
            left: headerSlotRect.left + (headerSlotRect.width - scaledWidth) / 2,
            width: scaledWidth,
            height: targetHeight
        };
        
        scrollStart = startRect.top - 100;
        scrollEnd = startRect.top + logoOriginalHeight;
        
        updateLogo();
    }
    
    function lerp(start, end, t) {
        return start + (end - start) * t;
    }
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
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
        progress = easeOutCubic(progress);
        
        if (!isFloating) {
            logo.classList.add('floating');
            isFloating = true;
        }
        
        const scale = lerp(1, targetScale, progress);
        const currentTop = lerp(startRect.top - scrollY, endRect.top - scrollY, progress);
        const currentLeft = lerp(startRect.left, endRect.left + (endRect.width * (1 - 1/targetScale) * progress / 2), progress);
        
        const offsetX = (startRect.width * (1 - scale)) / 2;
        const offsetY = (startRect.height * (1 - scale)) / 2;
        
        logo.style.top = (currentTop + offsetY) + 'px';
        logo.style.left = (currentLeft + offsetX) + 'px';
        logo.style.transform = `scale(${scale})`;
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
