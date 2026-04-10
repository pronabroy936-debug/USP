(function () {
  const fallbackHeader = `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand-link" href="index.html">
          <span class="brand-badge">USP</span>
          <span class="brand-copy">
            <strong>Uttam Studies for Professionals</strong>
            <small>Science & Biology Coaching</small>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav">
          <a data-nav="home" href="index.html">Home</a>
          <a data-nav="about" href="about.html">About</a>
          <a data-nav="courses" href="courses.html">Courses</a>
          <a data-nav="contact" href="contact.html">Contact</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-outline" href="tel:+916289013323">Call</a>
          <a class="btn btn-primary" href="https://wa.me/916289013323?text=Hello%20USP%2C%20I%20want%20to%20enroll." target="_blank" rel="noreferrer">Enroll Now</a>
        </div>
      </div>
    </header>
  `;

  const fallbackFooter = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <p class="section-label light">USP Coaching</p>
          <h3>Uttam Studies for Professionals</h3>
          <p>Expert Science & Biology Coaching for School Students (Classes 5-12)</p>
        </div>
        <div>
          <p class="section-label light">Quick Links</p>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="courses.html">Courses</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
        <div>
          <p class="section-label light">Contact</p>
          <p><a href="tel:+916289013323">6289013323</a></p>
          <p><a href="mailto:ipsita96.saha@gmail.com">ipsita96.saha@gmail.com</a></p>
          <p>4 No. Kataganj, Bedibhawan, Kalyani - 741250</p>
          <a class="footer-whatsapp" href="https://wa.me/916289013323?text=Hello%20USP%2C%20I%20need%20course%20details." target="_blank" rel="noreferrer">WhatsApp USP</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>(c) <span id="year"></span> USP Coaching. All rights reserved.</p>
      </div>
    </footer>
  `;

  async function loadInclude(el) {
    const name = el.getAttribute("data-include");
    const path = `components/${name}.html`;
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(path);
      el.innerHTML = await response.text();
    } catch (error) {
      el.innerHTML = name === "header" ? fallbackHeader : fallbackFooter;
    }
  }

  function setupNav() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const page = document.body.dataset.page;
    const activeLink = header.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add("is-active");
    const toggle = header.querySelector(".nav-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function setupFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function setupForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "Enquiry noted. Please also use WhatsApp or call for a quick response.";
      form.reset();
    });
  }

  async function init() {
    const includes = Array.from(document.querySelectorAll("[data-include]"));
    await Promise.all(includes.map(loadInclude));
    setupNav();
    setupFooterYear();
    setupForm();
  }

  init();
})();
