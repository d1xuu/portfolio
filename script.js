// Logo click → scroll to top
document.querySelectorAll('.logo').forEach(logo => {
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Hamburger menu — global function so onclick in HTML still works
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Also attach via JS with stopPropagation for mobile
document.addEventListener("DOMContentLoaded", function () {
  const icon = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".menu-links");
  if (!icon || !menu) return;

  icon.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  });

  // Close when a nav link is tapped
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      icon.classList.remove("open");
    });
  });

  // Close when tapping outside
  document.addEventListener("click", function (e) {
    if (!icon.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    }
  });
});

// When a nav link is clicked, immediately reveal the target section
// so it's never invisible when scrolled into view via anchor
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function () {
    const targetId = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.remove('will-animate');
      target.classList.add('visible');
    }
  });
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
  { threshold: 0, rootMargin: "0px 0px 0px 0px" }
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