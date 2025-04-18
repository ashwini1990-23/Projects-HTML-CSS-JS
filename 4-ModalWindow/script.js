//This below code demonstrates adding and removing classes(Css styles) using JavaScript code
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);

    btnCloseModal.addEventListener('click', closeModal);

    overlay.addEventListener('click', closeModal);
}

//Respond to keyboard event
document.addEventListener('keydown', (e) => {
    console.log(e)
    // if (e.key === 'Escape') {
    //     if (!modal.classList.contains('hidden')) {
    //         closeModal();
    //     }
    // }

    if (e.key === '1' && (!modal.classList.contains('hidden'))) {
        closeModal();
    }
})