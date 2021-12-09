// Build any dynamic fragments
const slides = require('./hooks/gen-slides');
const grid = require('./hooks/gen-grid');

slides.genSlides('blog');
slides.genSlides('projects');

grid.genGrid('blog');
grid.genGrid('projects');

// Now, build all html pages to ./public
const render = require('./hooks/render-md');

render.render('content', 'public', 'templates/base.html', function(path, markdown) {
    // Custom preprocessing before marked.js (must always return ONLY markdown, even if no processing is done)
    if (path.includes('projects/') && !path.includes('_root.md')) markdown += '\n## Other Awesome Projects\n${fragments/projectsSlides.html}$'
    else if (path.includes('blog/') && !path.includes('_root.md')) markdown += '\n## Other Awesome Posts\n${fragments/blogSlides.html}$'
    return markdown
});