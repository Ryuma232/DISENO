const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuIcon = menuToggle.querySelector("i");

const menuLinks = document.querySelectorAll(".menu a");

/* Enlaces que tendrán el palito activo */
const navigationLinks = document.querySelectorAll(
    ".menu > li:not(.mobile-reserve) > a"
);

/* =========================================
   ABRIR Y CERRAR MENÚ
========================================= */

function toggleMenu() {
    const isOpen = menu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
}

function closeMenu() {
    menu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
}

menuToggle.addEventListener("click", toggleMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

/* Cerrar al hacer clic fuera */

document.addEventListener("click", (event) => {
    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar) {
        closeMenu();
    }
});

/* Cerrar con Escape */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

/* =========================================
   CAMBIAR EL ENLACE ACTIVO
========================================= */

/* Obtener las secciones correspondientes al menú */

const navigationSections = Array.from(navigationLinks)
    .map((link) => {
        const sectionID = link.getAttribute("href");

        return document.querySelector(sectionID);
    })
    .filter((section) => section !== null);

/* Colocar active en el enlace correcto */

function setActiveLink(sectionID) {
    navigationLinks.forEach((link) => {
        const linkSection = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkSection === `#${sectionID}`
        );
    });
}

/* Detectar la sección visible */

function updateActiveLink() {
    const currentPosition =
        window.scrollY + window.innerHeight * 0.35;

    let currentSection = navigationSections[0];

    navigationSections.forEach((section) => {
        if (section.offsetTop <= currentPosition) {
            currentSection = section;
        }
    });

    if (currentSection) {
        setActiveLink(currentSection.id);
    }
}

/* Actualizar mientras se baja por la página */

window.addEventListener("scroll", updateActiveLink);

/* Actualizar al cargar la página */

window.addEventListener("load", updateActiveLink);

/* Cambio inmediato al presionar un enlace */

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const sectionID = link
            .getAttribute("href")
            .replace("#", "");

        setActiveLink(sectionID);
    });
});