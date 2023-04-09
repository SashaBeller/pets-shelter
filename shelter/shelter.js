'use strict';

console.log('Все пункты из ТЗ выполнены. Баллы: 100/100. Брейкпойнтсы: 1280px, 768px, 320px');

// burger-menu
let header = document.querySelector(".header");
let burgerMenu = document.getElementById("burger-menu");
let burger = document.getElementById("burger");
let link = document.querySelectorAll(".nav-link");
let shadow = document.querySelector(".shadow");
document.addEventListener("DOMContentLoaded", function() {
    burger.addEventListener("click", function () {
        if(!header.classList.contains("open")) {
            header.classList.add("open");
            document.body.style.overflow = 'hidden';
            shadow.style.visibility = "visible";
        } else {
            header.classList.remove("open");
            document.body.style.overflow = 'auto';
            shadow.style.visibility = "hidden";
        }
    })
})

// close on esc button
window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        header.classList.remove("open");
        shadow.style.visibility = "hidden";
    } 
})

link.forEach(el => {
    el.addEventListener('click', () => {
        header.classList.remove('open');
        document.body.style.overflow = 'auto';
        shadow.style.visibility = "hidden"; 
    })
})

// close by tapping on any space 
burgerMenu.addEventListener("click", event => {
    event._isClickWithinMenu = true;
})

burger.addEventListener("click", event => {
    event._isClickWithinMenu = true;
})

document.body.addEventListener("click", event => {
    if(event._isClickWithinMenu) return;
    header.classList.remove("open");
    shadow.style.visibility = "hidden";
})
