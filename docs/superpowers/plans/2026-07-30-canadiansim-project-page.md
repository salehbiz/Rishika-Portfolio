# CanadianSIM Project Page & Light Mode Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the CanadianSIM project details page to use a Webflow-style interactive desktop/mobile iframe switcher and ensure all project detail pages remain exclusively in light mode.

**Architecture:** We will update `app.js` to prevent the `dark-theme` class and toggle widget from rendering on the project detail page. We will configure CanadianSIM's live URL and corrected metrics in `projects-data.js`. Then we will update `project.html` to implement the new layout: a neat metadata header, a desktop/mobile preview container, and the narrative/performance table details below it, with vanilla JS controls for device switching.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6), Iframes

## Global Constraints
* CanadianSIM Live Site URL: `https://prepaid.canadiansim.com/`
* Project pages must remain in Light Mode (no `dark-theme` class, no toggle widget).
* Layout hierarchy: 
  1. Clean header (Title, scope, category) at the top.
  2. Responsive Desktop/Mobile iframe embed preview in the middle.
  3. Narrative description, credit block, and performance table at the bottom.

---

### Task 1: Force Light Mode on Project Detail Pages

**Files:**
- Modify: `app.js:454-470`

**Interfaces:**
- Consumes: Page load environment.
- Produces: Clean light-themed body class on `project.html`.

- [ ] **Step 1: Edit `initDarkModeToggle` function in `app.js`**

  Locate `initDarkModeToggle()` in `app.js` and modify it to early-return and remove `.dark-theme` if the body contains the `project-detail-page` class:
  ```javascript
  function initDarkModeToggle() {
    if (document.body.classList.contains('project-detail-page')) {
      document.body.classList.remove('dark-theme');
      return;
    }

    if (!document.body.classList.contains('project-detail-page')) {
      document.body.classList.add('dark-theme');
      return;
    }
  ```

- [ ] **Step 2: Commit the light mode restriction**

  Run:
  ```bash
  git add app.js
  git commit -m "fix: force light theme on project detail pages by disabling dark-theme toggles"
  ```

---

### Task 2: Standardize CanadianSIM Data and Correct Metrics

**Files:**
- Modify: `projects-data.js:3-52`

**Interfaces:**
- Produces: Corrected metadata and `liveUrl` configuration for `canadiansim` project.

- [ ] **Step 1: Modify `canadiansim` object in `projects-data.js`**

  Add `"liveUrl": "https://prepaid.canadiansim.com/"` and correct the average order value and revenue metrics in the `performanceTable` array to match the verified PDF brief:
  * Average order value before: `$44.49`
  * Average order value after: `$48.74`
  * Revenue per day before: `$2,653`
  * Revenue per day after: `$3,463`

- [ ] **Step 2: Commit data updates**

  Run:
  ```bash
  git add projects-data.js
  git commit -m "data: correct canadiansim performance metrics and add liveUrl field"
  ```

---

### Task 3: Restructure CanadianSIM Details Layout in `project.html`

**Files:**
- Modify: `project.html`

**Interfaces:**
- Consumes: `projects-data.js` database content.
- Produces: Webflow-style interactive desktop/mobile device preview layout with metadata header on top and case study narrative details at the bottom.

- [ ] **Step 1: Modify layout wrapper rendering in `project.html`**

  Find `container.innerHTML` assignment in `project.html`. Under the `project.layout === 'web-layout'` block (or specifically for `canadiansim`), output the clean metadata header on top, the interactive switcher toolbar, the Desktop/Mobile iframe wrappers, and the bottom columns containing description, meta card, and the performance table:
  ```html
  <!-- Title Header on Top -->
  <div class="project-top-header" style="margin-bottom: 3rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; padding-top: 1rem;">
    <span class="project-title-tag" style="margin-bottom: 0.5rem;">${project.categoryLabel}</span>
    <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 500; text-transform: uppercase; margin: 0 0 1rem; color: #1a1a1a;">${project.title}</h1>
    <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #555555; max-width: 600px; margin: 0 auto; line-height: 1.6;">${project.scope}</p>
  </div>

  <!-- Interactive Device Switcher Toolbar -->
  <div class="preview-switcher-toolbar" style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 2.5rem; background: #f8fafc; border: 1px solid rgba(0,0,0,0.06); padding: 0.75rem 1.5rem; border-radius: 50px; max-width: 320px; margin-left: auto; margin-right: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
    <button id="btn-desktop-preview" class="switcher-btn active" style="font-family:'Inter', sans-serif; font-size: 0.8rem; font-weight:700; border: none; padding: 0.5rem 1.25rem; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; background: #1a1a1a; color: #ffffff;">Desktop</button>
    <button id="btn-mobile-preview" class="switcher-btn" style="font-family:'Inter', sans-serif; font-size: 0.8rem; font-weight:700; border: none; padding: 0.5rem 1.25rem; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; background: transparent; color: #555555;">Mobile</button>
  </div>

  <!-- Responsive Frame Viewports -->
  <div class="preview-viewport-container" style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 5rem;">
    <!-- Desktop Viewport Frame -->
    <div id="desktop-viewport-wrapper" style="width: 100%; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 20px 50px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
      <div class="browser-header-mockup" style="height: 36px; background: #f1f5f9; display: flex; align-items: center; padding: 0 1rem; gap: 6px; border-bottom: 1px solid rgba(0,0,0,0.08);">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #eab308; display: inline-block;"></span>
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; display: inline-block;"></span>
        <div style="flex: 1; text-align: center; font-family:'Inter', sans-serif; font-size:0.7rem; color:#888888; background:#ffffff; border-radius:4px; padding:2px 0; margin:0 3rem; border:1px solid rgba(0,0,0,0.04); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
          prepaid.canadiansim.com
        </div>
      </div>
      <iframe src="${project.liveUrl}" style="width: 100%; height: 700px; border: none; display: block;" loading="lazy"></iframe>
    </div>

    <!-- Mobile Viewport Frame (Smartphone notch mockup) -->
    <div id="mobile-viewport-wrapper" style="display: none; width: 375px; height: 680px; border: 12px solid #1a1a1a; border-radius: 36px; background: #ffffff; box-shadow: 0 25px 60px rgba(0,0,0,0.1); position: relative; overflow: hidden; box-sizing: border-box;">
      <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 24px; background: #1a1a1a; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 10; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <span style="width: 35px; height: 4px; background: #333333; border-radius: 2px;"></span>
        <span style="width: 6px; height: 6px; background: #333333; border-radius: 50%;"></span>
      </div>
      <iframe src="${project.liveUrl}" style="width: 100%; height: 100%; border: none; display: block; padding-top: 15px; box-sizing: border-box;" loading="lazy"></iframe>
    </div>
  </div>

  <!-- Bottom Detailed Information Columns -->
  <div class="project-bottom-details" style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 4rem; margin-top: 4rem;">
    <div style="display: flex; flex-direction: row; gap: 4rem; align-items: flex-start;" class="bottom-split-container">
      <div style="width: 60%;" class="bottom-desc-col">
        <h2 style="font-family:'Cormorant Garamond', serif; font-size: 2.25rem; font-weight:500; text-transform: uppercase; margin-top: 0; margin-bottom: 2rem; color: #1a1a1a; letter-spacing: 0.02em;">Project Overview</h2>
        <div class="project-description-text" style="font-family:'Inter', sans-serif; font-size:1.05rem; line-height:1.75; color:#444444; margin-bottom:2rem;">
          ${project.description}
        </div>
      </div>
      
      <div style="width: 40%;" class="bottom-meta-col">
        <div style="background: #f8fafc; border: 1px solid rgba(0,0,0,0.06); padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
          <h3 style="font-family:'Inter', sans-serif; font-size:0.9rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-top:0; margin-bottom:1.5rem; color:#1a1a1a; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom:0.75rem;">Project Details</h3>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Client</strong>
              <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">${project.client}</span>
            </div>
            <div>
              <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Company</strong>
              <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">${project.company}</span>
            </div>
            <div>
              <strong style="display:block; font-size:0.75rem; color:#777777; text-transform:uppercase; font-family:'Inter',sans-serif; letter-spacing:0.05em; margin-bottom:4px;">Role</strong>
              <span style="font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:600; color:#1a1a1a;">${project.role || 'Web Design, User Journey Mapping'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Render Performance Table inside the gallery area -->
    ${galleryHTML}
  </div>
  ```

- [ ] **Step 2: Bind vanilla switcher events inside initPage() script**

  In the init script inside `project.html`, add event listener logic to toggle display between `desktop-viewport-wrapper` and `mobile-viewport-wrapper`, updating button styles appropriately:
  ```javascript
  const btnDesktop = document.getElementById('btn-desktop-preview');
  const btnMobile = document.getElementById('btn-mobile-preview');
  const wrapperDesktop = document.getElementById('desktop-viewport-wrapper');
  const wrapperMobile = document.getElementById('mobile-viewport-wrapper');

  if (btnDesktop && btnMobile && wrapperDesktop && wrapperMobile) {
    btnDesktop.addEventListener('click', () => {
      btnDesktop.style.background = '#1a1a1a';
      btnDesktop.style.color = '#ffffff';
      btnMobile.style.background = 'transparent';
      btnMobile.style.color = '#555555';
      wrapperDesktop.style.display = 'flex';
      wrapperMobile.style.display = 'none';
    });

    btnMobile.addEventListener('click', () => {
      btnMobile.style.background = '#1a1a1a';
      btnMobile.style.color = '#ffffff';
      btnDesktop.style.background = 'transparent';
      btnDesktop.style.color = '#555555';
      wrapperDesktop.style.display = 'none';
      wrapperMobile.style.display = 'block';
    });
  }
  ```

- [ ] **Step 3: Add responsive stylesheet overrides for mobile devices**

  In the CSS style section inside `project.html`, add mobile-friendly tweaks for the new layout:
  ```css
  @media (max-width: 768px) {
    .bottom-split-container {
      flex-direction: column !important;
      gap: 2.5rem !important;
    }
    .bottom-desc-col, .bottom-meta-col {
      width: 100% !important;
    }
  }
  @media (max-width: 480px) {
    #mobile-viewport-wrapper {
      width: 100% !important;
      height: 600px !important;
      border-width: 6px !important;
      border-radius: 20px !important;
    }
  }
  ```

- [ ] **Step 4: Commit changes in project.html**

  Run:
  ```bash
  git add project.html
  git commit -m "feat: implement interactive iframe switcher layout for canadiansim and standardize detail pages layout"
  ```
