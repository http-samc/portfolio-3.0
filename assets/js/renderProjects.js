$(document).ready(function(){
    $.getJSON(`${window.location.protocol}//${window.location.host}/assets/js/exclude.json`, function(exclude){
        var reposToExclude = [];
        exclude["exclude"].forEach((repo=>{reposToExclude.push(repo.toLowerCase())}));
        $.getJSON("https://api.github.com/users/http-samc/repos", function(JSON){
            var items = '';
            JSON.forEach((repo) => {
                var name = repo["name"].toLowerCase();
                if (reposToExclude.includes(name)){
                    return;
                }
                items += `
                <a class="project" href="/${name}">
                    <h1 style="font-size:x-large;margin-top:0px;margin-bottom:0px">${name}</h1>
                    <p>${repo["description"]}</p>
                </a>
                `;
            })
            $("#project-container").html(items);
        })
    })
});