# Design Spec: About Me Redesign (Image, Typography, & Blend Mode)

This spec details the visual updates for the "About Me" section (found on `index.html` and `about.html`).

## 1. Background Image Asset
* **Source**: `/Users/apple/Downloads/ChatGPT Image Jul 23, 2026 at 12_19_52 AM.png`
* **Destination**: `/Users/apple/Documents/Projects/Rishika Portfolio/portfolio/rishika_portrait_new.png`
* **Style rule update**: 
  In `styles.css` under `#about`, replace:
  `background-image: url('portfolio/rishika_portrait.jpg');`
  with:
  `background-image: url('portfolio/rishika_portrait_new.png');`

## 2. Typography & Blend Mode updates
* **Font Size**:
  Increase marquee name text size from `clamp(4rem, 12vw, 10rem)` to `clamp(6rem, 16vw, 14rem)`.
* **Negative Inversion Effect**:
  Apply `mix-blend-mode: difference;` and `color: #ffffff;` to `.marquee-name-text` to enable real-time negative color inversion on the face and background elements.
* **Vertical Positioning**:
  Move the name text higher. Adjust `.hero-middle-content`'s translate transform on desktop from `translateY(80px)` (shifted down) to `translateY(-60px)` (shifted up to overlap the face).

## 3. Removing Blue Circles / Dots
* **Dots removal**:
  Set `.hero-dot` to `display: none;` to hide the blue/accent circles in the name marquee track.
* **Track adjustment**:
  Adjust `.marquee-item` to have zero gap since the dots are removed:
  ```css
  .marquee-item {
    gap: 0;
  }
  ```
  Ensure a clean text spacing gap of `4rem` in `.marquee-name-track` so the names do not run into each other:
  ```css
  .marquee-name-track {
    gap: 4rem;
    padding-right: 4rem;
  }
  ```

## 4. Verification
* Test the scroll and hover behaviors on `http://localhost:3000/about.html` and `index.html` using the browser.
* Verify responsiveness on desktop and mobile viewports.
