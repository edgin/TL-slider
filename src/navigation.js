import { animateSlide } from './animation.js';
import anime from 'animejs';

let currentIndex = 0;
let slideWidth = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let startX = 0;
let animationID;
let slider, slides, dotsContainer, slideCount;

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function setSliderPosition(x) {
    slider.style.transform = `translateX(${x}px)`;
}

function goToSlide(index) {
    const lastIndex = slideCount - 1;
    // if (index > lastIndex) index = 0;

    if (index > lastIndex) {
        currentIndex = 0;
        currentTranslate = 0;
        prevTranslate = 0;
    
        const progressBar = document.querySelector('.tl-slider__line-progress');
        if (progressBar) {
            progressBar.style.width = '0px'; // reset progress
        }
    
        // Reset slider visually
        requestAnimationFrame(() => {
            setSliderPosition(0);
            updateYearHighlight();
            updateArrows();
            animateSlide(slides[0]);
    
            // ✅ Manually scroll timeline to beginning
            const scrollContainer = document.querySelector('.tl-slider__timeline-scroll');
            if (scrollContainer) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            }
        });
    
        return;
    }
    

    currentIndex = Math.max(index, 0);
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;

    setSliderPosition(currentTranslate);
    updateYearHighlight();
    updateArrows();
    animateSlide(slides[currentIndex]);
    scrollDotIntoView(currentIndex);
}

function updateArrows() {
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    const lastIndex = slideCount - 1;

    prevBtn.disabled = currentIndex === 0;
    prevBtn.classList.toggle('disabled', currentIndex === 0);

    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
}

function scrollDotIntoView(index) {
    const scrollContainer = document.querySelector('.tl-slider__timeline-scroll');
    const points = document.querySelectorAll('.tl-slider__point');

    if(index===0)return;
    const activeDot = points[index-1];

    if (!scrollContainer || !activeDot) return;

    const containerWidth = scrollContainer.clientWidth;
    const totalScrollWidth = scrollContainer.scrollWidth;

    const dotOffsetLeft = activeDot.offsetLeft;
    const dotWidth = activeDot.offsetWidth;

    const targetScroll = dotOffsetLeft - (containerWidth / 2) + (dotWidth / 2);
    const clampedScroll = Math.max(0, Math.min(targetScroll, totalScrollWidth - containerWidth));

    scrollContainer.scrollTo({ left: clampedScroll, behavior: 'smooth' });
}

function updateYearHighlight() {
    const progressBar = document.querySelector('.tl-slider__line-progress');
    const baseBar = document.querySelector('.tl-slider__line-base');
    const points = document.querySelectorAll('.tl-slider__point');
    const containerRect = dotsContainer.getBoundingClientRect();

    if (!points.length || !progressBar || !baseBar) return;

    const firstDot = points[0].querySelector('.tl-slider__year-dot');
    const lastDot = points[points.length - 1].querySelector('.tl-slider__year-dot');

    const firstRect = firstDot.getBoundingClientRect();
    const lastRect = lastDot.getBoundingClientRect();

    const lineStart = firstRect.left + firstRect.width / 2 - containerRect.left;
    const lineEnd = lastRect.left + lastRect.width / 2 - containerRect.left;
    const fullLineWidth = lineEnd - lineStart;

    baseBar.style.left = `${lineStart}px`;
    baseBar.style.width = `${fullLineWidth}px`;

    points.forEach(point => {
        const dot = point.querySelector('.tl-slider__year-dot');
        const label = point.querySelector('.tl-slider__year-label');
        dot.classList.remove('tl-slider__year-dot--highlighted', 'tl-slider__year-dot--active');
        label.classList.remove('tl-slider__year-label--active');
        void dot.offsetWidth;
    });

    const dotPositions = Array.from(points).map(point => {
        const dot = point.querySelector('.tl-slider__year-dot');
        const rect = dot.getBoundingClientRect();
        return rect.left + rect.width / 2 - containerRect.left;
    });

    if(currentIndex === 0) return;
    const currentDot = points[currentIndex-1].querySelector('.tl-slider__year-dot');
    const currentRect = currentDot.getBoundingClientRect();
    const currentPos = currentRect.left + currentRect.width / 2 - containerRect.left;
    const progressWidth = currentPos - lineStart;

    let alreadyActivated = new Set();
    let lastWidth = 0;

    anime({
        targets: progressBar,
        left: `${lineStart}px`,
        width: progressWidth,
        duration: 400,
        easing: 'easeOutQuad',
        update: () => {
            const currentWidth = parseFloat(progressBar.style.width);
            const direction = currentWidth >= lastWidth ? 'forward' : 'backward';
            lastWidth = currentWidth;

            dotPositions.forEach((dotX, index) => {
                const dot = points[index].querySelector('.tl-slider__year-dot');
                const label = points[index].querySelector('.tl-slider__year-label');
                const dotRelative = dotX - lineStart;

                if (direction === 'forward') {
                    if (!alreadyActivated.has(index) && currentWidth >= dotRelative) {
                        alreadyActivated.add(index);
                        dot.classList.add('tl-slider__year-dot--highlighted');
                        if (index === currentIndex) {
                            dot.classList.add('tl-slider__year-dot--active');
                            label.classList.add('tl-slider__year-label--active');
                        }
                    }
                } else {
                    if (alreadyActivated.has(index) && currentWidth < dotRelative) {
                        alreadyActivated.delete(index);
                        dot.classList.remove('tl-slider__year-dot--highlighted', 'tl-slider__year-dot--active');
                        label.classList.remove('tl-slider__year-label--active');
                    }
                }
            });
        }
    });
}

function animation() {
    setSliderPosition(currentTranslate);
    if (isDragging) requestAnimationFrame(animation);
}

function addEventListeners(prevBtn, nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    slider.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX;
        animationID = requestAnimationFrame(animation);
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate;
    });

    slider.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationID);
            prevTranslate = currentTranslate;
        }
    });

    slider.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const x = e.pageX;
        const dx = x - startX;
        currentTranslate = clamp(prevTranslate + dx, -((slideCount - 1) * slideWidth), 0);

        const index = Math.round(Math.abs(currentTranslate) / slideWidth);
        if (index !== currentIndex) {
            currentIndex = index;
            updateYearHighlight();
            updateArrows();
            scrollDotIntoView(currentIndex);
        }
    });

    slider.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].pageX;
        animationID = requestAnimationFrame(animation);
    });

    slider.addEventListener('touchend', () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate;
    });

    slider.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const x = e.touches[0].pageX;
        const dx = x - startX;
        currentTranslate = clamp(prevTranslate + dx, -((slideCount - 1) * slideWidth), 0);
        updateYearHighlight();
        updateArrows();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    });

    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        currentTranslate = -currentIndex * slideWidth;
        prevTranslate = currentTranslate;
        setSliderPosition(currentTranslate);
        updateYearHighlight();
    });
}

export function initNavigation(sliderEl, dotsEl) {
    slider = sliderEl;
    dotsContainer = dotsEl;
    slides = slider.querySelectorAll('.slide');
    slideWidth = slides[0].offsetWidth;
    slideCount = slides.length;

    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');

    addEventListeners(prevBtn, nextBtn);
    goToSlide(0);
}
