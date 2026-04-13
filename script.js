// Logo click → scroll to top
document.querySelectorAll('.logo').forEach(logo => {
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Hamburger menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const nav = document.getElementById("hamburger-nav");
  if (nav && !nav.contains(e.target)) {
    document.querySelector(".menu-links")?.classList.remove("open");
    document.querySelector(".hamburger-icon")?.classList.remove("open");
  }
});

// Fade-in sections on scroll
const fadeSections = document.querySelectorAll(".fade-section");
fadeSections.forEach((section) => section.classList.add("will-animate"));
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -60px 0px" }
);
fadeSections.forEach((section) => fadeObserver.observe(section));

// Active nav link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#desktop-nav .nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((section) => sectionObserver.observe(section));