document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuBtn = document.getElementById('toggle-menu');
    const menuItems = document.getElementById('menu-items');
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const infoContainer = document.getElementById('info-container');

    toggleMenuBtn.addEventListener('click', () => {
      menuItems.classList.toggle('hidden');
      header.classList.toggle('hidden');
      nav.classList.toggle('hidden');

      infoContainer.classList.toggle('menu-opened');
    });
  });