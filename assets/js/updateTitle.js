var base = "https://www.smrth.dev";
$(document).ready(function() {
    var url = window.location.href;
    var pos = url.replace(base, "");
    if (pos === "") {
        document.title = "smrth.dev";
    }
    else {
        document.title = pos + " - smrth.dev";
    }
});