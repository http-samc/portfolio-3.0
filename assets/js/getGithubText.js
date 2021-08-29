var base = "https://www.smrth.dev/";
function getGithubText() {
    var url = window.location.href;
    if (url === base) {
        return " http-samc";
    }
    return " " + url.replace(base, "");
}