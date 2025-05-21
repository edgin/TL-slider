
import anime from 'animejs';

export function animateSlide(slideEl) {
    const tag = slideEl.querySelector('.tag');
    const heading = slideEl.querySelector('h1');
    const paragraph = slideEl.querySelector('p');
    const image = slideEl.querySelector('img');

    anime.timeline({ easing: 'easeOutExpo', duration: 500 })
        .add({ targets: slideEl, opacity: [0, 1], scale: [0.95, 1], duration: 400 })
        .add({ targets: tag, opacity: [0, 1], translateX: [-40, 0] }, '-=200')
        .add({ targets: heading, opacity: [0, 1], translateX: [-40, 0] }, '-=250')
        .add({ targets: image, opacity: [0, 1], scale: [0.95, 1] , duration: 400}, '-=100')
        .add({ targets: paragraph, opacity: [0, 1], translateX: [-40, 0] }, '-=300');
        
}