// Calculate show statistics when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  calculateShowStatistics();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
    }
  }
});

// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isActive = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");

    // Update ARIA attributes
    menuToggle.setAttribute("aria-expanded", !isActive);
    menuToggle.setAttribute(
      "aria-label",
      !isActive ? "Sulje navigaatiovalikko" : "Avaa navigaatiovalikko"
    );
  });

  // Close menu when clicking on links
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Avaa navigaatiovalikko");
    });
  });
}

// Calculate and display show statistics
function calculateShowStatistics() {
  const statsElement = document.getElementById("shows-stats");
  if (!statsElement) return;

  const tables = document.querySelectorAll(".past-shows-table");
  let yksityistilaisuusCount = 0;
  let avoinCount = 0;

  tables.forEach((table) => {
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const td = row.querySelector("td");
      if (td) {
        const text = td.textContent || td.innerText;
        if (text.includes("Yksityistilaisuus")) {
          yksityistilaisuusCount++;
        } else {
          avoinCount++;
        }
      }
    });
  });

  statsElement.textContent = `Kureliivit ja jaloimmat reidet on esiintynyt ${avoinCount} kertaa avoimissa esityksissä ja ${yksityistilaisuusCount} kertaa yksityistilaisuuksissa.`;
}

// Calculate show statistics when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  calculateShowStatistics();
});

// Accordion functionality
// Close 2025 accordion on mobile view on page load
function handleAccordionOnResize() {
  const firstAccordion = document.querySelector(".accordion-item");
  if (firstAccordion) {
    const header = firstAccordion.querySelector(".accordion-header");
    const content = firstAccordion.querySelector(".accordion-content");

    if (window.innerWidth <= 768) {
      // Mobile: close accordion
      firstAccordion.classList.remove("active");
      if (header) header.setAttribute("aria-expanded", "false");
      if (content) content.setAttribute("aria-hidden", "true");
    } else {
      // Desktop: open accordion
      firstAccordion.classList.add("active");
      if (header) header.setAttribute("aria-expanded", "true");
      if (content) content.setAttribute("aria-hidden", "false");
    }
  }
}

// Run accordion functionality only if accordion exists
if (document.querySelector(".accordion")) {
  handleAccordionOnResize();

  // Run on window resize
  window.addEventListener("resize", handleAccordionOnResize);

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const content = accordionItem.querySelector(".accordion-content");
      const isActive = accordionItem.classList.contains("active");
      accordionItem.classList.toggle("active");
      header.setAttribute("aria-expanded", !isActive);
      if (content) {
        content.setAttribute("aria-hidden", isActive ? "true" : "false");
      }
    });
  });
}

// Keyboard navigation for navigation links
const menuItems = navLinks ? navLinks.querySelectorAll("a") : [];
menuItems.forEach((item, idx) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      menuItems[(idx + 1) % menuItems.length].focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      menuItems[(idx - 1 + menuItems.length) % menuItems.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      menuItems[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      menuItems[menuItems.length - 1].focus();
    }
  });
});

// Active navigation link highlighting
let userClickedLink = false;
let clickedLinkTimeout;

function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const navLinks = document.querySelectorAll(".nav-links a");

  // Remove active class from all links
  navLinks.forEach((link) => link.classList.remove("active"));

  // If we're on index.html (or root) and there's a hash
  if (
    (currentPath === "/index.html" ||
      currentPath === "/" ||
      currentPath.endsWith("/index.html")) &&
    currentHash
  ) {
    // Find link matching the hash
    const hashLink = document.querySelector(
      `.nav-links a[href*="${currentHash}"]`
    );
    if (hashLink) {
      hashLink.classList.add("active");

      // Prevent scroll handler from overriding this
      userClickedLink = true;
      clearTimeout(clickedLinkTimeout);
      clickedLinkTimeout = setTimeout(() => {
        userClickedLink = false;
      }, 1500);
    }
  } else if (
    currentPath === "/index.html" ||
    currentPath === "/" ||
    currentPath.endsWith("/index.html")
  ) {
    // On index.html without hash - highlight "Etusivu"
    const homeLink = document.querySelector('.nav-links a[href="index.html"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  } else {
    // On other pages - highlight matching page link
    const pageName = currentPath.split("/").pop() || currentPath;
    const matchingLink = Array.from(navLinks).find((link) => {
      const href = link.getAttribute("href");
      return href === pageName || href.endsWith(pageName);
    });
    if (matchingLink) {
      matchingLink.classList.add("active");
    }
  }
}

// Add click handlers to navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Handle hash links on index page
    if (href && (href.startsWith("index.html#") || href.startsWith("#"))) {
      userClickedLink = true;

      // Clear any existing timeout
      clearTimeout(clickedLinkTimeout);

      // Set the clicked link as active immediately
      document
        .querySelectorAll(".nav-links a")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Allow scroll handler to update again after smooth scroll completes
      clickedLinkTimeout = setTimeout(() => {
        userClickedLink = false;
      }, 1500);
    }
  });
});

// Update active link on page load
updateActiveNavLink();

// Update active link when hash changes (for index.html sections)
window.addEventListener("hashchange", updateActiveNavLink);

// Update active link on scroll (for smooth scrolling to sections)
let scrollTimeout;
window.addEventListener("scroll", () => {
  // Don't update on scroll if user just clicked a link
  if (userClickedLink) return;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath === "/index.html" ||
      currentPath === "/" ||
      currentPath.endsWith("/index.html")
    ) {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Iterate sections in reverse order (bottom to top)
      // This ensures we select the correct section when between sections
      let activeSection = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;

        if (scrollPosition >= sectionTop) {
          activeSection = section;
          break;
        }
      }

      if (activeSection) {
        const sectionId = activeSection.getAttribute("id");
        const hashLink = document.querySelector(
          `.nav-links a[href*="#${sectionId}"]`
        );
        if (hashLink) {
          document
            .querySelectorAll(".nav-links a")
            .forEach((link) => link.classList.remove("active"));
          hashLink.classList.add("active");
        }
      }
    }
  }, 100);
});
