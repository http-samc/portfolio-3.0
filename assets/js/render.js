var base = "http://localhost:8080/";//https://www.smrth.dev";
var dynamic = $("#dynamic");

$(document).ready(function() {
    var url = window.location.href;
    var path = url.replace(base, "");
    var projects = '<h3>projects 👨‍💻</h3>'+dynamic.html();
    if (!path)
        path = "README";
    var url = `https://raw.githubusercontent.com/http-samc/http-samc/main/PORTFOLIO/${path}.md`;
    console.log(url)
    $.get(
        url,
        function(MD) {
            dynamic.html(marked(MD));
            colorLinks();
            dynamic.html(dynamic.html()+projects);
        }
    )
});