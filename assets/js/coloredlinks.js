function colorIt(tagName, addAccent = false, useClassname = false) {
    let elements = []
    if (useClassname)
        elements = document.getElementsByClassName('item');
    else
        elements = document.getElementsByTagName(tagName);

    let colors = ['var(--bs-orange)', '#fdee00', 'salmon', 'var(--bs-purple)', 'var(--bs-teal)', 'var(--bs-success)', 'cornflowerblue', 'Peru', 'SlateBlue', 'SandyBrown', 'LemonChiffon', 'PaleGreen', 'Pink', 'Plum', 'Turquoise', 'Tomato', 'Moccasin'];

    Array.prototype.forEach.call(elements, function (element) {
        if (element.style.color !== "") return
        colorIdx = Math.floor(Math.random() * colors.length);

        if (addAccent) {
            element.style.backgroundImage = `-webkit-linear-gradient(45deg, #1e1e1e 95%, ${colors[colorIdx]} 5%)`
            let titleWrapper = element.children[0]
            let title = titleWrapper.children[0]
            titleWrapper.style.color = colors[colorIdx]
            title.style.color = colors[colorIdx]
        }
        else
            element.style.color = colors[colorIdx]

        colors.splice(colorIdx, 1);

        // Make sure we aren't limiting # of links by how many approved colors we have
        if (colors.length === 0) {
            colors = ['var(--bs-orange)', '#fdee00', 'salmon', 'var(--bs-purple)', 'var(--bs-teal)', 'var(--bs-success)', 'cornflowerblue', 'Peru', 'SlateBlue', 'SandyBrown', 'LemonChiffon', 'PaleGreen', 'Pink', 'Plum', 'Turquoise', 'Tomato', 'Moccasin'];
        }
    });
}

colorIt('a')
colorIt('button')
colorIt('item', true, true)