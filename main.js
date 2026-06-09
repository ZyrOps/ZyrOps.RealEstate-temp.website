const body = document.body;
const nav = document.querySelector("[data-nav]");
const progress = document.querySelector("[data-progress]");
const hamburger = document.querySelector("[data-hamburger]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
let lastScroll = 0;

window.addEventListener("load", () => {
  body.classList.remove("is-loading");
  window.setTimeout(() => nav?.classList.add("loaded"), 180);
});

function updateNav() {
  const current = window.scrollY;
  nav?.classList.toggle("scrolled", current > 40);
  nav?.classList.toggle("nav-hidden", current > lastScroll && current > 180 && !body.classList.contains("menu-open"));
  lastScroll = Math.max(current, 0);

  if (progress) {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progress.style.transform = `scaleX(${current / max})`;
  }
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

hamburger?.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  nav?.classList.toggle("menu-opened", open);
  hamburger.setAttribute("aria-expanded", String(open));
  mobilePanel?.setAttribute("aria-hidden", String(!open));
});

document.querySelectorAll("[data-mobile-panel] a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    nav?.classList.remove("menu-opened");
    hamburger?.setAttribute("aria-expanded", "false");
    mobilePanel?.setAttribute("aria-hidden", "true");
  });
});

const filters = document.querySelector("[data-filters]");
filters?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  filters.querySelectorAll("[data-filter]").forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;

  document.querySelectorAll("[data-category]").forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.style.display = visible ? "" : "none";
    if (visible) {
      card.animate(
        [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 280, easing: "ease-out" }
      );
    }
  });
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const success = form.querySelector("[data-success]");
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    window.setTimeout(() => {
      if (button) {
        button.disabled = false;
        button.textContent = "Request Site Visit";
      }
      if (success) success.hidden = false;
      form.reset();
    }, 650);
  });
});
