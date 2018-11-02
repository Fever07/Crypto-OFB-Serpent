function ofb(blocks, iv, cipher) {
    let liv = iv.clone();
    encrypted = [];
    blocks.forEach(bs => {
        liv = cipher(liv);
        encrypted.push(bs.xor(liv));
    });
    return { iv, encrypted };
}