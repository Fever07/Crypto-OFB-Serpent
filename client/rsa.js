let d, phi, n;
function generateRsa() {
    const p = randomPrime(128), q = randomPrime(128);
    n = p.multiply(q);
    phi = p.prev().multiply(q.prev());

    const coprimes = [];

    let coprime = bigInt.randBetween(
        bigInt.one.shiftLeft(63),
        bigInt.one.shiftLeft(64).prev()
    );

    while (bigInt.gcd(phi, coprime) > 1) {
        coprime = coprime.add(bigInt.one);
    } 
    
    e = coprime;
    d = e.modInv(phi);
    return {e, n, d, phi};
}

function postPublicRsa() {
    const rsa = generateRsa();
    return axios.post('public-rsa', {
        e: rsa['e'],
        n: rsa['n']
    });
}

function randomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    
    while (true) {
        let p = bigInt.randBetween(min, max);
        if (p.isProbablePrime(256)) {
            return p;
        } 
    }
}

function rsaDecrypt(num) {
    const number = bigInt(num);
    const key = number.modPow(d, n);
    const str = key.toString(2);
    return BitSet.fromBinaryString(str);
}