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



// create carousel 
const cards = document.querySelectorAll(".slider_item");
const forwardBtn = document.querySelector(".arrow_forward");
const backBtn = document.querySelector(".arrow_back");
const cardsContainer = document.querySelector(".carousel");

let currentIndex = 0;
let displayedCards = [];


let numCardsToShow;

let setCardsNum = function() {
    if (window.innerWidth >= 1200) {
        numCardsToShow = 3;
    } else if (window.innerWidth < 1200 && window.innerWidth >= 768) {
        numCardsToShow = 2;
    } else if (window.innerWidth < 768) {
        numCardsToShow = 1;
    }
}

setCardsNum();

window.addEventListener('resize', setCardsNum);

function shuffle(arr, excludedArr) {
    const filteredArr = arr.filter(el => !excludedArr.includes(el));
    const shuffledArr = filteredArr.slice();
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr.slice(0, 3);
  }


  let updateDisplayedCards = function () {
    if(numCardsToShow == 2) {
        displayedCards[0].classList.add("show");
        displayedCards[1].classList.add("show"); 
        displayedCards[2].classList.remove("show"); 
    } else if (numCardsToShow == 1) {
        displayedCards[0].classList.add("show");
        displayedCards[2].classList.remove("show"); 
        displayedCards[1].classList.remove("show");
    } else if (numCardsToShow == 3) {
        displayedCards[0].classList.add("show");
        displayedCards[1].classList.add("show");
        displayedCards[2].classList.add("show");
    }
}
window.addEventListener('resize', updateDisplayedCards);


  function displayCards() {
    let newDisplay = shuffle([...cards], displayedCards);
    displayedCards.forEach(el => el.classList.remove('show'));
    newDisplay.forEach((el) => {
      el.classList.add('show');
    });
  displayedCards = newDisplay;
  updateDisplayedCards();
  };
  
function displayNextCards() {
    cardsContainer.classList.add("slide-right");
    setTimeout(() => {
      cardsContainer.classList.remove("slide-right");
      currentIndex += numCardsToShow;
      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }
      displayCards();
    }, 300);
  }
  
  function displayPreviousCards() {
    cardsContainer.classList.add("slide-left");
    setTimeout(() => {
      cardsContainer.classList.remove("slide-left");
      currentIndex -= numCardsToShow;
      if (currentIndex < 0) {
        currentIndex = cards.length - numCardsToShow;
      }
      displayCards()
    }, 300);
  }
  
forwardBtn.addEventListener("click", displayNextCards);
backBtn.addEventListener("click", displayPreviousCards);

displayCards();
