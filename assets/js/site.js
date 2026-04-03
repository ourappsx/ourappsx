document.addEventListener("DOMContentLoaded", () => {
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const parallaxItems = Array.from(document.querySelectorAll(".parallax"));
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (parallaxItems.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const factor = Number(item.dataset.depth || 12);
        const offset = ((rect.top + rect.height / 2) / viewportHeight - 0.5) * factor;
        item.style.transform = `translate3d(0, ${offset * -1}px, 0)`;
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
  }

  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) {
        return;
      }

      document.querySelectorAll("details").forEach((peer) => {
        if (peer !== detail) {
          peer.removeAttribute("open");
        }
      });
    });
  });
});
