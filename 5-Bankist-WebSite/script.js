'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.getElementById('section--1');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

// Smoothly Scrolling
// Way-1

btnScrollTo.addEventListener('click', function (e) {
  //Co-ordinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  //Window Scrolling
  console.log('Current scroll X/Y', window.scrollX, window.scrollY);
  // Viewport dimensions
  console.log('Height and Width of view port: ', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  /*
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY); OR
  
    window.scrollTo({
      left: s1coords.left + window.scrollX,
      top: s1coords.top + window.scrollY,
      behavior: 'smooth',
    });*/

  // Way-2 : works for modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
/*
// Without Event Delegation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
});
*/
// With Event Delegation implementation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); // Intead of this use Event Delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})

// Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link)
        el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

// Passing an "argument" into handler using bind() method
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation: using scroll event
/*
/////////
// Explanation of Intersection Observer API
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY); // Current scroll position
  if (window.scrollY > initialCoords.top)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// Sticky Navigation: Intersection Observer API
////// Example
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry)
  })
}

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
/////////
*/

// Sticky Navigation: Intersection Observer API :Implementing in project
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;  // = entries[0]
  //console.log(entry);
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // interested in entire viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,

});
headerObserver.observe(header);

// Reveal Sections or Revealing elemets on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // console.log(entries);
  // const [entry] = entries;
  entries.forEach(entry => {
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  })

};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  // Replace src attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
})

// Slider Component Part-1
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';


// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`); // 0%, 100%, 200%, 300%

const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`); // curSlide=1: -100%, 0%, 100%, 200%
}

goToSlide(0);

// Goto the Next Slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;

  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
///////////////////////////
/*
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
// 4 position values:1) afterbegin:firstchild 2) afterend: after the element 3)beforebegin:before the element 4)beforeend:lastchild

// Creating element
const message = document.createElement('div'); // returns DOM element
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
//Inserting element
// header.prepend(message); // insert element as first child of other element
header.append(message); // insert element as last child of other element
//header.append(message.cloneNode(true));

//header.before(message.cloneNode(true));
//header.after(message);

// **** Delete Elements ****
const cookieBtn = document.querySelector('.btn--close--cookie');
cookieBtn.addEventListener('click', function () {
  //message.parentElement.removeChild(message);
  message.remove();
})

// **** Styles ****
// Set style on an element
message.style.backgroundColor = '#37383d'; // to set the style
message.style.width = '103.5%';

console.log(message.style.height); // get or read the style
console.log(message.style.backgroundColor);

// To read or get styles from css files
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); // returns string
// console.log(Number.parseFloat(getComputedStyle(message).height));
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
console.log(getComputedStyle(message).height);
// CSS Custom properties or CSS Variables
document.documentElement.style.setProperty('--color-primary', 'orangered');

// **** Attributes ****
// reading statndard html element attributes from JS
const logo = document.querySelector('.nav__logo');
logo.alt = 'Beautiful minimalist logo';
// absolute url of src attribute
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);

// reading Non-standard or custom attributes of html element from JS using getAttribute() function
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// relative url of src attribute
console.log(logo.getAttribute('src'));
// same is true for links(<a href=''></a>)
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href);
console.log(link2.getAttribute('href'));

// Data Attributes : are stored in dataset object
console.log(logo.dataset.versionNumber);

// **** Classes ****
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
*/

/*
/////////////////////////////
// Events and Event Handlers
// mdn: https://developer.mozilla.org/en-US/docs/Web/Events
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :)');
  h1.removeEventListener('mouseenter', alertH1);
};
const h1 = document.querySelector('h1');
// Attaching event listener to an element
// Way-1
h1.addEventListener('mouseenter', alertH1);


// Way-2 : using event property directly on element (This way is bit old school. Use addEventListener())
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :)');
// };
//Way-3 : handling events or listening to events by using HTML Attributes
//
*/

/*
///////////////////////////
// ***** DOM Traversing ****
const h1 = document.querySelector('h1');
// Gooing downwards: selecting child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

// Going upwards: selecting parents
console.log(h1.parentNode); // Direct parent
console.log(h1.parentElement); // Direct parent
h1.closest('header').style.background = 'var(--gradient-secondary)';

// Going side ways: selecting siblings
console.log(h1.previousElementSibling); // Immediate previous sibling
console.log(h1.nextElementSibling); // Immediate next sibling

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
if(el !== h1) el.style.transform='scale(0.5)';
})
*/