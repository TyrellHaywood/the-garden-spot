document.addEventListener('DOMContentLoaded', () => {

    // nav bar elements
    const toggleMenuBtn = document.getElementById('toggle-menu');
    const menuItems = document.getElementById('menu-items');
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const infoContainer = document.getElementById('info-container');
  
    // sign up elements
    const signUpForm = document.getElementById('sign-up-form');
    const signUpButton = document.getElementById('sign-up');

    // nav bar event lsitener fxn
    toggleMenuBtn.addEventListener('click', () => {
      menuItems.classList.toggle('hidden');
      header.classList.toggle('hidden');
      nav.classList.toggle('hidden');

      infoContainer.classList.toggle('menu-opened');
    });


    signUpButton.addEventListener('click', () => {

      signUpForm.classList.toggle('opened');
    });
  });