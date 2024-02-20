document.addEventListener('DOMContentLoaded', () => {
    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch

    const imageOneUrl = `https://api.github.com/repos/${repository}/contents/_posts/imageOne?ref=${branch}`;
    const imageTwoUrl = `https://api.github.com/repos/${repository}/contents/_posts/imageTwo?ref=${branch}`;
    const aboutUsUrl = `https://api.github.com/repos/${repository}/contents/_posts/aboutUs?ref=${branch}`;
    const teamMemberUrl = `https://api.github.com/repos/${repository}/contents/_posts/teamMember?ref=${branch}`;

    

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

        // populate the cloned imageOne with data
        clone.querySelector('#imageOne-img').src = imageUrl;
        clone.querySelector('#imageOne-p').textContent = description;

        return clone;
    };

     // function to create a new imageTwo instance
     const createImageTwoElement = (imageUrl, description) => {
        // clone the imageTwo template
        const template = document.getElementById('imageTwo-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned imageTwo with data
        clone.querySelector('#imageTwo-img').src = imageUrl;
        clone.querySelector('#imageTwo-p').textContent = description;

        return clone;
    };

     // function to create a new about-us instance
     const createAboutUsElement = (description) => {
        // clone the about-us template
        const template = document.getElementById('aboutUs-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned about-us with data
        clone.querySelector('#about-us-p').textContent = description;

        return clone;
    };

     // function to create a new team-member instance
     const createTeamMemberElement = (name, imageUrl, role, email, description) => {
        // clone the team-member template
        const template = document.getElementById('teamMember-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned team-member with data
        clone.querySelector('.name-text').textContent = name;
        clone.querySelector('.team-member-img').src = imageUrl;
        clone.querySelector('.role').textContent = role;
        clone.querySelector('.email-address').textContent = email;
        clone.querySelector('.bg-description').textContent = description;

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

        // fetch data from API and render imageTwo + text
        fetch(imageTwoUrl)
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
    
                        // create a new imageTwo element
                        const imageTwoElement = createImageTwoElement(imageUrl, description);
    
                        // append the imageTwo element to the imageTwo section
                        const imageTwoSection = document.getElementById('imageTwo');
                        imageTwoSection.appendChild(imageTwoElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching data for imageTwo from GitHub:', error);
        });

        // fetch data from API and render about-us
        fetch(aboutUsUrl)
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
                        // parse body of text instead, isnt accessed the same as "description"
                        const bodyOfText = markdownContent.trim().split('---')[2].trim();

                        // create a new about-us element
                        const aboutUsElement = createAboutUsElement(bodyOfText);

                        // append the about-us element to the about-us section
                        const aboutUsSection = document.getElementById('about-us');
                        aboutUsSection.appendChild(aboutUsElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching data for about us from GitHub:', error);
        });


        // fetch data from API and render teamMember content
        fetch(teamMemberUrl)
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

                        // parse body of text first
                        const bodyOfText = markdownContent.trim().split('---')[2].trim();

                        // parse the Markdown content to extract metadata and content
                        const metadata = parseMarkdownMetadata(markdownContent);
                        const name = metadata.name;
                        const imageUrl = metadata.image;
                        const role = metadata.role;
                        const email = metadata.email;
                        const description = metadata.description;
    
                        // create a new teamMember element
                        const teamMemberElement = createTeamMemberElement(name, imageUrl, role, email, description);
    
                        // append the teamMember element to the teamMember section
                        const teamMemberSection = document.getElementById('team');
                        teamMemberSection.appendChild(teamMemberElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching data for teamMember from GitHub:', error);
        });
});

