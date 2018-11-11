"use strict";

/* Page functions */
var NUMBERS_LIST = create();

function cleanData() {
    document.getElementById("num").value = "";
    document.getElementById("pos").value = "";
}

function addNumberAt(num, pos) {
    var error = document.getElementById("error");
    var list = document.getElementById("list");
    error.innerHTML = "";
    try {
        (pos == "") ? add(NUMBERS_LIST, num)
            : addAt(NUMBERS_LIST, num, pos);
        list.innerHTML = toString(NUMBERS_LIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

function removeByIndex(pos) {
    var error = document.getElementById("error");
    var list = document.getElementById("list");
    error.innerHTML = "";
    try {
        (pos == "") ? remove(NUMBERS_LIST, lastElement(NUMBERS_LIST))
            : remove(NUMBERS_LIST, pos);
        list.innerHTML = toString(NUMBERS_LIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

/* list Functions */

var MAX_ELEM_LIST = 5;
function create() {
    var list = [];
    return list;
}

function isEmpty(list) {
    return (list.length === 0);
}

function isFull(list) {
    return (list.length === MAX_ELEM_LIST);
}

function size(list) {
    return list.length;
}

function add(list, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (!isFull(list)) {
        list.push(elem);
    } else throw "The list is Full. You can't put the element in it";
    return size(list);
}

function addAt(list, elem, index) {
    elem = parseInt(elem);
    index = parseInt(index);
    if (isNaN(elem)) throw "The element is not a number";
    if (isNaN(index)) throw "The index is not a number";
    if (!isFull(list)) {
        if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
        list.splice(index, 0, elem);
    } else throw "The list is Full. You can't put the element in it";
    return size(list);
}

function get(list, index) {
    index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
    return list[index];
}

function toString(list) {
    var str = "";
    if (!isEmpty(list)) {
        var length = size(list);
        for (var i = 0; i < length - 1; i++) {
            str = str + list[i] + " - ";
        }
        str = str + list[i];
    }
    return str;
}

function indexOf(list, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    return list.indexOf(elem);
}

function lastIndexOf(list, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    return list.lastIndexOf(elem);
}

function capacity(list) {
    return MAX_ELEM_LIST;
}

function clear(list) {
    if (!isEmpty(list)) {
        list.splice(0, list.length);
    }
}

function firstElement(list) {
    var first;
    if (!isEmpty(list)) {
        first = list[0];
    } else throw "The list is empty.";
    return first;
}

function lastElement(list) {
    var last;
    if (!isEmpty(list)) {
        last = list[list.length - 1];
    } else throw "The list is empty.";
    return last;
}

function remove(list, index) {
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
    if (isEmpty(list)) throw "The list is empty. You can't remove any element";
    return list.splice(index, 1);
}

function removeElement(list, elem) {
    var elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (isEmpty(list)) throw "The list is empty. You can't remove any element";
    var size = list.length;
    for (let i = size; i--;) {
        if (list[i] === elem) list.splice(i, 1);
    } //cómo podría hacerlo usando list.filter(function (el) { return el != elem });  ?        
    return size != list.length;
}

function set(list, elem, index) {
    var elem = parseInt(elem);
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
    if (!isNaN(elem)) {
        var elemAnt = list[index];
        list[index] = elem;
    } else throw "The element os not a number";
    return elemAnt;
}

function testlist() {
    //var list = create (); 	
    var list = [];
    console.log("Capacidad: " + capacity(list));
    console.log("Es vacía: " + isEmpty(list));
    console.log("Longitud: " + size(list));

    try {
        for (var i = 0; i < MAX_ELEM_LIST - 1; i++) {
            console.log("Nº de elementos: " + add(list, i * 10));
        }
        console.log("The full list: " + toString(list));
        console.log("Añado en index 2 valor 55: " + addAt(list, 55, 2));
        add(list, i); //It will generate an exception.
    } catch (err) {
        console.log(err);
    }

    console.log("Busco el valor 55 desde el principio: " + indexOf(list, 55));
    console.log("Busco el valor 55 desde el final: " + lastIndexOf(list, 55));
    console.log("The full list: " + toString(list));
    console.log("The first element list: " + firstElement(list));
    console.log("The last element list: " + lastElement(list));
    console.log("The element at index 3: " + get(list, 3));

    //clear(list);

    try {
        while (true) {
            console.log("Elimino elemento en index 3: " + remove(list, 3));
            console.log("Elimino elemento 55 si lo encuentra: " + removeElement(list, 55));
            console.log("The list: " + toString(list));
            console.log("Reemplazo elemento en index 1 por 66: " + set(list, 66, 1));
        }
    } catch (err) {
        console.log(err); //When the list is empty, an exception will be catched.
    }

    console.log("The list: " + toString(list));
}
window.onload = testlist;