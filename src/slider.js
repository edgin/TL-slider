import { slideData } from './data.js';

export function renderSlidesAndDots(slider, dotsContainer) {
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    const baseLine = document.createElement('div');
    baseLine.classList.add('tl-slider__line-base');
    dotsContainer.appendChild(baseLine);

    const progressLine = document.createElement('div');
    progressLine.classList.add('tl-slider__line-progress');
    dotsContainer.appendChild(progressLine);

    slideData.forEach((data, i) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `
      <div class="slide-content">
        <div class="text">
            <span class="tag">${data.tag}</span>
            <h1>${data.title}</h1>
            <p>${data.text}</p>
        </div>
        <div class="img">
          <img class="tl-slide__banner-image" draggable="false" src="/assets/img/tl-slide__yellow-banner.png" alt="${data.tag}">
        </div>
      </div>`;
        slider.appendChild(slide);
        if (!data.isIntro) {
        const point = document.createElement('div');
        point.classList.add('tl-slider__point');

        const label = document.createElement('span');
        label.classList.add('tl-slider__year-label');
        label.textContent = data.year;

        const dot = document.createElement('span');
        dot.classList.add('tl-slider__year-dot');
        dot.dataset.index = i;

        point.appendChild(label);
        point.appendChild(dot);
        dotsContainer.appendChild(point);
        }
    });
}
