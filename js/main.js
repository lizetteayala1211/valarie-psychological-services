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

function initServicesSlider() {
  const slides = document.querySelectorAll(".service-slide");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length || !dots.length) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      slides[index].classList.add("active");
      dot.classList.add("active");
    });
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