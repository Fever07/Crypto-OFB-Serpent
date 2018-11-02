function displayFilenames(filenames) {
    const parent = _filenames;
    const addLink = filename => {
        const el = document.createElement('a');
        el.onclick = evt => getFile(evt.target.innerHTML);
        el.innerHTML = filename;
        parent.appendChild(el);
    }
    filenames.forEach(addLink);
}

function displayFile(str) {
    _file.innerHTML = str;
}
