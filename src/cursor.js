export function initCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor', 'theme-yellow');

    const label = document.createElement('span');
    label.classList.add('cursor-label');
    label.textContent = 'drag';
    cursor.appendChild(label);
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const slider = document.querySelector('.slider');
    const buttons = document.querySelectorAll('.slide-prev, .slide-next');

    if (slider) {
        slider.addEventListener('mouseenter', (e) => {
            cursor.style.display = 'block';
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
          });
        slider.addEventListener('mouseleave', () => cursor.style.display = 'none');
    }

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => cursor.style.display = 'none');
        btn.addEventListener('mouseleave', () => cursor.style.display = 'block');
    });
}
