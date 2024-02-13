document.addEventListener('DOMContentLoaded', () => {
    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch

    const imageOneUrl = `https://api.github.com/repos/${repository}/contents/_posts/imageOne?ref=${branch}`;
    

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

    /* -----0o00-0oo0*.o0--CREATOR-FUNCTIONS--Oo.o*0o*----- */

     // function to create a new imageOne instance
     const createImageOneElement = (imageUrl, description) => {
        // clone the imageOne template
        const template = document.getElementById('imageOne-template');
        const clone = document.importNode(template.content, true);

        // // populate the cloned imageOne with data
        // clone.querySelector('#imageOne-img').src = imageUrl;
        // clone.querySelector('#imageOne-p').textContent = description;

        return clone;
    };

        /* -----0o00-0oo0*.o0--GET-REQUESTS--Oo.o*0o*----- */

        // fetch data from API and render imageOne + text
        fetch(imageOneUrl)
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
    
                        // create a new imageOne element
                        const imageOneElement = createImageOneElement(imageUrl, description);
    
                        // append the imageOne element to the imageOne section
                        const imageOneSection = document.getElementById('imageOne');
                        imageOneSection.appendChild(imageOneElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching data for imageOne from GitHub:', error);
        });

});

