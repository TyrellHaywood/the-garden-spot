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
});