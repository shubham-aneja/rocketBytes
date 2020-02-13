/*
 getMeTheAnswer([3,3,3,5,5,5,6], 3)
 */
function getMeTheAnswer(array, commonRepetitiveFactor) {
    const resSunBinArray = [];
    array.forEach(elm => {
        addToBinary(elm, resSunBinArray);
    });
    const ansInBinary = doMod(resSunBinArray, commonRepetitiveFactor);
    const ansInInt = binaryToInt(ansInBinary)
    return ansInInt;
}


/* addToBinary(7, []) */

function addToBinary(oNumber, res) {

    let number = oNumber;
    for (let i = 0; number > 0; i++) {
        const divRes = number / 2;
        const parsedDivRes = Math.floor(divRes);
        res[i] = res[i] || 0;
        if (divRes !== parsedDivRes) {
            
            res[i]++;
        }
        number = parsedDivRes;
    }
}



/* 
doMod([2,3,3,3,],3)
 */
function doMod(arr, num) {
    arr = arr.map(elm => elm % num);
    return arr;
}

/* 
binaryToInt([1,0,1,1])
*/

function binaryToInt(binArr) {
    return binArr.reduce((res, elm, index) => {
        return res + ((elm) * Math.pow(2, index));
    }, 0);
}
