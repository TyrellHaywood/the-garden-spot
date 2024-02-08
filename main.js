document.addEventListener('DOMContentLoaded', () => {
  // GET request to retrieve data from GitHub for spotlights
  const repository = 'TyrellHaywood/the-garden-spot';
  const branch = 'main'; // or 'master', depending on your repository's default branch

  const apiUrl = `https://api.github.com/repos/${repository}/contents/_posts/spotlights?ref=${branch}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the retrieved data and update the HTML content for spotlights
      const mainSpotlight = document.getElementById('main-spotlight');
      const spotlightImgs = document.querySelectorAll('.spotlight-img img');
      const spotlightTexts = document.querySelectorAll('.spotlight-p');

      console.log("retrieved data from GitHub.");

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
      console.error('Error fetching data for spotlights from GitHub:', error);
        console.log("dataf fetched!")
    });

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
});
