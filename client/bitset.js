BitSet.prototype.shift = function(num) {
    const bs = this.clone();

    let str = bs.toString();
    if (num >= 0) {
        const add = new Array(num + 1).join('0');
        str = str.concat(add);
    } else {
        let len = str.length;
        if (len + num >= 0) {
            str = str.slice(0, len + num);
        } else {
            str = '0';
        }
    }

    return BitSet.fromBinaryString(str);
}
BitSet.prototype.cycShift = function(num) {
    const bs = this.clone()

    let str = bs.toString();
    let len = str.length;
    let ulen = Math.ceil(len / 32) * 32;

    const tzeros = new Array(ulen - len + 1).join('0');
    str = tzeros.concat(str);
    if (num < 0) {
        num = ulen + num;
    }
    
    str = str.slice(num).concat(str.slice(0, num));
    return BitSet.fromBinaryString(str);
}
BitSet.fromNumber = function (number) {
    return BitSet.fromBinaryString((number >>> 0).toString(2));
}
BitSet.prototype.getString = function (l) {
    const str = this.toString();
    let len = str.length;

    if (len < l) {
        const add = new Array(l - len + 1).join('0');
        return add.concat(str);
    }
    return str;
}
