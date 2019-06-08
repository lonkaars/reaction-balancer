function solve(x) {
    bigNumber = 1;
    arrayOfNumbers = new Set(x.split(/\D+/g));
    arrayOfNumbers.delete("");
    for (let i of arrayOfNumbers) bigNumber *= parseInt(i);
    left = x.split("=")[0].split("+");
    righ = x.split("=")[1].split("+");
    molecules = left.length + righ.length;
    elems = new Set(x.replace(/\d+|\+|=/g, "").match(/([A-Z][a-z]*)/g));
    elems.delete("");
    rrefArray = [];
    for (let elem of elems) {
        buildArr = [];
        for (let molecule of left) {
            index = molecule.indexOf(elem);
            if (index == -1) buildArr.push(0);
            else {
                index += elem.length;
                numberAfterElement = molecule.substring(index).match(/^\d+/g);
                if (numberAfterElement == null) buildArr.push(1);
                else buildArr.push(parseInt(numberAfterElement));
            }
        }
        for (let molecule of righ) {
            index = molecule.indexOf(elem);
            if (index == -1) buildArr.push(0);
            else {
                index += elem.length;
                numberAfterElement = molecule.substring(index).match(/^\d+/g);
                if (numberAfterElement == null) buildArr.push(-1);
                else buildArr.push(parseInt(numberAfterElement) * (-1));
            }
        }
        rrefArray.push(buildArr);
    }
    for (pivot = 0; pivot < Math.min(molecules, elems.size); pivot++) {
        for (i = pivot; i < rrefArray.length; i++) {
            row = rrefArray[i];
            if (row[pivot] != 0) {
                workingOnThisRow = rrefArray.splice(rrefArray.indexOf(row), 1)[0];
            }
        }
        multiplyWhat = bigNumber / workingOnThisRow[pivot]
        for (i = 0; i < workingOnThisRow.length; i++) workingOnThisRow[i] *= multiplyWhat
        for (let i in rrefArray) {
            row = rrefArray[i];
            if (row[pivot] != 0) {
                multiplyWhat = bigNumber / row[pivot]
                for (j = 0; j < row.length; j++) {
                    row[j] *= multiplyWhat;
                    row[j] -= workingOnThisRow[j];
                    row[j] /= multiplyWhat;
                }
                rrefArray[i] = row;
            }
        }
        rrefArray.splice(pivot, 0, workingOnThisRow);
    }
    if (rrefArray[0][elems.size] == 0 || rrefArray[0][elems.size] == undefined) return "NoSol";
    bigNumber *= -1;
    gcd_calc = function (a, b) {
        if (!b) return a;
        return gcd_calc(b, a % b);
    };
    coEffs = [];
    gcd = bigNumber;
    for (i = 0; i < rrefArray.length; i++) {
        num = rrefArray[i][molecules - 1];
        coEffs.push(num);
        gcd = gcd_calc(gcd, num)
    }
    coEffs.push(bigNumber);
    for (i = 0; i < coEffs.length; i++) coEffs[i] /= gcd;
    out = "";
    for (i = 0; i < coEffs.length; i++) {
        coEff = coEffs[i];
        if (coEff != 1) out += coEff;
        out += left.shift();
        if (left.length == 0 && righ.length != 0) {
            out += "=";
            left = righ;
        } else if (i != coEffs.length - 1) out += "+";
    }
    return out;
}

function returnHTML(expr){
    if(expr == null){
        return "<span class=\"reactionError\">Invalid reaction entered</span>";
    }
    var arr = expr.match(/([0-9]|[A-z])+|(\+|=)/g);
    var out = '';
    for(let i = 0; i < arr.length; i++){
        if(arr[i].match(/^\d/)){
            out += `<span class="elemIndex">${arr[i].match(/^\d*/)}</span><span class=elem>${arr[i].match(/(^\d*)|(.*)/g)[1]}</span>`
        } else if(arr[i].match(/\+|=/)){
            out += `<span class="reactionSeperator">${arr[i]}</span>`;
        } else {
            out += `<span class="elemIndex">1</span><span class=elem>${arr[i]}</span>`
        }
    }
    return out;
}