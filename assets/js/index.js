'use strict';

const CAPACITY = 25;
const CONTAINER_FULL = 'Sorry, the container is full. Please, refresh the page to empty it again.';
const CONTAINER_EMPTY = 'Please, choose the shape and color to put it in the container.';

const shape = select('.shape');
const color = select('.color');
const generateObj = select('.create');
const disableObj = select('.disable-btn');
const shapesObj = select('.shapes');
const infoObj = select('.info');
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
    generateShape();
});

function generateShape() {
    const shapeName = shape.value;
    const colorName = color.value;

    if (shapeName.toString().trim() === '' && colorName.toString().trim() === '') {
        infoObj.textContent = CONTAINER_EMPTY;
        return;
    }

    const index = shapes.length;
    const newShape = new Shape(index, shapeName, colorName);
    const shapeDiv = document.createElement('div');

    shapes.push(newShape);
    shapeDiv.className = `shape ${shapeName}`;
    shapeDiv.style.backgroundColor = colorName;
    shapeDiv.dataset.index = index; 
    shapeDiv.dataset.name = shapeName; 
    shapeDiv.dataset.color = colorName;
    shapesObj.appendChild(shapeDiv);

    listen('click', shapeDiv, () => {
        infoObj.textContent = newShape.getInfo();
    });    

    verifyCapacity();
}

function verifyCapacity() {
    if (shapes.length >= CAPACITY) {
        generateObj.style.display = 'none';
        disableObj.style.display = 'block';
        infoObj.textContent = CONTAINER_FULL;

    } else {
        generateObj.style.display = 'block';
        disableObj.style.display = 'none';
        infoObj.textContent = CONTAINER_EMPTY;
    }
}

verifyCapacity();