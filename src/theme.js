export function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const sliderContainer = document.querySelector('.tl-slider__slider-wrapper');

    themeToggle.addEventListener('click', () => {
        const isYellowTheme = sliderContainer.classList.contains('theme-yellow');
        const yellowTheme = isYellowTheme ? 'theme-white' : 'theme-yellow';
        const whiteTheme = isYellowTheme ? 'theme-yellow' : 'theme-white';
        const newImageSrc = isYellowTheme
            ? '/assets/img/tl-slide_white-banner.png'
            : '/assets/img/tl-slide__yellow-banner.png';

        sliderContainer.classList.replace(whiteTheme, yellowTheme);
        document.querySelector('.custom-cursor')?.classList.replace(whiteTheme, yellowTheme);

        document.querySelectorAll('.tl-slide__banner-image').forEach(img => {
            img.src = newImageSrc;
        });
    });
}