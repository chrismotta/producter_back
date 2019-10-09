// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    
    var strs = []
    var scores = []
    for(var i=0; i<S.length; i++){
        
        let splitedS = S.split('')
        splitedS.splice(i, 1)
        console.log(splitedS.join(''))
        strs.push(splitedS.join(''))
        // let reducedS = splitedS.reduce(
        //     (acc, cur) => acc + getCharNumber(cur),
        //     0
        // )
        // strs[reducedS] = splitedS.join('')
        // scores.push(reducedS)
    }
    return 'a'.localeCompare('b')
    return strs.reduce((acc, cur) => {
        
        acc.localeCompare(cur)
    })
    return strs[Math.min(...scores)]
}

function getCharNumber(char){
    return char.charCodeAt(0) - 97
}

console.log(solution('codility'))
