"use strict";

/* Page functions */
var NUMBERS_OLIST = create();

function cleanData() {
    document.getElementById("num").value = "";
    document.getElementById("pos").value = "";
}

function addNumber(num, pos) {
    var error = document.getElementById("error");
    var oList = document.getElementById("oList");
    error.innerHTML = "";
    try {
        add(NUMBERS_OLIST, num);
        oList.innerHTML = toString(NUMBERS_OLIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

function removeByIndex(pos) {
    var error = document.getElementById("error");
    var oList = document.getElementById("oList");
    error.innerHTML = "";
    try {
        (pos == "") ? remove(NUMBERS_OLIST, lastElement(NUMBERS_OLIST))
            : remove(NUMBERS_OLIST, pos);
        oList.innerHTML = toString(NUMBERS_OLIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

/* OList Functions */

var MAX_ELEM_OLIST = 5;
function create() {
    var oList = [];
    for (var i = 0; i < MAX_ELEM_OLIST; i++) {
        oList[i] = Number.NaN;
    }
    return oList;
}

function isEmpty(oList) {
    var isEmpty = false;
    if (isNaN(oList[0])) isEmpty = true;
    return isEmpty;
}

function isFull(oList) {
    var isFull = false;
    if (!isNaN(oList[MAX_ELEM_OLIST - 1])) isFull = true;
    return isFull;
}

function size(oList) {
    var length = 0;
    while (length < MAX_ELEM_OLIST && !isNaN(oList[length])) length++;
    return length;
}

function add(oList, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (!isFull(oList)) {
        var iLastElem = size(oList);
        var foundGap = false;
        var i = 0;
        while (iLastElem > 0 && !foundGap) {
            if (oList[iLastElem - 1] <= elem) {
                foundGap = True;
            } else {
                oList[iLastElem] = oList[iLastElem - 1];
                iLastElem--;
            }
        }
        oList[iLastElem] = elem;
    } else {
        throw "The oList is Full. You can't put the element in it";
    }
    return size(oList);
}

function get(oList, index) {
    index = parseInt(index);
    if ((index >= size(oList) || (index < 0))) throw "Index out of bounds";
    return oList[index];
}

function toString(oList) {
    var str = "";
    if (!isEmpty(oList)) {
        var length = size(oList);
        for (var i = 0; i < length - 1; i++) {
            str = str + oList[i] + " - ";
        }
        str = str + oList[i];
    }
    return str;
}

function indexOf(oList, elem) {
    var position = -1;
    elem = parseInt(elem);
    if (!isNaN(elem)) {
        if (!isEmpty(oList)) {
            var length = size(oList);
            var i = 0;
            while (i < length && position === -1) {
                if (oList[i] === elem) {
                    position = i;
                }
                i++;
            }
        }
    } else {
        throw "The element is not a number";
    }
    return position;
}

function capacity(oList) {
    return MAX_ELEM_OLIST;
}

function clear(oList) {
    var elem = Number.NaN;
    if (!isEmpty(oList)) {
        var length = size(oList);
        for (var i = 0; i < length; i++) {
            oList[i] = Number.NaN;
        }
    }
}

function firstElement(oList) {
    var first;
    if (!isEmpty(oList)) {
        first = oList[0];
    } else {
        throw "The oList is empty.";
    }
    return first;
}

function lastElement(oList) {
    var last;
    if (!isEmpty(oList)) {
        last = oList[size(oList) - 1];
    } else {
        throw "The oList is empty.";
    }
    return last;
}

function remove(oList, index) {
    var elem = 0;
    var index = parseInt(index);
    if ((index >= size(oList) || (index < 0))) throw "Index out of bounds";
    if (!isEmpty(oList)) {
        var lastIndex = size(oList) - 1;
        elem = oList[index];
        for (var i = index; i < lastIndex; i++) {
            oList[i] = oList[i + 1];
        }
        oList[i] = Number.NaN;
    } else {
        throw "The oList is empty. You can't remove any element";
    }
    return elem;
}

function removeElement(oList, elem) {
    var elem = parseInt(elem);
    var isDeleted = false;
    if (!isNaN(elem)) {
        if (!isEmpty(oList)) {
            var lastIndex = size(oList) - 1;
            var i = 0, j = 0;
            while ((i < lastIndex) && !isDeleted) {
                if (oList[i + j] === elem) {
                    isDeleted = true;
                    for (var k = i + j; k < lastIndex; k++) {
                        list[k] = list[k + 1];
                    }
                    oList[k] = Number.NaN;
                    j--;
                }
                i++;
            }
        } else {
            throw "The oList is empty. You can't remove any element";
        }
    } else {
        throw "The element is not a number";
    }
    return isDeleted;
}

function testoList() {
    //var oList = create (); 	
    var oList = [];
    console.log("Capacidad: " + capacity(oList));
    console.log("Es vacía: " + isEmpty(oList));
    console.log("Longitud: " + size(oList));

    try {


        for (var i = 0; i < MAX_ELEM_OLIST - 1; i++) {
            console.log("Nº de elementos: " + add(oList, Math.random(0, 100)));
        }
        console.log("The full oList: " + toString(oList));
        console.log("Añado el número 55, deberá ordenarse como el resto de elementos: " + add(oList, 55));
        add(oList, i); //It will generate an exception.
    } catch (err) {
        console.log(err);
    }

    console.log("Busco el valor 55 desde el principio: " + indexOf(oList, 55));
    console.log("The full oList: " + toString(oList));
    console.log("The first element oList: " + firstElement(oList));
    console.log("The last element oList: " + lastElement(oList));
    console.log("The element at index 3: " + get(oList, 3));

    //clear(oList);

    try {
        while (true) {
            console.log("Elimino elemento en index 3: " + remove(oList, 3));
            console.log("Elimino elemento 55 si lo encuentra: " + removeElement(oList, 55));
            console.log("The oList: " + toString(oList));
        }
    } catch (err) {
        console.log(err); //When the oList is empty, an exception will be catched.
    }

    console.log("The oList: " + toString(oList));
}
window.onload = testoList;