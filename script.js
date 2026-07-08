const menu = document.querySelector(".menu");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {

    menu.classList.toggle("active");

});

const links = document.querySelectorAll(".menu a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});

