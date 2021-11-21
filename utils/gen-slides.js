const fs = require('fs');

function genSlides(subdir) {
    var html = `
<div id="${subdir}" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-inner">
`;
    projectPaths = fs.readdirSync(`content/${subdir}`);
    firstIter = true;
    projectPaths.forEach(function (path) {
        if (path === "_root.md" || !path.includes(".md")) return;
        contents = fs.readFileSync(`content/${subdir}/${path}`, 'utf-8');
        lines = contents.split('\n');
        itemName = lines[0].replace('# ', '');
        url = itemName.replaceAll(' ', '-');
        if (url.includes('tic-tac-toe')) url = url.lower();
        desc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        if (firstIter) active = " active";
        else active = ""

        html += `
<div class="carousel-item${active}" style="width:100%">
<div class="slide-item">
<h4 class="slide-header"><a href="/${subdir}/${url}">${itemName}</a></h4>
<p class="slide-desc">${desc}</p>
</div>
</div>
`
        firstIter = false;
    });
    html += `
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#${subdir}" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#${subdir}" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>`;

    fs.writeFileSync(`fragments/${subdir}Slides.html`, html);
}

exports.genSlides = genSlides;