const fs = require('fs');

function genPostsView() {
    var html = '<div id="projects">';
    projectPaths = fs.readdirSync('content/blog');
    projectPaths.forEach(function(path) {
        if (path === "_root.md") return
        contents = fs.readFileSync('content/blog/'+path, 'utf-8');
        lines = contents.split('\n');
        postName = lines[0].replace('# ', '');
        postURLName = postName.replaceAll(' ', '-');
        postDesc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        html += `
<div style="background:#1e1e1e;border-radius:10px;padding:7px;width:100%;margin:0px auto 15px;">
<h4 style="margin-left:10px;margin-top:10px;"><a href="/blog/${postURLName}">${postName}</a></h4>
<p style="margin-left:10px">${postDesc}</p>
</div>
`
    });
    html += '</div>'
    fs.writeFileSync('fragments/postsView.html', html);
}

exports.genFragment = genPostsView;