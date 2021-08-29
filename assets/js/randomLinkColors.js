function colorLinks() {
    let colors = [
        "yellow",
        "red",
        "green",
        "magenta",
        "orange",
        "coral",
        "crimson",
        "fuchsia",
        "pink",
        "lightseagreen",
        "lightskyblue",
        "salmon",
        "indianred"
    ];

    let links = document.getElementsByTagName("a") // getting all text links
    let previousColor = null; // we haven't chosen our first color yet
    var elementColor = ""; // declare elementColor

    // Looping through the text links
    for (var i = 0; i < links.length; i++) {

        let element = links[i]; // shorthand for current text link
        if (element.id === "github" || element.className === "project" || element.target === "_blank") {
            continue;
        }
        while ((elementColor === previousColor)) // avoiding repeats
            elementColor = colors[Math.floor(Math.random() * colors.length)]; // random color selection
        previousColor = elementColor; // recording current selection for next loop

        // setting current text link style attrs
        element.style.color = elementColor;
        element.style.textDecoration = "none";
        element.style.fontWeight = "500";
    }
}