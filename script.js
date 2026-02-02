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
  { threshold: 0.1 }
);

document.querySelectorAll(".hero-card, .card, .timeline-item").forEach((el) => {
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

const setupCollapsibleLists = () => {
  const lists = document.querySelectorAll(".pub-list");
  lists.forEach((list) => {
    const items = Array.from(list.querySelectorAll("li"));
    const limit = Number(list.dataset.limit || 8);
    if (items.length <= limit) {
      return;
    }
    items.forEach((item, index) => {
      if (index >= limit) {
        item.classList.add("hidden");
      }
    });
    list.classList.add("collapsed");

    const toggle = document.createElement("div");
    toggle.className = "pub-list-toggle";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Show more";
    button.addEventListener("click", () => {
      const isCollapsed = list.classList.contains("collapsed");
      list.classList.toggle("collapsed");
      button.textContent = isCollapsed ? "Show less" : "Show more";
    });
    toggle.appendChild(button);
    list.parentElement.appendChild(toggle);
  });
};

setupCollapsibleLists();
