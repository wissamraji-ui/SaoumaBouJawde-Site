const links = document.querySelectorAll("a[href^='#']");
const themeSelect = document.querySelector("#theme-select");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const THEME_KEY = "theme-preference";

const setTheme = (mode) => {
  if (mode === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (mode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
};

const applyStoredTheme = () => {
  const saved = localStorage.getItem(THEME_KEY) || "auto";
  if (themeSelect) {
    themeSelect.value = saved;
  }
  setTheme(saved);
};

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section, .hero-card, .card, .list-item").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

if (themeSelect) {
  applyStoredTheme();
  themeSelect.addEventListener("change", (event) => {
    const mode = event.target.value;
    localStorage.setItem(THEME_KEY, mode);
    setTheme(mode);
  });

  prefersDark.addEventListener("change", () => {
    const saved = localStorage.getItem(THEME_KEY) || "auto";
    if (saved === "auto") {
      setTheme("auto");
    }
  });
}
