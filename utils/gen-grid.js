const fs = require('fs');

function genGrid(subdir) {
    var html = '<div class="grid-parent">';
    projectPaths = fs.readdirSync(`content/${subdir}`);
    projectPaths.forEach(function (path) {
        if (path === "_root.md" || !path.includes(".md")) return
        contents = fs.readFileSync(`content/${subdir}/${path}`, 'utf-8');
        lines = contents.split('\n');
        itemName = lines[0].replace('# ', '');
        url = itemName.replaceAll(' ', '-');
        if (url.includes('Tic-Tac-Toe')) url = url.toLowerCase();
        desc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        html += `
<div class="item">
<h4 class="item-header"><a href="/${subdir}/${url}">${itemName}</a></h4>
<p class="item-desc">${desc}</p>
</div>
`
    });
    html += '</div>'
    fs.writeFileSync(`fragments/${subdir}Grid.html`, html);
}

exports.genGrid = genGrid;