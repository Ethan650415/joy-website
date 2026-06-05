const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll("[data-category]").forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
    });
  });
});

const notice = document.querySelector("#holidayNotice");

if (notice && notice.dataset.enabled === "true") {
  const version = notice.dataset.version || "default";
  const storageKey = `joyHolidayNoticeClosed:${version}`;

  if (sessionStorage.getItem(storageKey) !== "true") {
    notice.classList.add("open");
    notice.setAttribute("aria-hidden", "false");
  }

  notice.querySelectorAll("[data-notice-close]").forEach((button) => {
    button.addEventListener("click", () => {
      notice.classList.remove("open");
      notice.setAttribute("aria-hidden", "true");
      sessionStorage.setItem(storageKey, "true");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && notice.classList.contains("open")) {
      notice.classList.remove("open");
      notice.setAttribute("aria-hidden", "true");
      sessionStorage.setItem(storageKey, "true");
    }
  });
}
