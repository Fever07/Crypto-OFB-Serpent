function getFilenames() {
    return axios.get('/filenames')
    .then(res => {
        filenames = res.data;
        return filenames;
    });
}

function getFile(filename) {
    axios.get(`/file/${filename}`)
    .then(res => {
        let {e, k, v} = res.data;
        e = parseString(e);
        k = k.map(rsaDecrypt);
        v = parseString(v)[0];
        const { iv, encrypted } = ofb(e, v, bs => serpentBlock(bs, k));
        displayFile(composeString(encrypted));
    })
}