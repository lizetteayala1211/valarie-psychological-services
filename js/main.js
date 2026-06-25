/******* NAV & FOOTER LOADING *******/

async function loadPartial(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

/******* MOBILE NAVIGATION *******/

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open");
  });
}

/******* ACTIVE NAV STATE *******/

function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

/******* PAGE TRANSITIONS *******/

// function initPageTransitions() {
//   const links = document.querySelectorAll("a[href]");

//   links.forEach((link) => {
//     const href = link.getAttribute("href");

//     const isExternal =
//       link.hostname &&
//       link.hostname !== window.location.hostname;

//     if (
//       !href ||
//       href.startsWith("#") ||
//       href.startsWith("mailto:") ||
//       href.startsWith("tel:") ||
//       link.target === "_blank" ||
//       isExternal
//     ) {
//       return;
//     }

//     link.addEventListener("click", (event) => {
//       event.preventDefault();

//       document.body.classList.add("page-exit");

//       setTimeout(() => {
//         window.location.href = href;
//       }, 450);
//     });
//   });
// }

/******* SERVICES SLIDER *******/

/******* SERVICES SLIDER *******/

function initServicesSlider() {
  const slides = document.querySelectorAll(".service-slide");
  const dots = document.querySelectorAll(".dot");
  const slider = document.querySelector(".services-slider");

  if (!slides.length || !dots.length || !slider) return;

  let currentIndex = 0;
  let startX = 0;
  let endX = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  slider.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].clientX;

    const swipeDistance = startX - endX;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 0) {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    showSlide(currentIndex);
  });
}

/******* INITIALIZE SITE *******/

async function initSite() {
  await loadPartial("site-header", "partials/header.html");
  await loadPartial("site-footer", "partials/footer.html");

  initMobileMenu();
  setActiveNav();
  initServicesSlider();
  // initPageTransitions();
}

initSite();