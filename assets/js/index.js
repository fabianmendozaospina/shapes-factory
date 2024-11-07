'use strict';

const CAPACITY = 25;
const CONTAINER_FULL = 'Sorry, the container is full. Please, refresh the page to empty it again.';
const CONTAINER_EMPTY = 'Please, choose the shape and color to put it in the container.';

const shapeObj = select('.shape');
const colorObj = select('.color');
const generateObj = select('.create');
const shapesListObj = select('.shapes');
const messageObj = select('.message');
const shapes = [];
const colorMap = {
    "#09f": "Blue",
    "#9f0": "Green",
    "#f90": "Orange",
    "#f09": "Pink",
    "#90f": "Purple"
};

class Shape {
    constructor(index, name, color) {
        this._index = index;
        this._name = name;
        this._color = color  = colorMap[color] || color;
    }
 
    get index() {
        return this._index;
    }

    get color() {
        return this._color;
    }

    get name() {
        return this._name;
    }
  
    getInfo() {
        return `Unit ${this._index + 1}: ${this._color} ${this._name} `;
    } 
}

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

listen('click', generateObj, () => {
    createShape();
});

function createShape() {
    const shapeName = shapeObj.value;
    const colorName = colorObj.value;

    if (shapeName.toString().trim() === '' || colorName.toString().trim() === '') {
        messageObj.textContent = CONTAINER_EMPTY;
        return;
    }

    let index = shapes.length;
    const newShape = new Shape(index, shapeName, colorName);
    const shapeDiv = document.createElement('div');

    shapes.push(newShape);
    shapeDiv.className = shapeName;
    shapeDiv.style.backgroundColor = colorName;
    shapeDiv.dataset.index = index; 
    shapeDiv.dataset.name = shapeName; 
    shapeDiv.dataset.color = colorName;
    shapesListObj.appendChild(shapeDiv);

    addShapeClickListener(shapeDiv, newShape);
    verifyCapacity();
}

function addShapeClickListener(shapeDiv, newShape) { 
    listen('click', shapeDiv, () => { 
        messageObj.textContent = newShape.getInfo(); 
    }); 
}

function verifyCapacity() {
    if (shapes.length >= CAPACITY) {
        generateObj.style.backgroundColor = "#909090";
        generateObj.disabled = true;
        generateObj.style.cursor = "default";
        messageObj.textContent = CONTAINER_FULL;

    } else {
        generateObj.style.backgroundColor = "#ff8800";
        generateObj.disabled = false;
        generateObj.style.cursor = "pointer";
        messageObj.textContent = CONTAINER_EMPTY;
    }
}

verifyCapacity();