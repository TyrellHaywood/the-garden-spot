document.addEventListener('DOMContentLoaded', () => {

    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch
  
    const apiUrl = `https://api.github.com/repos/${repository}/contents/_posts/spotlights?ref=${branch}`;
  
    const parseMarkdownMetadata = (markdownContent) => {
        const metadata = {};
        const lines = markdownContent.split('\n');
        let isMetadataSection = false;
    
        for (let line of lines) {
            if (line.trim() === '---') {
                // toggle the flag to indicate metadata section
                isMetadataSection = !isMetadataSection;
                continue;
            }
    
            // parse metadata lines only if within the metadata section
            if (isMetadataSection) {
                const [key, value] = line.split(':').map(item => item.trim());
                metadata[key] = value;
            }
        }
    
        return metadata;
    };

    // Function to create a new spotlight instance
    const createSpotlightElement = (imageUrl, description) => {
        // Clone the spotlight template
        const template = document.getElementById('spotlight-template');
        const clone = document.importNode(template.content, true);

        // Populate the cloned spotlight with data
        clone.querySelector('.spotlight-img img').src = imageUrl;
        clone.querySelector('.spotlight-p').textContent = description;

        return clone;
    };

    // Fetch data from API and render spotlights
    fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Iterate over each item in the data array
          data.forEach(item => {
              const markdownContentUrl = item.download_url;

              // Perform fetch request for each markdown content URL
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
                      const imageUrl = metadata.image;
                      const description = metadata.description;

                      // Create a new spotlight element
                      const spotlightElement = createSpotlightElement(imageUrl, description);

                      // Append the spotlight element to the spotlight section
                      const spotlightSection = document.getElementById('spotlight');
                      spotlightSection.appendChild(spotlightElement);
                  })
                  .catch(error => {
                      console.error('Error fetching or parsing Markdown file:', error);
                  });
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
