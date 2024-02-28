document.addEventListener('DOMContentLoaded', () => { 
    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch
  
    const spotlightsUrl = `https://api.github.com/repos/${repository}/contents/_posts/spotlights?ref=${branch}`;
    const eventsUrl = `https://api.github.com/repos/${repository}/contents/_posts/events?ref=${branch}`;
    const homepageUrl = `https://api.github.com/repos/${repository}/contents/_posts/homepage?ref=${branch}`;
    const mainSpotlightUrl = `https://api.github.com/repos/${repository}/contents/_posts/mainSpotlight?ref=${branch}`;

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

    // function to create a new homepage instance
    const createHomepageElement = (title, imageUrl, description) => {
        // clone the homepage template
        const template = document.getElementById('homepage-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned homepage with data
        clone.querySelector('.info-h1').textContent = title;
        clone.querySelector('.homepage-hero-img img').src = imageUrl;
        clone.querySelector('.info-p').textContent = description;

        return clone;
    };

    // function to create a new main spotlight instance
    const createMainSpotlightElement = (imageUrl, description) => {
        // clone the mainSpotlight template
        const template = document.getElementById('main-spotlight-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned main spotlight with data
        clone.querySelector('.main-spotlight-img img').src = imageUrl;
        clone.querySelector('.main-spotlight-p').textContent = description;

        return clone;
    };
    
    // fetch data from API and render homepage content
    fetch(homepageUrl)
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

            // perform fetch request for each markdown content URL
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
                const title = metadata.title;
                const imageUrl = metadata.image;
                const description = metadata.description;

                // create a new homepage element
                const homepageElement = createHomepageElement(title, imageUrl, description);

                // append the homepage element to the homepage section
                const homepageSection = document.getElementById('homepage');
                homepageSection.appendChild(homepageElement);
            })
            .catch(error => {
                console.error('Error fetching or parsing Markdown file:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data for spotlights from GitHub:', error);
    });

    // fetch data from API and render main spotlight content
    fetch(mainSpotlightUrl)
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

            // perform fetch request for each markdown content URL
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

                // create a new main spotlight element
                const mainSpotlightElement = createMainSpotlightElement(imageUrl, description);

                // append the main spotlight element to the main spotlight section
                const mainSpotlightSection = document.getElementById('main-spotlights');
                mainSpotlightSection.appendChild(mainSpotlightElement);
            })
            .catch(error => {
                console.error('Error fetching or parsing Markdown file:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data for spotlights from GitHub:', error);
    });


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

              // perform fetch request for each markdown content URL
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
                    const spotlightSection = document.getElementById('small-spotlights');
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

              // perform fetch request for each markdown content URL
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
                    const eventSection = document.getElementById('events-container');
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
});
