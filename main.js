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

  // GET request to retrieve data from CMS for spotlights
  fetch('https://github.com/TyrellHaywood/the-garden-spot/posts/spotlights')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved data and update the HTML content for spotlights
    const mainSpotlight = document.getElementById('main-spotlight');
    const spotlightImgs = document.querySelectorAll('.spotlight-img img');
    const spotlightTexts = document.querySelectorAll('.spotlight-p');

    console.log("retrieved data from api.")

    // Update main spotlight content
    mainSpotlight.querySelector('img').src = data[0].image;
    mainSpotlight.querySelector('.spotlight-p').textContent = data[0].description;

    // Update smaller spotlights content
    for (let i = 0; i < spotlightImgs.length; i++) {
      spotlightImgs[i].src = data[i + 1].image; // Skip the first item as it's for main spotlight
      spotlightTexts[i].textContent = data[i + 1].description;
    }
  })
  .catch(error => {
    console.error('Error fetching data for spotlights:', error);
  });

  // GET request to retrieve data from CMS for events
  fetch('https://thegardenspot.netlify.app/admin/#/collections/spotlights')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved data and update the HTML content for events
    const eventImgs = document.querySelectorAll('.event-img img');
    const eventTexts = document.querySelectorAll('.event-p');

    // Update events content
    for (let i = 0; i < eventImgs.length; i++) {
      eventImgs[i].src = data[i].image;
      eventTexts[i].textContent = data[i].description;
    }
  })
  .catch(error => {
    console.error('Error fetching data for events:', error);
  });

});
