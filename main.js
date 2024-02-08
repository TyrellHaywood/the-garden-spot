document.addEventListener('DOMContentLoaded', () => {

    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch
  
    const spotlightsUrl = `https://api.github.com/repos/${repository}/contents/_posts/spotlights?ref=${branch}`;
    const eventsUrl = `https://api.github.com/repos/${repository}/contents/_posts/events?ref=${branch}`;


    // this parses .md metadata retrieved from netlify's CMS
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

    // function to create a new spotlight instance
    const createSpotlightElement = (imageUrl, description) => {
        // clone the spotlight template
        const template = document.getElementById('spotlight-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned spotlight with data
        clone.querySelector('.spotlight-img img').src = imageUrl;
        clone.querySelector('.spotlight-p').textContent = description;

        return clone;
    };

    // fetch data from API and render spotlights
    fetch(spotlightsUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // iterate over each item in the data array
          data.forEach(item => {
              const markdownContentUrl = item.download_url;

              // ierform fetch request for each markdown content URL
              fetch(markdownContentUrl)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Failed to fetch Markdown file');
                      }
                      return response.text(); // get the response body as text
                  })
                  .then(markdownContent => {
                      // parse the Markdown content to extract metadata and content
                      const metadata = parseMarkdownMetadata(markdownContent);
                      const imageUrl = metadata.image;
                      const description = metadata.description;

                      // create a new spotlight element
                      const spotlightElement = createSpotlightElement(imageUrl, description);

                      // append the spotlight element to the spotlight section
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

      
    // function to create a new event instance
    const createEventElement = (imageUrl, description) => {
        // clone the event template
        const template = document.getElementById('event-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned event with data
        clone.querySelector('.event-img img').src = imageUrl;
        clone.querySelector('.event-p').textContent = description;

        return clone;
    };

    // fetch data from API and render events
    fetch(eventsUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // iterate over each item in the data array
          data.forEach(item => {
              const markdownContentUrl = item.download_url;

              // ierform fetch request for each markdown content URL
              fetch(markdownContentUrl)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Failed to fetch Markdown file');
                      }
                      return response.text(); // get the response body as text
                  })
                  .then(markdownContent => {
                      // parse the Markdown content to extract metadata and content
                      const metadata = parseMarkdownMetadata(markdownContent);
                      const imageUrl = metadata.image;
                      const description = metadata.description;

                      // create a new event element
                      const eventElement = createEventElement(imageUrl, description);

                      // append the event element to the event section
                      const eventSection = document.getElementById('event');
                      eventSection.appendChild(eventElement);
                  })
                  .catch(error => {
                      console.error('Error fetching or parsing Markdown file:', error);
                  });
          });
      })
      .catch(error => {
          console.error('Error fetching data for events from GitHub:', error);
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
