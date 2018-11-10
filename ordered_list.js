"use strict";

/* Page functions */
var NUMBERS_OLIST = create();

function cleanData() {
    document.getElementById("num").value = "";
    document.getElementById("pos").value = "";
}

function addNumber(num, pos) {
    var error = document.getElementById("error");
    var olist = document.getElementById("olist");
    error.innerHTML = "";
    try {
        add(NUMBERS_OLIST, num);
        olist.innerHTML = toString(NUMBERS_OLIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

function removeByIndex(pos) {
    var error = document.getElementById("error");
    var olist = document.getElementById("olist");
    error.innerHTML = "";
    try {
        (pos == "") ? remove(NUMBERS_OLIST, lastElement(NUMBERS_OLIST))
                    : remove(NUMBERS_OLIST, pos);
        olist.innerHTML = toString(NUMBERS_OLIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

/* Olist Functions */

var MAX_ELEM_OLIST = 5;
function create() {
    var olist = [];
    for (var i = 0; i < MAX_ELEM_OLIST; i++) {
        olist[i] = Number.NaN;
    }
    return olist;
}

function isEmpty(olist) {
    var isEmpty = false;
    if (isNaN(olist[0])) isEmpty = true;
    return isEmpty;
}

function isFull(olist) {
    var isFull = false;
    if (!isNaN(olist[MAX_ELEM_OLIST - 1])) isFull = true;
    return isFull;
}

function size(olist) {
    var length = 0;
    while (length < MAX_ELEM_OLIST && !isNaN(olist[length])) length++;
    return length;
}

function add(olist, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (!isFull(olist)) {
        olist[size(olist)] = elem;
    } else {
        throw "The olist is Full. You can't put the element in it";
    }
    return size(olist);
}

function addAt(olist, elem, index) {
    elem = parseInt(elem);
    index = parseInt(index);
    if (isNaN(elem)) throw "The element is not a number";
    if (isNaN(index)) throw "The index is not a number";
    if (!isFull(olist)) {
        if ((index >= size(olist) || (index < 0))) throw "Index out of bounds";
        for (let j = size(olist); j > index; j--) {
            olist[j] = olist[j - 1];
        }
        olist[index] = elem;
    } else {
        throw "The olist is Full. You can't put the element in it";
    }
    return size(olist);
}

function get(olist, index) {
    index = parseInt(index);
    if ((index >= size(olist) || (index < 0))) throw "Index out of bounds";
    return olist[index];
}

function toString(olist) {
    var str = "";
    if (!isEmpty(olist)) {
        var length = size(olist);
        for (var i = 0; i < length - 1; i++) {
            str = str + olist[i] + " - ";
        }
        str = str + olist[i];
    }
    return str;
}

function indexOf(olist, elem) {
    var position = -1;
    elem = parseInt(elem);
    if (!isNaN(elem)) {
        if (!isEmpty(olist)) {
            var length = size(olist);
            var i = 0;
            while (i < length && position === -1) {
                if (olist[i] === elem) {
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

function lastIndexOf(olist, elem) {
    var position = -1;
    elem = parseInt(elem);
    if (!isNaN(elem)) {
        if (!isEmpty(olist)) {
            var i = size(olist) - 1;
            while (i >= 0 && position === -1) {
                if (olist[i] === elem) {
                    position = i;
                }
                i--;
            }
        }
    } else {
        throw "The element is not a number";
    }
    return position;
}

function capacity(olist) {
    return MAX_ELEM_OLIST;
}

function clear(olist) {
    var elem = Number.NaN;
    if (!isEmpty(olist)) {
        var length = size(olist);
        for (var i = 0; i < length; i++) {
            olist[i] = Number.NaN;
        }
    }
}

function firstElement(olist) {
    var first;
    if (!isEmpty(olist)) {
        first = olist[0];
    } else {
        throw "The olist is empty.";
    }
    return first;
}

function lastElement(olist) {
    var last;
    if (!isEmpty(olist)) {
        last = olist[size(olist) - 1];
    } else {
        throw "The olist is empty.";
    }
    return last;
}

function remove(olist, index) {
    var elem = 0;
    var index = parseInt(index);
    if ((index >= size(olist) || (index < 0))) throw "Index out of bounds";
    if (!isEmpty(olist)) {
        var lastIndex = size(olist) - 1;
        elem = olist[index];
        for (var i = index; i < lastIndex; i++) {
            olist[i] = olist[i + 1];
        }
        olist[i] = Number.NaN;
    } else {
        throw "The olist is empty. You can't remove any element";
    }
    return elem;
}

function removeElement(olist, elem) {
    var elem = parseInt(elem);
    var isDeleted = false;
    if (!isNaN(elem)) {
        if (!isEmpty(olist)) {
            var lastIndex = size(olist) - 1;
            for (let i = 0, j = 0; i < lastIndex; i++) {
                if (olist[i + j] === elem) {
                    isDeleted = true;
                    remove(olist, i + j);
                    j--;
                }
            }
        } else {
            throw "The olist is empty. You can't remove any element";
        }
    } else {
        throw "The element is not a number";
    }
    return isDeleted;
}

function set(olist, elem, index) {
    var elem = parseInt(elem);
    var index = parseInt(index);
    if ((index >= size(olist) || (index < 0))) throw "Index out of bounds";
    if (!isNaN(elem)) {
        var elemAnt = olist[index];
        olist[index] = elem;
    } else {
        throw "The element os not a number";
    }
    return elemAnt;
}

function testolist() {
    //var olist = create (); 	
    var olist = [];
    console.log("Capacidad: " + capacity(olist));
    console.log("Es vacía: " + isEmpty(olist));
    console.log("Longitud: " + size(olist));

    try {


        for (var i = 0; i < MAX_ELEM_OLIST - 1; i++) {
            console.log("Nº de elementos: " + add(olist, i * 10));
        }
        console.log("The full olist: " + toString(olist));
        console.log("Añado en index 2 valor 55: " + addAt(olist, 55, 2));
        add(olist, i); //It will generate an exception.
    } catch (err) {
        console.log(err);
    }

    console.log("Busco el valor 55 desde el principio: " + indexOf(olist, 55));
    console.log("Busco el valor 55 desde el final: " + lastIndexOf(olist, 55));
    console.log("The full olist: " + toString(olist));
    console.log("The first element olist: " + firstElement(olist));
    console.log("The last element olist: " + lastElement(olist));
    console.log("The element at index 3: " + get(olist, 3));

    //clear(olist);

    try {
        while (true) {
            console.log("Elimino elemento en index 3: " + remove(olist, 3));
            console.log("Elimino elemento 55 si lo encuentra: " + removeElement(olist, 55));
            console.log("The olist: " + toString(olist));
            console.log("Reemplazo elemento en index 1 por 66: " + set(olist, 66, 1));
        }
    } catch (err) {
        console.log(err); //When the olist is empty, an exception will be catched.
    }

    console.log("The olist: " + toString(olist));
}
window.onload = testolist;