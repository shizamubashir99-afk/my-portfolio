
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const contentId = button.getAttribute("aria-controls");
    const content = document.getElementById(contentId);
    const symbol = button.querySelector(".accordion-symbol");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    content.hidden = isOpen;
    symbol.textContent = isOpen ? "+" : "−";
  });
});


const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");
const slideCounter = document.getElementById("slideCounter");
const slideDots = document.querySelectorAll(".slide-dot");
const slideshow = document.querySelector(".project-showcase");

let currentSlide = 0;
let slideshowTimer;

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].setAttribute("aria-hidden", "true");
  slideDots[currentSlide].classList.remove("active");
  slideDots[currentSlide].setAttribute("aria-current", "false");

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  slides[currentSlide].setAttribute("aria-hidden", "false");
  slideDots[currentSlide].classList.add("active");
  slideDots[currentSlide].setAttribute("aria-current", "true");

  const number = String(currentSlide + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  slideCounter.textContent = "PROJECT " + number + " / " + total;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startSlideshow() {
  stopSlideshow();

  if (
    document.hidden ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  slideshowTimer = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
  clearInterval(slideshowTimer);
}

nextButton.addEventListener("click", function () {
  nextSlide();
  startSlideshow();
});

prevButton.addEventListener("click", function () {
  previousSlide();
  startSlideshow();
});

slideDots.forEach(function (dot) {
  dot.addEventListener("click", function () {
    showSlide(Number(dot.dataset.slide));
    startSlideshow();
  });
});

slideshow.addEventListener("mouseenter", stopSlideshow);
slideshow.addEventListener("mouseleave", startSlideshow);
slideshow.addEventListener("focusin", stopSlideshow);
slideshow.addEventListener("focusout", function (event) {
  if (!slideshow.contains(event.relatedTarget)) {
    startSlideshow();
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

startSlideshow();


const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealSections.forEach(function (section) {
    observer.observe(section);
  });
} else {
  revealSections.forEach(function (section) {
    section.classList.add("visible");
  });
}


const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function updateThemeButton(isDark) {
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

themeToggle.addEventListener("click", function () {
  const isDark = document.body.dataset.theme !== "dark";

  if (isDark) {
    document.body.dataset.theme = "dark";
  } else {
    delete document.body.dataset.theme;
  }

  updateThemeButton(isDark);
});


const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


document.getElementById("currentYear").textContent =
  new Date().getFullYear();
