const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const serpent = require('./serpent');
const ofb = require('./ofb');
const utils = require('./utils');

let e, n;
app.use(express.static('./'));
app.use(bodyParser.json());

app.get('/filenames', (req, res) => {
    const filenames = fs.readdirSync('./files');
    res.json(filenames);
});

app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const pathToFile = path.join('files', filename);
    const str = fs.readFileSync(pathToFile).toString();
    const size = str.length;

    const blocks = utils.parseString(str);
    const keys = serpent.generateKeys();
    const cipher = bs => serpent.serpentBlock(bs, keys);
    const { iv, encrypted } = ofb.ofb(
        blocks,
        cipher
    );

    res.json({
        k: keys.map(key => utils.rsaCrypt(key, e, n)),
        v: utils.composeString([iv])[0],
        e: utils.composeString(encrypted).join('')
    });
});

app.post('/public-rsa', (req, res) => {
    e = req.body.e;
    n = req.body.n;
    res.send();
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000!');
});