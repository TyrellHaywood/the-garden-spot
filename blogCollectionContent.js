document.addEventListener('DOMContentLoaded', () => {
    // GET request to retrieve data from GitHub for spotlights
    const repository = 'TyrellHaywood/the-garden-spot';
    const branch = 'main'; // or 'master', depending on your repository's default branch

    const blogPostUrl = `https://api.github.com/repos/${repository}/contents/_posts/blogPost?ref=${branch}`;    

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

    // function to create a new recent blogPost element
    const createBlogPostElement = (title, imageUrl, month, day, year) => {
        // clone the recent post template
        const template = document.getElementById('post-template');
        const clone = document.importNode(template.content, true);

        // populate the cloned element with data
        clone.querySelector('.post-p').textContent = title;
        clone.querySelector('.post-image').src = imageUrl;

        return clone;
    };

        /* -----0o00-0oo0*.o0--GET-REQUESTS--Oo.o*0o*----- */

        // fetch data from API and render blog post
        fetch(blogPostUrl)
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
                      
                        // create a new blogPost element
                        const blogPostElement = createBlogPostElement(title, imageUrl);
    
                        // append the blogPost element to the blogPost section
                        const blogPostSection = document.getElementById('all-posts-container');
                        blogPostSection.appendChild(blogPostElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching data for blog posts from GitHub:', error);
        });

});

