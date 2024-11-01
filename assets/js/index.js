'use strict';

const shape = select('.shape');
const color = select('.color');
const generateBtn = select('.create');
const disableBtn = select('.disable-btn');
const output = select('.output');
const info = select('.info');
const shapes = [];
const CAPACITY = 30;

class Shape {
    constructor(index, name, color) {
        this._index = index;
        this._name = name;
        this._color = color;
    }
 
    get index() {
        return this._index;
    }

    get name() {
        return this._name;
    }
  
    get color() {
        return this._color;
    }
 
    getInfo() {
        return `Unit ${this._index}: ${this._name} ${this._color}`;
    }
}

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

listen('click', generateBtn, () => {
    generateShape();
});

function generateShape() {
    const shapeName = shape.value;
    const colorName = color.value;
    const index = shapes.length == 0 ? 0 : shapes.length - 1;
    const newShape = new Shape(index, shapeName, colorName);
    const shapeDiv = document.createElement('div');

    shapes.push(newShape);
    shapeDiv.className = `shape ${shapeName}`;
    shapeDiv.style.backgroundColor = colorName;
    output.appendChild(shapeDiv);

    newShape.addEventListener('click', () => {
        info.textContent = newShape.getInfo();
    });

    checkCapacity();
}

function checkCapacity() {
    if (shapes.length >= CAPACITY) {
        generateBtn.style.display = 'none';
        disableBtn.style.display = 'block';
        info.textContent = 'Sorry, the container is full. Please, refresh the page to empty it again.';

    } else {
        generateBtn.style.display = 'block';
        disableBtn.style.display = 'none';
        info.textContent = 'Please, choose the shape and color to generate it in the container.';
    }
}

checkCapacity();