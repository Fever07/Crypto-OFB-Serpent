const utils = require('./utils');

module.exports = {
    ofb,
}

function ofb(blocks, cipher) {
    encrypted = [];
    iv = utils.generateSessionKey(4);
    liv = iv.clone();
    blocks.forEach(bs => {
        liv = cipher(liv);
        encrypted.push(bs.xor(liv));
    });
    return { iv, encrypted };
}