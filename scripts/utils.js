function fastexp(x, n, m) {
    let ans = 1;
    while (n > 0) {
        if (n % 2) {
            ans *= x;
            ans = ans % m;
            n -= 1;
        } else {
            ans *= ans;
            ans = ans % m;
            n /= 2;
        }
    }
    return ans;
}

function generateSessionKey(number) {
    const keys = [];
    let res = new BitSet;
    for (let i = 0; i < number; i ++ ) {
        const num = Math.floor(Math.random() * 4 * (1 << 30));
        let bs = BitSet.fromNumber(num);
        bs = bs.shift(i * 32);
        res = res.or(bs);
    }   

    return res;
}

function parseString(str) {
    l = str.length;
    block = 16;
    blocks = Math.ceil(l / block);
    rem = l % block;
    if (rem > 0) {
        str += new Array(block - rem + 1).join(String.fromCharCode(0));
    }

    splitBlock = (bl) => {
        codes = [];
        for (let i = 0; i < 16; i ++) {
            codes[i] = bl.charCodeAt(i);
        }

        codes = codes.map(c => new BitSet(c).getString(8));
        codes = codes.join('');

        return BitSet.fromBinaryString(codes);
    }

    bss = [];
    for (let i = 0; i < blocks; i++) {
        bss[i] = splitBlock(str.slice(i * 16, (i + 1) * 16));
    }

    return bss;
} 

function composeString(blocks) {
    return blocks.map(bs => {
        // 128
        const str = bs.getString(128);
        let res = '';
        for (let i = 0; i < 16; i++) {
            const subbs = BitSet.fromBinaryString(str.slice(8 * i, 8 * (i + 1)));
            const num = subbs.data[0];
            const s = String.fromCharCode(num);    
            res = res + s;
        }
        return res;
    }).join('');
}