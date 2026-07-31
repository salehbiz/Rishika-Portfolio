# CanadianSIM Social Media Instagram Carousels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the CanadianSIM Social Media details page into a premium 3-column Instagram-style feed mockup on desktop view, where each post supports horizontal swipe carousel controls, with case study narrative copy and credit blocks sitting below the feed.

**Architecture:** 
1. Update `projects-data.js` to change the layout to `instagram-grid` for `canadiansim-social`, clean the image assets path, and add a structured array of 32 posts (both carousels and single images).
2. Modify `project.html` to add custom CSS/JS for rendering the Instagram mockup grid, horizontal slide swiping, indicator dots, hover navigation arrows, double-click heart animations, and a high-resolution lightbox modal.
3. Reposition the narrative copy and credits section to render at the bottom of the page, beneath the carousels grid.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6), CSS Grid

## Global Constraints
* Title: "CanadianSIM"
* Subtitle: "Social Media Management"
* Top Tagline: "Concept to caption to design to post, CanadianSIM's Instagram run start to finish."
* Post grid layout: 3 columns on desktop, 1 column on mobile.
* Carousel image directories: `portfolio/canadiansim-social/` containing folders `02` through `30` (except `21`) and files `01.png`, `21.png`, `23.png`, `31.png`.

---

### Task 1: Update CanadianSIM Social Project Data Structure

**Files:**
- Modify: `projects-data.js:103-184`

**Interfaces:**
- Produces: Corrected layout parameter and `instagramPosts` database array containing 32 posts configurations.

- [ ] **Step 1: Edit the `canadiansim-social` project configuration in `projects-data.js`**

  Replace the `canadiansim-social` project object properties to set the new layout type `instagram-grid`, cover image thumbnail, and add the `instagramPosts` array of posts:
  ```javascript
  {
    "id": "canadiansim-social",
    "title": "CanadianSIM",
    "client": "CanadianSIM",
    "company": "Wireless DNA Inc.",
    "category": "media",
    "categoryLabel": "Video & Media",
    "scope": "Social Media Management",
    "description": "Owned CanadianSIM's Instagram end to end, concept, copywriting, creative execution, and daily posting and scheduling, with full creative control over how the brand looked, sounded, and felt online. Set the tone for the account, establishing a consistent visual and voice identity that carried across every post. Concepts were developed independently, then written up into post captions and copy using Claude. Sourcing shifted depending on what each concept needed, stock photography for some creatives, AI-generated visuals using ChatGPT Pro for others. Static content led the page, but video ran alongside it: short-form customer testimonials shot and edited in CapCut, and static visuals brought to life using Seedance 2.0 to animate them into motion content. Grew the account from roughly 18,500 to 19,000 followers over the course of managing the page.",
    "image": "portfolio/canadiansim-social/homepage_thumb_opt.jpg",
    "fileLink": "portfolio/canadiansim-social/homepage_thumb_opt.jpg",
    "fileType": "image",
    "fileLabel": "View Asset",
    "layout": "instagram-grid",
    "instagramPosts": [
      { "id": "01", "type": "single", "images": ["portfolio/canadiansim-social/01.png"] },
      { "id": "02", "type": "carousel", "images": ["portfolio/canadiansim-social/02/01.png", "portfolio/canadiansim-social/02/02.png"] },
      { "id": "03", "type": "carousel", "images": ["portfolio/canadiansim-social/03/01.png", "portfolio/canadiansim-social/03/02.png"] },
      { "id": "04", "type": "carousel", "images": ["portfolio/canadiansim-social/04/01.png", "portfolio/canadiansim-social/04/02.png"] },
      { "id": "05", "type": "carousel", "images": ["portfolio/canadiansim-social/05/01.png", "portfolio/canadiansim-social/05/02.png"] },
      { "id": "06", "type": "carousel", "images": ["portfolio/canadiansim-social/06/01.png", "portfolio/canadiansim-social/06/02.png"] },
      { "id": "07", "type": "carousel", "images": ["portfolio/canadiansim-social/07/01.png", "portfolio/canadiansim-social/07/02.png"] },
      { "id": "08", "type": "carousel", "images": ["portfolio/canadiansim-social/08/01.png", "portfolio/canadiansim-social/08/02.png"] },
      { "id": "09", "type": "carousel", "images": ["portfolio/canadiansim-social/09/01.png", "portfolio/canadiansim-social/09/02.png"] },
      { "id": "10", "type": "carousel", "images": ["portfolio/canadiansim-social/10/01.png", "portfolio/canadiansim-social/10/02.png"] },
      { "id": "11", "type": "carousel", "images": ["portfolio/canadiansim-social/11/01.png", "portfolio/canadiansim-social/11/02.png"] },
      { "id": "12", "type": "carousel", "images": ["portfolio/canadiansim-social/12/01.png", "portfolio/canadiansim-social/12/02.png"] },
      { "id": "13", "type": "carousel", "images": ["portfolio/canadiansim-social/13/01.png", "portfolio/canadiansim-social/13/02.png"] },
      { "id": "14", "type": "carousel", "images": ["portfolio/canadiansim-social/14/01.png", "portfolio/canadiansim-social/14/02.png"] },
      { "id": "15", "type": "carousel", "images": ["portfolio/canadiansim-social/15/01.png", "portfolio/canadiansim-social/15/02.png", "portfolio/canadiansim-social/15/03.png", "portfolio/canadiansim-social/15/04.png"] },
      { "id": "16", "type": "carousel", "images": ["portfolio/canadiansim-social/16/01.png", "portfolio/canadiansim-social/16/02.png"] },
      { "id": "17", "type": "carousel", "images": ["portfolio/canadiansim-social/17/01.png", "portfolio/canadiansim-social/17/02.png"] },
      { "id": "18", "type": "carousel", "images": ["portfolio/canadiansim-social/18/01.png", "portfolio/canadiansim-social/18/02.png"] },
      { "id": "19", "type": "carousel", "images": ["portfolio/canadiansim-social/19/01.png", "portfolio/canadiansim-social/19/02.png", "portfolio/canadiansim-social/19/03.png"] },
      { "id": "20", "type": "carousel", "images": ["portfolio/canadiansim-social/20/01.png", "portfolio/canadiansim-social/20/02.png"] },
      { "id": "21", "type": "single", "images": ["portfolio/canadiansim-social/21.png"] },
      { "id": "22", "type": "carousel", "images": ["portfolio/canadiansim-social/22/01.png", "portfolio/canadiansim-social/22/02.png"] },
      { "id": "23_single", "type": "single", "images": ["portfolio/canadiansim-social/23.png"] },
      { "id": "23_carousel", "type": "carousel", "images": ["portfolio/canadiansim-social/23/01.png", "portfolio/canadiansim-social/23/02.png"] },
      { "id": "24", "type": "carousel", "images": ["portfolio/canadiansim-social/24/01.png", "portfolio/canadiansim-social/24/02.png"] },
      { "id": "25", "type": "carousel", "images": ["portfolio/canadiansim-social/25/01.png", "portfolio/canadiansim-social/25/02.png"] },
      { "id": "26", "type": "carousel", "images": ["portfolio/canadiansim-social/26/01.png", "portfolio/canadiansim-social/26/02.png"] },
      { "id": "27", "type": "carousel", "images": ["portfolio/canadiansim-social/27/01.png", "portfolio/canadiansim-social/27/02.png"] },
      { "id": "28", "type": "carousel", "images": ["portfolio/canadiansim-social/28/01.png", "portfolio/canadiansim-social/28/02.png"] },
      { "id": "29", "type": "carousel", "images": ["portfolio/canadiansim-social/29/01.png", "portfolio/canadiansim-social/29/02.png"] },
      { "id": "30", "type": "carousel", "images": ["portfolio/canadiansim-social/30/01.png", "portfolio/canadiansim-social/30/02.png", "portfolio/canadiansim-social/30/03.png"] },
      { "id": "31", "type": "single", "images": ["portfolio/canadiansim-social/31.png"] }
    ]
  }
  ```

- [ ] **Step 2: Commit data changes**

  Run:
  ```bash
  git add projects-data.js
  git commit -m "data: change canadiansim-social layout to instagram-grid and configure structured posts array"
  ```

---

### Task 2: Implement Instagram Grid Renderer and Interactive JS in `project.html`

**Files:**
- Modify: `project.html`

**Interfaces:**
- Consumes: `project.instagramPosts` configuration list from `projects-data.js`.
- Produces: Inline styling overrides and JS script blocks rendering the interactive feed and bottom narratives layout.

- [ ] **Step 1: Add layout rendering cases in `project.html`**

  Under the existing layout conditional checks (e.g. around `project.layout === 'web-layout'`), add a block for `project.layout === 'instagram-grid'`. 
  This block will output:
  1. The custom project heading, category label, and the top hook: *"Concept to caption to design to post, CanadianSIM's Instagram run start to finish."*
  2. The Instagram Mockup Grid (`instagram-grid-container`) containing the 32 post cards.
  3. Interactive elements (arrows, dots, headers) inside carousel items.
  4. The narrative case study columns and credit details at the bottom of the layout, below the grid.
  
  ```javascript
  if (project.layout === 'instagram-grid') {
    // 1. Top Header HTML
    const headerHTML = `
      <div class="project-top-header" style="margin-bottom: 3rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; padding-top: 1rem;">
        <span class="project-title-tag" style="margin-bottom: 0.5rem; letter-spacing: 0.15em; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #777777;">${project.categoryLabel}</span>
        <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 500; text-transform: uppercase; margin: 0 0 1rem; color: #1a1a1a; letter-spacing: 0.03em;">${project.title}</h1>
        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; font-weight: 500; color: #333333; max-width: 650px; margin: 0 auto; line-height: 1.6; font-style: italic;">
          "Concept to caption to design to post, CanadianSIM's Instagram run start to finish."
        </p>
      </div>
    `;

    // 2. Build Feed Post Cards
    const postsHTML = project.instagramPosts.map((post, postIdx) => {
      const isCarousel = post.type === 'carousel';
      const slidesHTML = post.images.map((imgUrl, slideIdx) => `
        <div class="insta-slide" style="flex: 0 0 100%; width: 100%; height: 100%; position: relative; overflow: hidden; background: #fafafa;">
          <img src="${imgUrl}" alt="Post ${post.id} slide ${slideIdx + 1}" style="width: 100%; height: 100%; object-fit: cover;" class="insta-media" data-post-idx="${postIdx}" data-slide-idx="${slideIdx}">
        </div>
      `).join('');

      const dotIndicatorsHTML = isCarousel ? `
        <div class="insta-carousel-dots" style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 4px; z-index: 10;">
          ${post.images.map((_, idx) => `
            <span class="insta-dot ${idx === 0 ? 'active' : ''}" style="width: 6px; height: 6px; border-radius: 50%; background: ${idx === 0 ? '#0095f6' : 'rgba(255,255,255,0.6)'}; transition: all 0.2s;"></span>
          `).join('')}
        </div>
      ` : '';

      const arrowsHTML = isCarousel ? `
        <button class="insta-nav-btn prev-btn" style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px; border-radius: 50%; border: none; background: rgba(255,255,255,0.85); color: #000; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.2s; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">❮</button>
        <button class="insta-nav-btn next-btn" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px; border-radius: 50%; border: none; background: rgba(255,255,255,0.85); color: #000; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.2s; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">❯</button>
      ` : '';

      const slideCounterHTML = isCarousel ? `
        <div class="insta-slide-counter" style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 0.65rem; font-family: 'Inter', sans-serif; font-weight: 600; z-index: 10; pointer-events: none;">
          1/${post.images.length}
        </div>
      ` : '';

      return `
        <div class="instagram-post-card" style="background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column; width: 100%; transition: transform 0.3s ease;">
          <!-- Post Header -->
          <div style="display: flex; align-items: center; padding: 10px 14px; gap: 10px; border-bottom: 1px solid rgba(0,0,0,0.04);">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #e02424; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; font-family: 'Inter', sans-serif;">CS</div>
            <div style="flex: 1; line-height: 1.2;">
              <div style="font-weight: 700; font-size: 0.8rem; color: #1a1a1a; display: flex; align-items: center; gap: 4px;">
                canadiansimglobal
                <svg style="width: 12px; height: 12px; fill: #0095f6;" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <span style="font-size: 0.7rem; color: #777777;">Canada</span>
            </div>
            <svg style="width: 16px; height: 16px; color: #8e8e8e;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </div>

          <!-- Media Viewport -->
          <div class="insta-media-viewport" style="position: relative; width: 100%; aspect-ratio: 1; overflow: hidden;" data-post-idx="${postIdx}">
            <div class="insta-slides-track" style="display: flex; width: 100%; height: 100%; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);">
              ${slidesHTML}
            </div>
            ${dotIndicatorsHTML}
            ${arrowsHTML}
            ${slideCounterHTML}
            <!-- Large Heart Double-Click Animation -->
            <div class="heart-popup" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0); opacity: 0; pointer-events: none; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s; z-index: 12; color: #ffffff;">
              <svg style="width: 70px; height: 70px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          </div>

          <!-- Action Bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; color: #1a1a1a;">
            <div style="display: flex; gap: 14px; align-items: center;">
              <button class="insta-like-btn" style="border: none; background: transparent; padding: 0; cursor: pointer; color: inherit; display: flex; align-items: center; transition: transform 0.2s;">
                <svg style="width: 24px; height: 24px;" class="heart-icon-svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
              <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <svg style="width: 22px; height: 22px; transform: rotate(-20deg);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </div>
            <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          </div>

          <!-- Likes and Caption -->
          <div style="padding: 0 14px 14px; font-family: 'Inter', sans-serif; font-size: 0.8rem; line-height: 1.45; text-align: left;">
            <div style="font-weight: 700; color: #1a1a1a; margin-bottom: 4px;" class="insta-likes-label">127 likes</div>
            <span style="font-weight: 700; color: #1a1a1a; margin-right: 6px;">canadiansimglobal</span>
            <span style="color: #444444;">Visual concept & copywriting execution. #canadiansim</span>
          </div>
        </div>
      `;
    }).join('');

    // 3. Narrative & Credits block layout (Rendered Bottom Section)
    const bottomDetailsHTML = `
      <div class="project-bottom-details" style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 4rem; margin-top: 4rem;">
        <div style="display: flex; flex-direction: row; gap: 4rem; align-items: flex-start;" class="bottom-split-container">
          <div style="width: 60%; text-align: left;" class="bottom-desc-col">
            <h2 style="font-family:'Cormorant Garamond', serif; font-size: 2.25rem; font-weight:500; text-transform: uppercase; margin-top: 0; margin-bottom: 2rem; color: #1a1a1a; letter-spacing: 0.02em;">Project Narrative</h2>
            <div class="project-description-text" style="font-family:'Inter', sans-serif; font-size:1.05rem; line-height:1.75; color:#444444; margin-bottom:2rem;">
              ${project.description}
            </div>
          </div>
          
          <div style="width: 40%;" class="bottom-meta-col">
            <div style="background: #f8fafc; border: 1px solid rgba(0,0,0,0.06); padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
              <h3 style="font-family:'Inter', sans-serif; font-size:0.9rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-top:0; margin-bottom:1.5rem; color:#1a1a1a; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom:0.75rem;">Project Details</h3>
              <div style="display: flex; flex-direction: column; gap: 1.5rem; text-align: left;">
                <div>
                  <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Client</strong>
                  <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">${project.client}</span>
                </div>
                <div>
                  <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Company</strong>
                  <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">${project.company}</span>
                </div>
                <div>
                  <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Project</strong>
                  <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">Social Media Management</span>
                </div>
                <div>
                  <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Role</strong>
                  <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">Concept, Copywriting, Content Creation, Scheduling</span>
                </div>
                <div>
                  <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Channel</strong>
                  <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">Instagram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 4. Assemble Whole Container
    container.innerHTML = `
      ${headerHTML}
      <div class="instagram-grid-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 3rem auto 6rem; padding: 0 1rem; box-sizing: border-box;">
        ${postsHTML}
      </div>
      ${bottomDetailsHTML}
      
      <!-- Fullscreen Image Lightbox Modal -->
      <div id="insta-lightbox" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(15,15,15,0.95); display:none; justify-content:center; align-items:center; z-index:9999; opacity:0; transition: opacity 0.3s ease;">
        <button id="lightbox-close" style="position:absolute; top:20px; right:20px; border:none; background:transparent; color:#fff; font-size:2rem; cursor:pointer;">&times;</button>
        <button id="lightbox-prev" style="position:absolute; left:20px; border:none; background:rgba(255,255,255,0.1); color:#fff; font-size:1.5rem; width:44px; height:44px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s;">❮</button>
        <button id="lightbox-next" style="position:absolute; right:20px; border:none; background:rgba(255,255,255,0.1); color:#fff; font-size:1.5rem; width:44px; height:44px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s;">❯</button>
        <div id="lightbox-content" style="max-width:85%; max-height:85%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <img id="lightbox-img" src="" style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:4px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          <div id="lightbox-caption" style="color:rgba(255,255,255,0.7); margin-top:15px; font-family:'Inter',sans-serif; font-size:0.85rem;">Slide X of Y</div>
        </div>
      </div>
    `;

    // 5. Initialize Interactive Scripts
    initInstagramInteractions(project.instagramPosts);
  }
  ```

- [ ] **Step 2: Add interactive JS event handler function `initInstagramInteractions` in `project.html`**

  Inside the script section of `project.html`, define the `initInstagramInteractions` function to manage:
  1. Horizontal slider offsets and dot styles for each post card container.
  2. Double-click heart popup and active toggle of the heart SVG inside the action bar.
  3. Image hover navigation buttons visibility.
  4. Lightbox click triggers, close buttons, and left/right slide navigation overlays.

  ```javascript
  function initInstagramInteractions(posts) {
    // A. Setup Swipes & Dot indicator updates
    const cardContainers = document.querySelectorAll('.instagram-post-card');
    cardContainers.forEach((card) => {
      const viewport = card.querySelector('.insta-media-viewport');
      if (!viewport) return;
      const postIdx = parseInt(viewport.getAttribute('data-post-idx'));
      const post = posts[postIdx];
      if (post.type !== 'carousel') return;

      const track = viewport.querySelector('.insta-slides-track');
      const dots = viewport.querySelectorAll('.insta-dot');
      const counter = viewport.querySelector('.insta-slide-counter');
      const btnPrev = viewport.querySelector('.prev-btn');
      const btnNext = viewport.querySelector('.next-btn');

      let currentSlide = 0;
      const totalSlides = post.images.length;

      // Arrows Hover show/hide
      viewport.addEventListener('mouseenter', () => {
        if (currentSlide > 0) btnPrev.style.opacity = '1';
        if (currentSlide < totalSlides - 1) btnNext.style.opacity = '1';
      });
      viewport.addEventListener('mouseleave', () => {
        btnPrev.style.opacity = '0';
        btnNext.style.opacity = '0';
      });

      const updateSlider = () => {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Dots update
        dots.forEach((dot, idx) => {
          dot.style.background = idx === currentSlide ? '#0095f6' : 'rgba(255,255,255,0.6)';
        });
        // Counter update
        if (counter) counter.textContent = `${currentSlide + 1}/${totalSlides}`;
        
        // Button opacity checks during hover
        btnPrev.style.opacity = currentSlide === 0 ? '0' : '1';
        btnNext.style.opacity = currentSlide === totalSlides - 1 ? '0' : '1';
      };

      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentSlide > 0) {
          currentSlide--;
          updateSlider();
        }
      });

      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSlider();
        }
      });
    });

    // B. Like Triggers (Single click on SVG, Double click on image)
    cardContainers.forEach((card) => {
      const viewport = card.querySelector('.insta-media-viewport');
      const likeBtn = card.querySelector('.insta-like-btn');
      const heartSvg = likeBtn ? likeBtn.querySelector('.heart-icon-svg') : null;
      const likesLabel = card.querySelector('.insta-likes-label');
      const heartPopup = card.querySelector('.heart-popup');

      let isLiked = false;
      let likesCount = 127;

      const toggleLike = () => {
        isLiked = !isLiked;
        if (isLiked) {
          likesCount++;
          if (heartSvg) {
            heartSvg.setAttribute('fill', '#ef4444');
            heartSvg.setAttribute('stroke', '#ef4444');
          }
          if (likeBtn) likeBtn.style.transform = 'scale(1.2)';
          setTimeout(() => { if (likeBtn) likeBtn.style.transform = 'scale(1)'; }, 200);
        } else {
          likesCount--;
          if (heartSvg) {
            heartSvg.setAttribute('fill', 'none');
            heartSvg.setAttribute('stroke', 'currentColor');
          }
        }
        if (likesLabel) likesLabel.textContent = `${likesCount} likes`;
      };

      if (likeBtn) likeBtn.addEventListener('click', toggleLike);

      // Double-click on images inside track
      const imgs = card.querySelectorAll('.insta-media');
      imgs.forEach(img => {
        img.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          if (!isLiked) toggleLike();
          
          if (heartPopup) {
            heartPopup.style.transform = 'translate(-50%, -50%) scale(1)';
            heartPopup.style.opacity = '0.9';
            setTimeout(() => {
              heartPopup.style.transform = 'translate(-50%, -50%) scale(0)';
              heartPopup.style.opacity = '0';
            }, 600);
          }
        });
      });
    });

    // C. Fullscreen Lightbox logic
    const lightbox = document.getElementById('insta-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let allMediaImages = [];
    let currentLightboxIdx = 0;

    // Collect all image URLs in structural order of the layout feed
    posts.forEach((post) => {
      post.images.forEach(imgUrl => {
        allMediaImages.push(imgUrl);
      });
    });

    const openLightbox = (idx) => {
      currentLightboxIdx = idx;
      lightboxImg.src = allMediaImages[currentLightboxIdx];
      lightboxCaption.textContent = `Asset ${currentLightboxIdx + 1} of ${allMediaImages.length}`;
      lightbox.style.display = 'flex';
      setTimeout(() => {
        lightbox.style.opacity = '1';
      }, 50);
    };

    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
    };

    // Attach click events on images for Lightbox triggers
    const mediaImages = document.querySelectorAll('.insta-media');
    mediaImages.forEach((img, index) => {
      img.addEventListener('click', (e) => {
        // Only trigger if click wasn't on slider nav controls
        if (e.target.classList.contains('insta-media')) {
          openLightbox(index);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        if (currentLightboxIdx > 0) {
          currentLightboxIdx--;
          lightboxImg.src = allMediaImages[currentLightboxIdx];
          lightboxCaption.textContent = `Asset ${currentLightboxIdx + 1} of ${allMediaImages.length}`;
        }
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        if (currentLightboxIdx < allMediaImages.length - 1) {
          currentLightboxIdx++;
          lightboxImg.src = allMediaImages[currentLightboxIdx];
          lightboxCaption.textContent = `Asset ${currentLightboxIdx + 1} of ${allMediaImages.length}`;
        }
      });
    }

    // Keyboard bindings for convenience
    document.addEventListener('keydown', (e) => {
      if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentLightboxIdx > 0) lightboxPrev.click();
        if (e.key === 'ArrowRight' && currentLightboxIdx < allMediaImages.length - 1) lightboxNext.click();
      }
    });

    // Close on click outside content image area
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  ```

- [ ] **Step 3: Append custom styles inside `project.html` stylesheet block**

  Insert rules inside the CSS segment of `project.html` (or `styles.css`) to format the grid and hover overlay transitions:
  ```css
  /* Instagram Feed Mockup Grid rules */
  .instagram-grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 992px) {
    .instagram-grid-container {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
    }
  }
  @media (max-width: 640px) {
    .instagram-grid-container {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    .bottom-split-container {
      flex-direction: column !important;
    }
    .bottom-desc-col, .bottom-meta-col {
      width: 100% !important;
    }
  }

  /* Slider nav hover transitions */
  .insta-media-viewport:hover .insta-nav-btn {
    opacity: 0.85;
  }
  .insta-media-viewport:hover .prev-btn {
    opacity: 0.85;
  }
  .insta-media-viewport:hover .next-btn {
    opacity: 0.85;
  }
  .insta-nav-btn:hover {
    background: #ffffff !important;
    opacity: 1 !important;
  }
  
  /* Zoom styles for images in grid and hover states */
  .insta-media {
    cursor: zoom-in;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .insta-media:hover {
    transform: scale(1.02);
  }
  ```

- [ ] **Step 4: Commit UI changes inside project.html**

  Run:
  ```bash
  git add project.html
  git commit -m "feat: implement premium 3-column instagram carousel grid layout on case study detail page"
  ```

---

## Verification Plan

### Automated Checks
- Validate that the website starts and files are properly formatted:
  ```bash
  npm run dev -- --port 3000
  ```

### Manual Verification
1. Launch local server and open `http://localhost:3000/project.html?id=canadiansim-social` in the browser.
2. Confirm the heading is "CanadianSIM" and the tagline hook: *"Concept to caption to design to post, CanadianSIM's Instagram run start to finish."* sits neatly on top.
3. Confirm the grid displays three columns side-by-side on desktop view.
4. Test swiping through carousel folders (e.g. Post 2, 3, etc.) by clicking the hover navigation arrows. Ensure the indicator dots and numbers indicator bubble (e.g. `1/2`) update in sync.
5. Hover over card carousels to verify that the prev/next arrow overlays fade in smoothly.
6. Double-click an image inside a grid card to verify the scale-up heart animation pop-up triggers and the heart button toggles to active filled red.
7. Click on an image to verify the fullscreen lightbox opens. Validate that next/prev keyboard arrows and close actions behave smoothly.
8. Verify that the project narrative and detail credit block sit perfectly below the feed grid container.
