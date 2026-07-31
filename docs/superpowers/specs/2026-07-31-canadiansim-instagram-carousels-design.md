# CanadianSIM Social Media Instagram Carousels Design Spec

**Date:** 2026-07-31  
**Project ID:** `canadiansim-social`

---

## 1. Goal & Requirements
Implement an interactive, high-fidelity Instagram-style 3-column feed grid on the CanadianSIM Social Media details page.

### Layout Placement
* **On Top (Above Grid):**
  * Heading: "CanadianSIM"
  * Subtitle: "Social Media Management"
  * Tagline/Hook: "Concept to caption to design to post, CanadianSIM's Instagram run start to finish."
* **Middle Section:**
  * Interactive Instagram Feed Grid (3 columns on desktop, 1 column on mobile).
  * Render carousel posts (subfolders `02` through `30`) with swipe capabilities, navigation arrows (visible on hover), and dot indicators.
  * Render single image posts (`01.png`, `21.png`, `23.png`, `31.png`) without navigation overlays.
* **Bottom Section (Below Grid):**
  * Project Narrative / Case Study description.
  * Credit block (Client, Company, Role, Project, Channel).

---

## 2. Interactive Features
* **Post Carousels:** Standard Instagram-like horizontal slide tracks. Users click hover-state left/right arrows to slide between images. Dot indicators at the bottom update actively.
* **Likes & Interaction:** Clicking the heart icon on any post card toggles active/filled state (styled in Instagram red). Double-clicking the image triggers a large scale-up heart animation pop-up in the center of the image.
* **High-Res Lightbox:** Clicking the main image (outside the arrow bounds) opens a clean, full-screen lightbox modal showing the high-resolution image with zooming capabilities and slide navigation.

---

## 3. Data Structure
The project metadata inside `projects-data.js` will represent the posts list dynamically:

```javascript
    "posts": [
      { "id": "01", "type": "single", "images": ["portfolio/canadiansim-social/01.png"] },
      { "id": "02", "type": "carousel", "images": ["portfolio/canadiansim-social/02/01.png", "portfolio/canadiansim-social/02/02.png"] },
      ...
    ]
```

---

## 4. UI/UX Style System (Vanilla CSS & JS)
* **Visuals:** Pure white post cards with subtle `1px solid rgba(0,0,0,0.08)` borders, clean profile avatars (avatar letter "CS"), verified badge SVGs, and Instagram typography elements.
* **Animations:** Smooth CSS transitions for slide offsets (`transform: translateX()`), scaling heart popup overlays, and lightbox fade-ins.
