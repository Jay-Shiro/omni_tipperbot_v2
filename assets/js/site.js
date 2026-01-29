(function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navCta = document.querySelector(".nav-cta");

  // Function to close mobile menu
  function closeMobileMenu() {
    hamburger?.classList.remove("active");
    navLinks?.classList.remove("mobile-open");
    navCta?.classList.remove("mobile-open");
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks?.classList.toggle("mobile-open");
      navCta?.classList.toggle("mobile-open");
    });

    // Close menu when clicking nav link
    document.querySelectorAll(".nav-links a, .nav-cta a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close menu when resizing to desktop view
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 900) {
          closeMobileMenu();
        }
      }, 100);
    });

    // Ensure menu is closed on page load if in desktop view
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  }

  // Active nav link
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = a.getAttribute("href").replace(/\/+$/, "") || "/";
    if (href === path || (href !== "/" && path.startsWith(href))) {
      a.classList.add("active");
    }
  });

  // Copy buttons for code blocks
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy");
      const el = document.getElementById(targetId);
      if (!el) return;
      const txt = el.innerText;
      try {
        await navigator.clipboard.writeText(txt);
        const old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = old), 900);
      } catch (e) {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = txt;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    });
  });
})();