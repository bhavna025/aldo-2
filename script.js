/* ═══════════════════════════════════════
   SOLÉ LUXE — JavaScript Interactions
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
  });

  // ── Hero Entrance Animations ──
  const heroContent = document.getElementById('heroContent');
  const heroImage = document.getElementById('heroImage');

  setTimeout(() => {
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }
  }, 300);

  setTimeout(() => {
    if (heroImage) {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'translateY(0)';
    }
  }, 600);

  // Set initial states
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    heroContent.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
  }
  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateY(40px)';
    heroImage.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll(
    '.category-card, .product-card, .feature-card, .testimonial-card, .insta-item, .section-header'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Staggered Reveal for grids ──
  const staggerContainers = document.querySelectorAll(
    '.categories-grid, .products-grid, .features-grid, .testimonials-track, .insta-grid'
  );

  staggerContainers.forEach(container => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.reveal');
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(container);
  });

  // ── Product Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Wishlist Toggle ──
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.replace('fa-heart', 'fa-heart');
        icon.classList.replace('far', 'fas');
        // Little scale animation
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
        }, 200);
      } else {
        icon.classList.replace('fas', 'far');
      }
    });
  });

  // ── Add to Cart Button Animation ──
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'linear-gradient(135deg, #5A3E36, #1E3A8A)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'transparent';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 1500);
    });
  });

  // ── Countdown Timer ──
  function startCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 12);
    target.setHours(target.getHours() + 8);

    function update() {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown();

  // ── Newsletter Form ──
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      const originalHTML = btn.innerHTML;
      
      btn.innerHTML = '<i class="fas fa-check"></i>';
      input.value = '';
      input.placeholder = 'Subscribed! ✨';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        input.placeholder = 'Your email address';
      }, 2500);
    });
  }

  // ── Smooth Scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ── Parallax-like effect on hero shapes ──
  window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 12;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ── CSS animation keyframe for filter ──
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
