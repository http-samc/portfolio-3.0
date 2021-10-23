const fs = require('fs');

function genProjectsSlides() {
    var html = `
<div id="projects" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-inner">
`;
    projectPaths = fs.readdirSync('content/projects');
    projectPaths.forEach(function(path, pos) {
        if (path === "_root.md") return
        contents = fs.readFileSync('content/projects/'+path, 'utf-8');
        lines = contents.split('\n');
        projectName = lines[0].replace('# ', '');
        projectURLName = projectName.replaceAll(' ', '-');
        if (projectURLName === "Tournaments.Tech") projectURLName = "tournaments.tech" // unknown err only on server, needs to be lowercase
        projectDesc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        if (pos === 0) active = " active"
        else active = ""
        html += `
<div class="carousel-item${active} style="width:100%">
<div style="background:#1e1e1e;border-radius:10px;padding:7px;width:70%;height:10vh;margin:auto">
<h4 style="margin-left:10px;margin-top:10px;word-wrap:break-word;white-space:normal"><a href="/projects/${projectURLName}">${projectName}</a></h4>
<p style="margin-left:10px;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${projectDesc}</p>
</div>
</div>
`
    });
    html += `
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#projects" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#projects" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>`;

    fs.writeFileSync('fragments/projectsSlides.html', html);
}

exports.genFragment = genProjectsSlides;