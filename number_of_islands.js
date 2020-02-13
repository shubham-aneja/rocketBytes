function doSomething(array = []) {
    let resObj = {};
    let ansArray = [];
    getOnceEntry(array, resObj);
    Object.keys(resObj).forEach(kuKey => checkElm(resObj, ansArray, parseInt(kuKey.split('_')[0]), parseInt(kuKey.split('_')[1])));
    ansArray = ansArray.filter(arr => arr.elm.isIslandStarting == true)
    ansArray.map(ae=>{
        console.log(`Island starting with [${ae.i},${ae.j}] and associated area`, ae.elm.groupItems && Object.keys(ae.elm.groupItems));
    })
}

function getOnceEntry(a2, myObj2) {
    for (i = 0; i < a2.length; i++) {
        for (j = 0; j < a2[0].length; j++) {
            if (a2[i][j]) {
                myObj2[`${i}_${j}`] = {};
            }
        }
    }

}

function checkElm(obj, ansArray, i, j) {
    const neighborElms = getNeighborElms(obj, i, j) || [];
    const currElm = obj[`${i}_${j}`];
    if (!currElm) {
        return
    }
    let addedToGroup = false;
    let decisionMade = false;
    let starter = {};
    const nn = neighborElms.filter((nObj) => {

        const key = Object.keys(nObj)[0];
        const [ni, nj] = key.split('_');
        const valInObj = nObj[`${ni}_${nj}`];
        let res = true
        if (valInObj.isIslandStarting) {
            starter[i] = ni;
            starter[j] = nj;
            decisionMade = true;

            if (addedToGroup) {
                valInObj.isIslandStarting = null;
                valInObj.addedInGroup = currElm.addedInGroup;
                obj[currElm.addedInGroup]['groupItems'] = obj[currElm.addedInGroup]['groupItems'] || {};
                obj[currElm.addedInGroup]['groupItems'][`${ni}_${nj}`] = true;
                if (valInObj.groupItems) {

                    for (let kk in valInObj.groupItems) {

                        obj[currElm.addedInGroup]['groupItems'][kk] = true;
                    }
                    valInObj.groupItems = null;
                }
            } else {
                valInObj.groupItems = valInObj.groupItems || {};
                valInObj.groupItems[`${i}_${j}`] = true;
                currElm.addedInGroup = `${ni}_${nj}`;
            }
            addedToGroup = true;
        } else if (valInObj.addedInGroup) {
            addedToGroup = true;
            decisionMade = true;

            currElm.addedInGroup = valInObj.addedInGroup;
            obj[valInObj.addedInGroup].groupItems = obj[valInObj.addedInGroup].groupItems || {};
            obj[valInObj.addedInGroup].groupItems[`${i}_${j}`] = true;
            if (starter[i] && (valInObj.addedInGroup !== `${starter[i]}_${starter[j]}`)) {
                const avalInObj = obj[`${starter[i]}_${starter[j]}`];
                avalInObj.isIslandStarting = null;
                avalInObj.addedInGroup = currElm.addedInGroup;

                obj[currElm.addedInGroup]['groupItems'] = obj[currElm.addedInGroup]['groupItems'] || {};
                obj[currElm.addedInGroup]['groupItems'][`${starter[i]}_${starter[j]}`] = true;

                if (avalInObj.groupItems) {
                    for (let kk in avalInObj.groupItems) {
                        obj[currElm.addedInGroup]['groupItems'][kk] = true;
                    }
                    avalInObj.groupItems = null;
                }
            }
        } else if (!decisionMade) {
            decisionMade = true;

            currElm.isIslandStarting = true;
            ansArray.push({ elm: currElm, i, j });
            res = false;
        }
        return res;
    })
    if (neighborElms.length == 0) {
        currElm.isIslandStarting = true;
        ansArray.push({ elm: currElm, i, j });
        return true;
    }
    return nn.length == 0
}

function getNeighborElms(obj, i, j) {
    return [

        obj[`${i - 1}_${j - 1}`] && { [`${i - 1}_${j - 1}`]: obj[`${i - 1}_${j - 1}`] },
        obj[`${i - 1}_${j}`] && { [`${i - 1}_${j}`]: obj[`${i - 1}_${j}`] },
        obj[`${i - 1}_${j + 1}`] && { [`${i - 1}_${j + 1}`]: obj[`${i - 1}_${j + 1}`] },

        obj[`${i}_${j - 1}`] && { [`${i}_${j - 1}`]: obj[`${i}_${j - 1}`] },
        obj[`${i}_${j + 1}`] && { [`${i}_${j + 1}`]: obj[`${i}_${j + 1}`] },

        obj[`${i + 1}_${j - 1}`] && { [`${i + 1}_${j - 1}`]: obj[`${i + 1}_${j - 1}`] },
        obj[`${i + 1}_${j}`] && { [`${i + 1}_${j}`]: obj[`${i + 1}_${j}`] },
        obj[`${i + 1}_${j + 1}`] && { [`${i + 1}_${j + 1}`]: obj[`${i + 1}_${j + 1}`] },

    ].filter(e => e)
}
