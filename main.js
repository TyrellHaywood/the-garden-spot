document.addEventListener('DOMContentLoaded', () => {
  
    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch
  
    const apiUrl = `https://api.github.com/repos/${repository}/contents/_posts/spotlights?ref=${branch}`;
  
    const parseMarkdownMetadata = (markdownContent) => {
      const metadataRegex = /^---\r?\n(.*?)\r?\n---\r?\n([\s\S]*)/;
      const match = markdownContent.match(metadataRegex);
      if (match) {
        const metadataString = match[1];
        const metadata = {};
        metadataString.split('\n').forEach(line => {
          const parts = line.split(':');
          const key = parts[0].trim();
          const value = parts.slice(1).join(':').trim();
          metadata[key] = value;
        });
        return metadata;
      } else {
        return {};
      }
    };
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extract content from the Markdown file
        const markdownContentUrl = data.download_url;
  
        fetch(markdownContentUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch Markdown file');
            }
            return response.text(); // Get the response body as text
          })
          .then(markdownContent => {
            // Parse the Markdown content to extract metadata and content
            const metadata = parseMarkdownMetadata(markdownContent);
            const description = metadata.description;
            const imageUrl = metadata.image;
            
            // Use the extracted metadata to update the UI
            const mainSpotlight = document.getElementById('main-spotlight');
            mainSpotlight.querySelector('img').src = imageUrl;
            mainSpotlight.querySelector('.spotlight-p').textContent = description;
          })
          .catch(error => {
            console.error('Error fetching or parsing Markdown file:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching data for spotlights from GitHub:', error);
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
