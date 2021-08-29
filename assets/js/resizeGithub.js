function updateGithubSize() {
    var width = $(window).width();
    if (width < 615){
        $("#github-text").text("");
    }
    else {
        $("#github-text").text(getGithubText());
    }
}

$(window).resize(updateGithubSize);
$(document).ready(updateGithubSize);