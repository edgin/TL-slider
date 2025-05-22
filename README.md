## **Timeline Slider Development Documentation**

### **Overview**

This document outlines the development process and technical structure of a custom Timeline Slider built using Vanilla JavaScript, CSS, and Anime.js. The slider features horizontal scrolling, dot-based navigation, and a dynamic timeline line that syncs with slide changes.

***


### **Goals**

- Display a horizontal sequence of slides representing years or events.

- Animate transitions between slides.

- Highlight corresponding timeline dots and update a progress line.

- Enable navigation via buttons and dragging.

- Support theme switching (e.g., yellow/white).

- Contemplate a future enhancement: making the entire timeline appear as one continuous animation for more immersive storytelling.

- Enhance user interaction by animating slide transitions even during drag-based navigation.

***


### **Project Structure**

**HTML**

- A semantic layout with a `tl-slider__section` for the title and toggle.

- A `.tl-slider__wrapper` containing:

  - `.tl-slider__container` (holds `.tl-slider__slider` and nav buttons).

  - `.tl-slider__timeline` (holds dots and timeline lines).

**CSS**

- Custom properties (`:root`) for theming.

- BEM-style class naming.

- Responsive design for mobile support mobile and desktop, breaking point at 768px.

- Animated transitions using `transform`, `transition`, and `anime.js`.

**JavaScript**

- `main.js`: Initializes the slider and event listeners.

- `navigation.js`: Handles slide navigation logic and button clicks.

- `drag.js`: Adds dragging support to the slider.

- `theme.js`: Toggles between visual themes.

- `dots.js`: Manages timeline dot creation and updates.

- `animation.js`: Controls line and slide animations.

***


### **Core Functionalities**

**1. Slide Navigation**

- `slide-next` and `slide-prev` buttons navigate through slides.

- `currentIndex` keeps track of the active slide.

**2. Timeline Dots**

- Dots represent each slide's associated year.

- Clicking a dot navigates to its corresponding slide.

- Active dot is highlighted.

**3. Progress Line Animation**

- A base line and progress line sit behind the dots.

- The progress line expands with each slide change.

**4. Drag to Scroll**

- The user can drag the slider to scroll slides.

- Scroll position updates the `currentIndex` and highlighted dot.

- Future enhancement includes smooth animation during drag events for visual consistency.

**5. Theme Switching**

- A theme toggle switches between yellow and white styles.

- The theme affects background, text, and image assets.

***


### **Notable Implementation Details**

- **Anime.js** is used for animating the progress line and slide transitions.

- **Custom Cursor**: A styled cursor follows the pointer on slider hover.

- **Event Binding**: Modular event listeners are registered in each JS module.

- **Accessibility**: `aria-label`s are added for navigation buttons.

***


### **Future Improvements**

- Add touch gesture support for mobile devices.

- Improve accessibility (e.g., keyboard navigation).

- Load slide content dynamically via JSON or API.

- Add optional autoplay feature.

- Implement a unified timeline entrance animation to reveal the entire timeline as a fluid sequence.

- Introduce drag-based animation to make slide movements smoother and more visually cohesive.

***


### **Credits**

Developed by Luka using Vanilla JavaScript and Anime.js as part of a UI component prototype.

***


### **File Summary**

|                 |                                  |
| :-------------: | :------------------------------: |
|     **File**    |            **Purpose**           |
|   `index.html`  |        Main HTML structure       |
|   `styles.css`  |   Layout, theme, and animations  |
|    `main.js`    | Entry point, initializes modules |
| `navigation.js` |      Slide navigation logic      |
|    `drag.js`    |    Drag-to-scroll interaction    |
|    `theme.js`   |       Theme switching logic      |
|    `dots.js`    |     Dot rendering and updates    |
|  `animation.js` |     Line and slide animations    |
