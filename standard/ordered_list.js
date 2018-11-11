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
    return oList;
}

function isEmpty(oList) {
    return (oList.length === 0);
}

function isFull(oList) {
    return (oList.length === MAX_ELEM_OLIST);
}

function size(oList) {
    return oList.length;
}

function add(oList, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (!isFull(oList)) {
        oList.push(elem);
        oList.sort(function (a, b) { return a - b });
    } else throw "The list is Full. You can't put the element in it";
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
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    return oList.indexOf(elem);
}

function capacity(oList) {
    return MAX_ELEM_OLIST;
}

function clear(oList) {
    if (!isEmpty(oList)) {
        oList.splice(0, oList.length);
    }
}

function firstElement(oList) {
    var first;
    if (!isEmpty(oList)) {
        first = oList[0];
    } else throw "The oList is empty.";
    return first;
}

function lastElement(oList) {
    var last;
    if (!isEmpty(oList)) {
        last = oList[size(oList) - 1];
    } else throw "The oList is empty.";
    return last;
}

function remove(oList, index) {
    var index = parseInt(index);
    if ((index >= size(oList) || (index < 0))) throw "Index out of bounds";
    if (isEmpty(oList)) throw "The list is empty. You can't remove any element";
    return oList.splice(index, 1);
}

function removeElement(oList, elem) {
    var elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (isEmpty(oList)) throw "The list is empty. You can't remove any element";
    var size = oList.length;
    var i = size - 1;
    while (oList[i] >= elem) {
        if (oList[i] === elem) oList.splice(i, 1);
        i--;
    }
    return size != oList.length;
}

function testoList() {
    //var oList = create (); 	
    var oList = [];
    console.log("Capacidad: " + capacity(oList));
    console.log("Es vacía: " + isEmpty(oList));
    console.log("Longitud: " + size(oList));

    try {


        for (var i = 0; i < MAX_ELEM_OLIST - 1; i++) {
            console.log("Nº de elementos: " + add(oList, Math.floor(Math.random() * 100) + 1));
        }
        console.log("The full oList: " + toString(oList));
        console.log("Añado el número 55, deberá ordenarse como el resto de elementos: " + add(oList, 55));
        add(oList, 66); //It will generate an exception.
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