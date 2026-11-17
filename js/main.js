const MENU_PATHS = '<path d="M4 7h16M4 12h16M4 17h16" />';
const CLOSE_PATHS = '<path d="m6 6 12 12M18 6 6 18" />';

const PAGE_ROUTES = {
  home: "index.html",
  about: "about.html",
  projects: "projects.html",
  planner: "planner.html",
  contact: "contact.html",
};

let menuOpen = false;

function updateMenuUI() {
  const mobileNav = document.getElementById("mobile-nav");
  const menuIcon = document.getElementById("menu-icon");
  if (!mobileNav || !menuIcon) return;

  mobileNav.style.display = menuOpen ? "flex" : "none";
  menuIcon.innerHTML = menuOpen ? CLOSE_PATHS : MENU_PATHS;
}

function initFlowReveal() {
  const groups = [
    { selector: ".hero-copy > *", stagger: 100 },
    { selector: ".hero-visual", stagger: 160 },
    { selector: ".home-strip > *", stagger: 90 },
    { selector: ".home-preview > *", stagger: 110 },
    { selector: ".page-heading > .page-number, .page-heading > div", stagger: 95 },
    { selector: ".portrait-small", stagger: 0 },
    { selector: ".about-story > *", stagger: 95 },
    { selector: ".about-grid .info-card", stagger: 140 },
    { selector: ".skills-section > div", stagger: 0 },
    { selector: ".skills-list li", stagger: 65 },
    { selector: ".interests > .eyebrow", stagger: 0 },
    { selector: ".interest-row > div", stagger: 110 },
    { selector: ".project-card", stagger: 120 },
    { selector: ".project-cta > *", stagger: 100 },
    { selector: ".planner-sidebar", stagger: 0 },
    { selector: ".task-form", stagger: 110 },
    { selector: ".task-list-head", stagger: 150 },
    { selector: ".contact-copy > *", stagger: 85 },
    { selector: ".contact-form", stagger: 140 },
  ];

  groups.forEach(({ selector, stagger }) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add("flow-reveal");
      el.style.setProperty("--flow-delay", `${(idx % 9) * stagger}ms`);
    });
  });

  const revealEls = document.querySelectorAll(".flow-reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    requestAnimationFrame(() => {
      revealEls.forEach((el) => observer.observe(el));
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-nav");
      if (target && PAGE_ROUTES[target]) {
        window.location.href = PAGE_ROUTES[target];
      }
    });
  });

  const menuButton = document.getElementById("menu-button");
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      menuOpen = !menuOpen;
      updateMenuUI();
    });
  }

  initFlowReveal();
});
