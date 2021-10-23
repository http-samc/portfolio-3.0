// Run any other pre-build compilations you need here...
const projectsSlides = require('./utils/gen-projects-slides');
const projectsView = require('./utils/gen-projects-view');

const postsView = require('./utils/gen-posts-view');

projectsSlides.genFragment()
projectsView.genFragment()

postsView.genFragment()

// Now, build all html pages to ./public
const render = require('./utils/render-md');
render.render('content', 'public', 'templates/base.html');