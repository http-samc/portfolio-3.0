# smrth.dev
This is my personal portfolio site. I use it to document my progress as a developer, host novel APIs for quick projects, and provide information on who I am and how to contact me.

I wanted to experiment a bit and I did find that I could use [Hugo](https://gohugo.io), but I liked the idea of making a reuseable, customizeable static site generation framework.

The process flow here is as follows:
1. Functions in `utils` are called which generate dynamic pure-html code-fragments (this **only** for components that are too complex to be expressed with markdown. They are outputted to `fragments/{name}.html`.
2. The `utils/render-md`'s `render` function is called. This converts the Markdown file structure in `content/` into a perfectly replicated structure in `public/`, only with all markdown converted with markedjs.
    - The markdown is injected into `templates/base.html`, which uses Bootstrap 5 to provide a basic page template, at the `${markdown}$` keyword.
    - Any markdown file that requires complex html accesses it with `${fragments/{name}.html}$` and at compile time, they are combined. This keeps the markdown clean, legible, and inviting to work with.
3. The Express.js server is started and handles all routing dynamically. Pages can be accessed based on their relative path **once already inside public**. Your homepage can be accessed with `_root.html` inside `public`. This works for branches too: `public/foo/.../bar` can have a bunch of files that can be acceesed at `/foo/.../bar/{name}`, but accessing `/foo/.../bar` directly will result in a 404 (sent as `templates/404.html`) unless `public/foo/bar/_root.html` exists, in which case, it will be returned as the default for that path.

Though the site appears clean and minimalistic, there's definitely a lot going on under the scenes. It gets deployed to Heroku and anytime I change the site locally, I just have to push my code to this repository for the site to update.