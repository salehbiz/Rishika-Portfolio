(function() {
  // ===================== SPRING PHYSICS CLASS =====================
  class Spring {
    constructor(tension = 120, friction = 14) {
      this.tension = tension;
      this.friction = friction;
      this.x = 0;
      this.v = 0;
    }

    update(target, dt = 0.016) {
      const a = (target - this.x) * this.tension - this.v * this.friction;
      this.v += a * dt;
      this.x += this.v * dt;
      return this.x;
    }
  }

  // ===================== CUSTOM SPRING MOUSE FOLLOWER =====================
  function initCustomCursor() {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';

    document.body.appendChild(follower);
    document.body.appendChild(ring);

    // Positions: mouse is the target, spring coordinates are the visual positions
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Follower spring (faster, tighter)
    const fSpringX = new Spring(250, 20);
    const fSpringY = new Spring(250, 20);
    fSpringX.x = mouse.x;
    fSpringY.x = mouse.y;

    // Ring spring (slower, more lag/tension)
    const rSpringX = new Spring(80, 12);
    const rSpringY = new Spring(80, 12);
    rSpringX.x = mouse.x;
    rSpringY.x = mouse.y;

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    // Hover state detection
    function updateHoverState() {
      const interactives = document.querySelectorAll('a, button, .cta-btn, .code-box');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('hovering');
          follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('hovering');
          follower.classList.remove('hovering');
        });
      });
    }
    updateHoverState();

    // Re-bind hover states if the DOM structure changes (optional fallback)
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    function tickCursor() {
      const fx = fSpringX.update(mouse.x);
      const fy = fSpringY.update(mouse.y);
      const rx = rSpringX.update(mouse.x);
      const ry = rSpringY.update(mouse.y);

      follower.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(tickCursor);
    }
    requestAnimationFrame(tickCursor);
  }





  // ===================== NAV & HERO EFFECTS =====================
  const navbar = document.querySelector('nav');
  const aboutSection = document.getElementById('about');

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    const statementSection = document.querySelector('.statement-section');
    
    if (statementSection) {
      const rect = statementSection.getBoundingClientRect();
      const statementSectionTop = rect.top + scrollY;
      // Trigger scrolled nav styling when the navbar enters the statement section
      if (scrollY >= statementSectionTop - 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    } else {
      // Fallback
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  // Initial check on load
  handleScrollEffects();





  // ===================== COPY CODE TO CLIPBOARD =====================
  const codeBox = document.querySelector('.code-box');
  if (codeBox) {
    codeBox.addEventListener('click', async () => {
      const codeEl = codeBox.querySelector('code');
      if (codeEl) {
        try {
          await navigator.clipboard.writeText(codeEl.textContent);
          const originalHTML = codeBox.innerHTML;
          
          // Micro feedback animation
          codeBox.style.borderColor = '#10b981';
          codeBox.querySelector('.prompt').style.color = '#10b981';
          codeBox.querySelector('code').style.color = '#10b981';
          codeEl.textContent = 'Copied!';
          
          setTimeout(() => {
            codeBox.style.borderColor = '';
            codeBox.querySelector('.prompt').style.color = '';
            codeBox.querySelector('code').style.color = '';
            codeEl.textContent = 'npm i @veldara/core';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
    });
  }

  // ===================== LOGOLOOP COMPONENT CLASS =====================
  class LogoLoop {
    constructor(element, options = {}) {
      this.container = element;
      this.track = element.querySelector('.logoloop__track');
      this.originalList = element.querySelector('.logoloop__list');
      if (!this.container || !this.track || !this.originalList) return;

      this.speed = options.speed !== undefined ? options.speed : 120;
      this.direction = options.direction || 'left';
      this.hoverSpeed = options.hoverSpeed !== undefined ? options.hoverSpeed : 0;
      this.pauseOnHover = options.pauseOnHover !== undefined ? options.pauseOnHover : true;
      this.scaleOnHover = options.scaleOnHover !== undefined ? options.scaleOnHover : false;

      this.isHovered = false;
      this.offset = 0;
      this.velocity = 0;
      this.lastTimestamp = null;
      this.rafId = null;

      this.isVertical = this.direction === 'up' || this.direction === 'down';
      
      const magnitude = Math.abs(this.speed);
      let directionMultiplier = 1;
      if (this.isVertical) {
        directionMultiplier = this.direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = this.direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = this.speed < 0 ? -1 : 1;
      this.targetVelocity = magnitude * directionMultiplier * speedMultiplier;

      this.init();
    }

    init() {
      this.updateDimensions();
      
      if (this.pauseOnHover || this.hoverSpeed !== undefined) {
        this.track.addEventListener('mouseenter', () => {
          this.isHovered = true;
        });
        this.track.addEventListener('mouseleave', () => {
          this.isHovered = false;
        });
      }

      window.addEventListener('resize', () => this.updateDimensions());

      this.animate = this.animate.bind(this);
      this.rafId = requestAnimationFrame(this.animate);
    }

    updateDimensions() {
      const containerWidth = this.container.clientWidth;
      const sequenceRect = this.originalList.getBoundingClientRect();
      const sequenceWidth = sequenceRect.width;
      const sequenceHeight = sequenceRect.height;

      this.seqWidth = Math.ceil(sequenceWidth);
      this.seqHeight = Math.ceil(sequenceHeight);

      if (this.seqWidth === 0) {
        setTimeout(() => this.updateDimensions(), 50);
        return;
      }

      const minCopies = 2;
      const copyHeadroom = 2;
      let copiesNeeded = minCopies;

      if (this.isVertical) {
        const parentHeight = this.container.parentElement ? this.container.parentElement.clientHeight : window.innerHeight;
        const viewport = this.container.clientHeight || parentHeight || this.seqHeight;
        copiesNeeded = Math.max(minCopies, Math.ceil(viewport / this.seqHeight) + copyHeadroom);
      } else {
        copiesNeeded = Math.max(minCopies, Math.ceil(containerWidth / this.seqWidth) + copyHeadroom);
      }

      const lists = this.track.querySelectorAll('.logoloop__list');
      lists.forEach((list, index) => {
        if (index > 0) list.remove();
      });

      for (let i = 1; i < copiesNeeded; i++) {
        const clone = this.originalList.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        this.track.appendChild(clone);
      }
    }

    animate(timestamp) {
      if (this.lastTimestamp === null) {
        this.lastTimestamp = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - this.lastTimestamp) / 1000;
      this.lastTimestamp = timestamp;

      const seqSize = this.isVertical ? this.seqHeight : this.seqWidth;

      if (seqSize > 0) {
        const target = this.isHovered ? (this.hoverSpeed !== undefined ? this.hoverSpeed : 0) : this.targetVelocity;
        const easingFactor = 1 - Math.exp(-deltaTime / 0.25);
        this.velocity += (target - this.velocity) * easingFactor;

        let nextOffset = this.offset + this.velocity * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        this.offset = nextOffset;

        const transformValue = this.isVertical
          ? `translate3d(0, ${-this.offset}px, 0)`
          : `translate3d(${-this.offset}px, 0, 0)`;
        this.track.style.transform = transformValue;
      }

      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  // ===================== INITIALIZE =====================
  initCustomCursor();

  // ===================== TEXT REVEAL ANIMATION =====================
  function initTextReveal() {
    const section = document.querySelector('.statement-section');
    const container = document.querySelector('.statement-container');
    const textEl = document.querySelector('.statement-text');
    if (!section || !container || !textEl) return;

    const text = textEl.textContent.trim().replace(/\s+/g, ' ');
    textEl.innerHTML = '';
    
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = 'about-char';
      span.textContent = char;
      span.style.opacity = '0.15';
      textEl.appendChild(span);
      chars.push(span);
    }

    function updateReveal() {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const start = viewHeight * 0.85;
      const end = viewHeight * 0.35;
      const total = start - end;
      
      const progress = Math.max(0, Math.min(1, (start - rect.top) / total));
      const revealCount = Math.floor(progress * chars.length);
      
      for (let i = 0; i < chars.length; i++) {
        if (i < revealCount) {
          chars[i].style.opacity = '1';
        } else {
          chars[i].style.opacity = '0.15';
        }
      }
    }

    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal, { passive: true });
    updateReveal();
  }

  initTextReveal();

  // ===================== STATS COUNTER ANIMATION =====================
  function initStatsCounter() {
    const section = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');
    if (!section || counters.length === 0) return;

    const animateCounter = (el) => {
      const targetValue = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const hasDecimal = el.getAttribute('data-decimal') === 'true';
      const duration = 1800; // 1.8 seconds animation
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Smooth cubic ease-out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeProgress * targetValue;

        if (hasDecimal) {
          el.textContent = currentValue.toFixed(1) + suffix;
        } else {
          el.textContent = Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          if (hasDecimal) {
            el.textContent = targetValue.toFixed(1) + suffix;
          } else {
            el.textContent = targetValue + suffix;
          }
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            animateCounter(counter);
          });
          observer.disconnect(); // Trigger once
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  }

  initStatsCounter();

  const logoLoopEl = document.getElementById('partners-loop');
  if (logoLoopEl) {
    new LogoLoop(logoLoopEl, {
      speed: 35,
      direction: 'left',
      pauseOnHover: true,
      hoverSpeed: 0
    });
  }

  // ===================== STACKED CARDS ANIMATION =====================
  function initStackedCards() {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    function updateCardStack() {
      const vh = window.innerHeight;
      cards.forEach((card, idx) => {
        if (idx === cards.length - 1) return; // Last card stays normal

        const nextCard = cards[idx + 1];
        
        // Calculate non-sticky top coordinate using parent container top + offsetTop
        const parentRect = card.parentElement.getBoundingClientRect();
        const nextCardNaturalTop = nextCard.offsetTop;
        const nextCardViewportTop = parentRect.top + nextCardNaturalTop;

        const start = vh * 0.9;
        const end = vh * 0.15;
        
        let progress = 0;
        if (nextCardViewportTop <= start) {
          progress = Math.max(0, Math.min(1, (start - nextCardViewportTop) / (start - end)));
        }
        
        const targetScale = 1 - (progress * (0.07 + idx * 0.01));
        const targetOpacity = 1 - (progress * 0.4);
        
        card.style.transform = `scale(${targetScale})`;
        card.style.opacity = targetOpacity.toString();
      });
    }

    window.addEventListener('scroll', updateCardStack, { passive: true });
    window.addEventListener('resize', updateCardStack, { passive: true });
    updateCardStack();
  }

  initStackedCards();
})();
