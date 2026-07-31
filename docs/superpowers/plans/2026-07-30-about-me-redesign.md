# About Me Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the About Me section layout by using a new background image, enlarging marquee typography, positioning text higher up to cross the face, hiding blue dots, and styling the text with a negative color blend mode at all times.

**Architecture:** We will copy the new image asset to `portfolio/rishika_portrait_new.png`, update the CSS rules for `#about` and its child selectors in `styles.css` to hide the marquee dots, scale the text font size, shift the name track vertical layout position upwards on desktop/mobile, and apply `mix-blend-mode: difference;` for color inversion over the background portrait.

**Tech Stack:** Vanilla HTML, Vanilla CSS, JS

## Global Constraints
* New Background Image: `portfolio/rishika_portrait_new.png`
* Hide accent dots: `.hero-dot { display: none; }`
* Increased font size: `clamp(6rem, 16vw, 14rem)`
* Blend mode: `mix-blend-mode: difference;`
* Position shift: `.hero-middle-content` translates upwards (e.g. `translateY(-60px)`) to overlap the portrait face on desktop.

---

### Task 1: Background Portrait Image Copy

**Files:**
- Create: `portfolio/rishika_portrait_new.png`

**Interfaces:**
- Produces: `portfolio/rishika_portrait_new.png` asset referenced in CSS.

- [ ] **Step 1: Copy the source image from Downloads to portfolio directory**

  Run:
  ```bash
  cp "/Users/apple/Downloads/ChatGPT Image Jul 23, 2026 at 12_19_52 AM.png" "/Users/apple/Documents/Projects/Rishika Portfolio/portfolio/rishika_portrait_new.png"
  ```

- [ ] **Step 2: Verify copy completion and image size**

  Run:
  ```bash
  ls -la "/Users/apple/Documents/Projects/Rishika Portfolio/portfolio/rishika_portrait_new.png"
  ```
  Expected: File exists at path with size around 1.77 MB.

- [ ] **Step 3: Commit the new asset**

  Run:
  ```bash
  git add "/Users/apple/Documents/Projects/Rishika Portfolio/portfolio/rishika_portrait_new.png"
  git commit -m "assets: add new about portrait image"
  ```

---

### Task 2: Update CSS Styles for Marquee, Position, and Blend Mode

**Files:**
- Modify: `styles.css:1164-1285`

**Interfaces:**
- Consumes: `portfolio/rishika_portrait_new.png`
- Produces: CSS rules for `#about`, `.marquee-name-text`, `.hero-dot`, and `.marquee-item` / `.marquee-name-track`.

- [ ] **Step 1: Modify `#about` in styles.css to load the new image background**

  Update `#about`'s `background-image` property to use `'portfolio/rishika_portrait_new.png'` instead of `'portfolio/rishika_portrait.jpg'`.

- [ ] **Step 2: Hide marquee separator dots**

  Add rule to `.hero-dot` (or update it):
  ```css
  .hero-dot {
    display: none;
  }
  ```

- [ ] **Step 3: Adjust marquee item and track gap widths**

  Ensure `.marquee-item` has `gap: 0;` and `.marquee-name-track` has `gap: 4rem; padding-right: 4rem;` so the texts spacing behaves nicely without the dots.

- [ ] **Step 4: Update name text font size and blend mode**

  Update `.marquee-name-text` style:
  ```css
  .marquee-name-text {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(6rem, 16vw, 14rem);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1;
    mix-blend-mode: difference;
  }
  ```

- [ ] **Step 5: Move middle content track higher up to cover face**

  Update `.hero-middle-content`'s translate transform from `translateY(80px)` to `translateY(-60px)` (or adjust to align nicely over the background face).

- [ ] **Step 6: Verify CSS changes by running dev check**

  Check page display on `http://localhost:3000/about.html` and `index.html`.

- [ ] **Step 7: Commit CSS updates**

  Run:
  ```bash
  git add "/Users/apple/Documents/Projects/Rishika Portfolio/styles.css"
  git commit -m "style: redesign about me layout with difference mix-blend-mode, larger font, and new background portrait"
  ```
