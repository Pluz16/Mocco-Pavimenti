const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const files = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if canonical already exists
    if (content.includes('rel="canonical"')) {
        console.log(`Canonical already in ${file}`);
        return;
    }
    
    // The canonical URL should be clean. For index.html, just the root domain.
    const slug = file === 'index.html' ? '' : file;
    const url = `https://www.mocco.it/${slug}`;
    const canonicalTag = `\n    <link rel="canonical" href="${url}" />`;
    
    // Replace right after <title>
    content = content.replace(/(<\/title>)/i, `$1${canonicalTag}`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added canonical ${url} to ${file}`);
});
