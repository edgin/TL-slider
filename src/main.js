import './styles/style.scss';

import { renderSlidesAndDots } from './slider.js';
import { initNavigation } from './navigation.js';
import { initCursor } from './cursor.js';
import { initThemeToggle } from './theme.js';

const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.tl-slider__timeline');

renderSlidesAndDots(slider, dotsContainer);

initNavigation(slider, dotsContainer);
initCursor();
initThemeToggle();
