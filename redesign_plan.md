# Rishika Portfolio Redesign Plan & Tasks

This document tracks the step-by-step updates for the portfolio redesign based on the Gemini meeting notes.

## Active Tasks

- [x] **Task 1: Optimize Dark Mode & persistent Starlight Background**
  - [x] Set body elements of external pages (`index.html`, `about.html`, `projects.html`) to `dark-theme` by default.
  - [x] Update section backgrounds to use `#010101` in `styles.css`.
  - [x] Configure `#particles-canvas` layering (`z-index: 1`) and default opacity (`0.55`) for fixed backgrounds.
  - [x] Prevent particle hiding on scroll in `index.html`.
  - [x] Restrict theme toggle widget in `app.js` to project detail pages only.

- [x] **Task 1.5: Optimize Brands Logo Loop for Dark Mode**
  - [x] Fix left/right fade gradients in `styles.css` to end in `transparent` instead of white-opaque.
  - [x] Make logo label text colors white dynamically in `styles.css` in dark mode.
  - [x] Adjust Scribble wobbly SVG text fill to white/grey.
  - [x] Adjust Fido house logo stroke lines to white.

- [x] **Task 2: Redesign About Me Section & Page**
  - [x] Modify `#about::before` in `styles.css` to add a dark overlay (`rgba(0, 0, 0, 0.5)`) to darken the background profile image (`portfolio/rishika_portrait.jpg`).
  - [x] Remove or transparency-override `.hero-dot` dot separators in name marquee within `about.html` and `index.html`.
  - [x] Remove any other yellow circle dividers from the layouts.

- [ ] **Task 3: Rogers Project Restructuring**
  - [ ] Update `projects-data.js` for the Rogers project (`id: "rogers-fido-chatr"`) to standardize layout content (brand system details, project description, role breakdown).
  - [ ] Embed the three AI-generated campaign videos in CSS mobile mockups.
  - [ ] Ensure proper resizing and responsive displays of these videos.

- [ ] **Task 4: Airtel Black Email Campaign Layout**
  - [ ] Update `projects-data.js` for Airtel Black (`id: "airtel-black"`) to use a scrolling mobile mockup layout.
  - [ ] Implement side-by-side scrolling phone mockups in `project.html` for presenting email campaign designs.

- [ ] **Task 5: Kiara Jewelry Project Setup**
  - [ ] Add the Kiara Jewelry project entry in `projects-data.js` pointing to `portfolio/khimji/kiara_ad.png`.
  - [ ] Add the project link to the home page (`index.html`) grid or the projects list (`projects.html`).

- [ ] **Task 6: Standardize Project Detail Pages**
  - [ ] Update `project.html` logic to render horizontal 3-image side-by-side grids.
  - [ ] Remove extra slide wrappers and display headers directly.
  - [ ] Ensure AI descriptions and notes are displayed on relevant projects.
