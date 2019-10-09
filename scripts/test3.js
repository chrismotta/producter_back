function solution(n) {
    d = new Array(30);
    l = 0;
    while (n > 0) {
        d[l] = n % 2;
        n = Math.floor(n / 2);
        l += 1;
    }
    console.log(l)
    console.log(d)
    for (p = 1; p < 1 + l; ++p) {
        ok = true;
        for (i = 0; i < l - p; ++i) {
            if (d[i] != d[i + p]) {
                ok = false;
                break;
            }
        }
        if (ok && p <= l/2) {
            return p;
        }
    }
    return -1;
}

console.log(solution(819))
// console.log(solution(819))//bien
// console.log(solution(955))
