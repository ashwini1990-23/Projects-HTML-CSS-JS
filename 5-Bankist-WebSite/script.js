'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////
// **** Selecting Elements ****
// Selecting the entire document of a web page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // returns first element that matches the selector(class '.header')
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns live HTMLCollection
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // returns live HTMLCollection

// **** Creating and Inserting Elements ****
// .insertAdjacentHTML(position, html) : inserts HTML code into a specified position
// 4 position values:1) afterbegin  2) afterend: after the element 3)beforebegin:before the element 4)beforeend

// Creating element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
//Inserting element
// header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//header.before(message.cloneNode(true));
//header.after(message);

// **** Delete Elements ****
const cookieBtn = document.querySelector('.btn--close--cookie');
cookieBtn.addEventListener('click', function () {
  //message.parentElement.removeChild(message);
  message.remove();
})

// Styles
message.style.backgroundColor = '#37383d'; // to set the style
message.style.width = '103.5%';

console.log(message.style.height); // get or read the style
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);