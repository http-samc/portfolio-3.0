function showOnly(tag) {
    for (let el of document.querySelectorAll('.item')) el.style.display = 'none'
    for (let el of document.querySelectorAll('.' + tag)) el.style.display = 'inline'
}