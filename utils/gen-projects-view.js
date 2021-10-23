const fs = require('fs');

function genProjectsView() {
    var html = "";
    projectPaths = fs.readdirSync('content/projects');
    projectPaths.forEach(function(path) {
        if (path === "_root.md") return
        contents = fs.readFileSync('content/projects/'+path, 'utf-8');
        lines = contents.split('\n');
        projectName = lines[0].replace('# ', '');
        projectURLName = projectName.replaceAll(' ', '-');
        if (projectURLName === "Tournaments.Tech") projectURLName = "tournaments.tech" // unknown err only on server, needs to be lowercase
        projectDesc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        html += `
<div class="project" style="background:#1e1e1e;border-radius:10px;padding:7px;width:100%;margin:0px auto 15px;min-width:300px">
    <h4 style="margin-left:10px;margin-top:10px;"><a href="/projects/${projectURLName}">${projectName}</a></h4>
    <p style="margin-left:10px">${projectDesc}</p>
</div>
`
    });
    fs.writeFileSync('fragments/projectsView.html', html);
}

exports.genFragment = genProjectsView;