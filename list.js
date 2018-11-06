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
    for (var i = 0; i < MAX_ELEM_LIST; i++) {
        list[i] = Number.NaN;
    }
    return list;
}

function isEmpty(list) {
    var isEmpty = false;
    if (isNaN(list[0])) isEmpty = true;
    return isEmpty;
}

function isFull(list) {
    var isFull = false;
    if (!isNaN(list[MAX_ELEM_LIST - 1])) isFull = true;
    return isFull;
}

function size(list) {
    var length = 0;
    while (length < MAX_ELEM_LIST && !isNaN(list[length])) length++;
    return length;
}

function add(list, elem) {
    elem = parseInt(elem);
    if (isNaN(elem)) throw "The element is not a number";
    if (!isFull(list)) {
        list[size(list)] = elem;
    } else {
        throw "The list is Full. You can't put the element in it";
    }
    return size(list);
}

function addAt(list, elem, index) {
    elem = parseInt(elem);
    index = parseInt(index);
    if (isNaN(elem)) throw "The element is not a number";
    if (isNaN(index)) throw "The index is not a number";
    if (!isFull(list)) {
        if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
        for (let j = size(list); j > index; j--) {
            list[j] = list[j - 1];
        }
        list[index] = elem;
    } else {
        throw "The list is Full. You can't put the element in it";
    }
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
    var position = -1;
    elem = parseInt(elem);
    if (!isNaN(elem)) {
        if (!isEmpty(list)) {
            var length = size(list);
            var i = 0;
            while (i < length && position === -1) {
                if (list[i] === elem) {
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

function lastIndexOf(list, elem) {
    var position = -1;
    elem = parseInt(elem);
    if (!isNaN(elem)) {
        if (!isEmpty(list)) {
            var i = size(list) - 1;
            while (i >= 0 && position === -1) {
                if (list[i] === elem) {
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

function capacity(list) {
    return MAX_ELEM_LIST;
}

function clear(list) {
    var elem = Number.NaN;
    if (!isEmpty(list)) {
        var length = size(list);
        for (var i = 0; i < length; i++) {
            list[i] = Number.NaN;
        }
    }
}

function firstElement(list) {
    var first;
    if (!isEmpty(list)) {
        first = list[0];
    } else {
        throw "The list is empty.";
    }
    return first;
}

function lastElement(list) {
    var last;
    if (!isEmpty(list)) {
        last = list[size(list) - 1];
    } else {
        throw "The list is empty.";
    }
    return last;
}

function remove(list, index) {
    var elem = 0;
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
    if (!isEmpty(list)) {
        var lastIndex = size(list) - 1;
        elem = list[index];
        for (var i = index; i < lastIndex; i++) {
            list[i] = list[i + 1];
        }
        list[i] = Number.NaN;
    } else {
        throw "The list is empty. You can't remove any element";
    }
    return elem;
}

function removeElement(list, elem) {
    var elem = parseInt(elem);
    var isDeleted = false;
    if (!isNaN(elem)) {
        if (!isEmpty(list)) {
            var lastIndex = size(list) - 1;
            for (let i = 0, j = 0; i < lastIndex; i++) {
                if (list[i + j] === elem) {
                    isDeleted = true;
                    remove(list, i + j);
                    j--;
                }
            }
        } else {
            throw "The list is empty. You can't remove any element";
        }
    } else {
        throw "The element is not a number";
    }
    return isDeleted;
}

function set(list, elem, index) {
    var elem = parseInt(elem);
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw "Index out of bounds";
    if (!isNaN(elem)) {
        var elemAnt = list[index];
        list[index] = elem;
    }else {
        throw "The element os not a number";
    }
    return elemAnt;
}