var base = "http://10.0.0.241:8000/";//https://www.smrth.dev";
function getGithubText() {
    var url = window.location.href;
    if (url === base) {
        return " http-samc";
    }
    return " " + url.replace(base, "");
}