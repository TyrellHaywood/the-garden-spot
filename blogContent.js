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

    // function to determine if a post is the most recent based on its date
    const isMostRecent = (postDate, allDates) => {
        const sortedDates = allDates.sort((a, b) => {
            const [aMonth, aDay, aYear] = a.split(' ');
            const [bMonth, bDay, bYear] = b.split(' ');
            return new Date(bYear, bMonth, bDay) - new Date(aYear, aMonth, aDay);
        });
        return postDate === sortedDates[0];
    };

    /* -----0o00-0oo0*.o0--CREATOR-FUNCTIONS--Oo.o*0o*----- */

    // function to create a new blogPost element
    const createBlogPostElement = (title, imageUrl, month, day, year, allDates) => {
        // clone the appropriate template based on whether the post is the most recent
        const templateId = isMostRecent(`${month} ${day} ${year}`, allDates) ? 'mostRecent-post' : 'recent-post';
        const template = document.getElementById(templateId);
        const clone = document.importNode(template.content, true);
    
        // populate the cloned element with data
        clone.querySelector('.post-image').src = imageUrl;
        clone.querySelector('.post-p').textContent = title;
    
        return clone;
    };

        /* -----0o00-0oo0*.o0--GET-REQUESTS--Oo.o*0o*----- */

        // fetch data from API and render volunteerImg + text
    // fetch data from API and render blog post content
    fetch(blogPostUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // extract dates of all posts
        const allDates = data.map(item => {
            const markdownContentUrl = item.download_url;
            return fetch(markdownContentUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch Markdown file');
                    }
                    return response.text(); // get the response body as text
                })
                .then(markdownContent => {
                    const metadata = parseMarkdownMetadata(markdownContent);
                    return `${metadata.month} ${metadata.day} ${metadata.year}`;
                });
        });

        // once all dates are fetched, continue with creating and rendering blog post elements
        Promise.all(allDates).then(dates => {
            // iterate over each item in the data array
            data.forEach((item, index) => {
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
    
                        // create a new blogPost element
                        const blogPostElement = createBlogPostElement(metadata.title, imageUrl, metadata.month, metadata.day, metadata.year, dates);
    
                        // append the blogPost element to the appropriate section
                        const postSection = isMostRecent(`${metadata.month} ${metadata.day} ${metadata.year}`, dates) ? document.getElementById('most-recent-post') : document.getElementById('recent-posts');
                        postSection.appendChild(blogPostElement);
                    })
                    .catch(error => {
                        console.error('Error fetching or parsing Markdown file:', error);
                    });
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data for blog posts from GitHub:', error);
    });

});
