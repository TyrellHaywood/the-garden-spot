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
  
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("data: ", data); // log the data array for debugging

        // iterate over each item in the data array
        data.forEach(item => {
          const markdownContentUrl = item.download_url;

          console.log(markdownContentUrl)

          // perform fetch request for each markdown content URL
          fetch(markdownContentUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Markdown file');
                }
                return response.text(); // Get the response body as text
            })
            .then(markdownContent => {

              console.log(`markdownContent before parse: ${markdownContent}`)

                // parse the Markdown content to extract metadata and content
                const metadata = parseMarkdownMetadata(markdownContent);
                const title = metadata.title;
                const imageUrl = metadata.image;
                const description = metadata.description;

                console.log(`metaData: ${metadata}`)
                console.log(`Title: ${title}, imageUrl: ${imageUrl}, and description: ${description}`)

                // use the extracted metadata to update the UI
                const smallSpotlights = document.getElementsByClassName('spotlight');

                // loop through each spotlight element
                Array.from(smallSpotlights).forEach(spotlight => {
                    // update image source
                    spotlight.querySelector('img').src = imageUrl;

                    // update description
                    const descriptionElement = spotlight.querySelector('.spotlight-p');
                    if (descriptionElement) {
                        descriptionElement.textContent = description;
                    } else {
                        console.error('Description element not found in spotlight:', spotlight);
                    }
                });
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
