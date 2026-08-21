/**
 * HOMEWATT ELECTRICAL — Modern Cinematic Interaction Script
 * Author: Khaldoun Akramah (@𝓚𝓱𝓪𝓵𝓭𝓸𝓾𝓷𝓐𝓴𝓻𝓪𝓶𝓪𝓱)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Spotlight Cursor Glow Tracker ---
  const cursorGlow = document.getElementById('cursorGlow');
  
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateGlow = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(updateGlow);
    };
    updateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // --- 2. Hero Poster Click to Lightbox ---
  const heroPoster = document.getElementById('mainPosterTrigger');
  if (heroPoster) {
    heroPoster.addEventListener('click', () => {
      openLightbox(
        'images/hero-poster.jpg',
        'HOME WATT — بيتك، بمنظومة واحدة',
        'التكامل الفيزيائي والتقني بين التمديدات، الطاقة الشمسية، المراقبة، وأنظمة المنزل الذكي تحت إشراف Mohand Shatah'
      );
    });
  }

  // --- 3. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll(
    '.pillar-card, .editorial-row, .craft-card, .manifesto-box, .contact-card, .glass-form'
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // --- 4. Web3Forms Real AJAX Submission ---
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      // UI Loading State
      submitBtn.disabled = true;
      btnText.textContent = 'جاري إرسال الطلب...';
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formStatus.textContent = '✓ تم استلام طلبك بنجاح! سيتواصل معك الفني Mohand Shatah في أقرب وقت لتأكيد الموعد والتفاصيل.';
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          formStatus.textContent = 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً أو التواصل مباشرة عبر الواتساب.';
          formStatus.classList.add('error');
          formStatus.style.display = 'block';
        }
      } catch (err) {
        formStatus.textContent = 'تعذر الاتصال بالخادم. يرجى الاتصال المباشر على 0981246488.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'إرسال الطلب الآن';
      }
    });
  }
});

// --- 5. Global Lightbox Controls ---
function openLightbox(imgSrc, title, desc) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');

  if (modal && modalImg) {
    modalImg.src = imgSrc;
    modalTitle.textContent = title || '';
    modalDesc.textContent = desc || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close Lightbox on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
