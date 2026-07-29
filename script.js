const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuIcon = menuToggle.querySelector("i");
const menuLinks = document.querySelectorAll(".menu a");

function abrirCerrarMenu() {
    const estaAbierto = menu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", estaAbierto);

    menuIcon.classList.toggle("fa-bars", !estaAbierto);
    menuIcon.classList.toggle("fa-xmark", estaAbierto);
}

function cerrarMenu() {
    menu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");

    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
}

menuToggle.addEventListener("click", abrirCerrarMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", cerrarMenu);
});

document.addEventListener("click", (event) => {
    const clicDentroDelNavbar = event.target.closest(".navbar");

    if (!clicDentroDelNavbar) {
        cerrarMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarMenu();
    }
});