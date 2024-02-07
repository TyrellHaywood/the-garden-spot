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
    const expandLess = document.getElementById('expand-less');

    // nav bar event lsitener fxn
    toggleMenuBtn.addEventListener('click', () => {
      menuItems.classList.toggle('hidden');
      header.classList.toggle('hidden');
      nav.classList.toggle('hidden');

      infoContainer.classList.toggle('menu-opened');
    });

    // sign up form event listener fxn
    signUpButton.addEventListener('click', () => {
      signUpForm.classList.toggle('opened');
      signUpButton.classList.toggle('hidden');
    });

    expandLess.addEventListener('click', () => {
      signUpForm.classList.remove('opened');
    });

    // GET request to retrieve data from CMS
  fetch('/admin/api/collections/spotlights')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved data and update the HTML content
    console.log(data); // Example: Log the retrieved data to the console
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  });
