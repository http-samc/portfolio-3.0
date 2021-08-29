var base = "https://www.smrth.dev/";
var github = $("#github");

$(document).ready(function() {
    var url = window.location.href;
    var pos = url.replace(base, "");
    github.attr("href", "https://github.com/http-samc/"+pos);
});