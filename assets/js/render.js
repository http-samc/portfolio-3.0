var base = "https://www.smrth.dev/";
var dynamic = $("#dynamic");

$(document).ready(function() {
    var url = window.location.href;
    var path = url.replace(base, "");
    var projects = '<h2 style="margin-bottom:15px">projects 👨‍💻</h2>'+dynamic.html();
    if (!path)
        path = "README";
    var url = `https://raw.githubusercontent.com/http-samc/http-samc/main/PORTFOLIO/${path}.md`;
    $.get(
        url,
        function(MD) {
            dynamic.html(marked(MD));
            colorLinks();
            dynamic.html(dynamic.html()+projects);
        }
    )
});