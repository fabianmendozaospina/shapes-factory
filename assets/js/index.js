'use strict';

const shape = select('.shape');
const color = select('.color');
const generateBtn = select('.create');
const disableBtn = select('.disable-btn');
const output = select('.output');
const info = select('.info');
const shapes = [];
const CAPACITY = 30;
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

listen('click', generateBtn, () => {
    generateShape();
});

function generateShape() {
    const shapeName = shape.value;
    const colorName = color.value;
    const index = shapes.length;
    
    const newShape = new Shape(index, shapeName, colorName);
    const shapeDiv = document.createElement('div');

    shapes.push(newShape);
    shapeDiv.className = `shape ${shapeName}`;
    shapeDiv.style.backgroundColor = colorName;
    shapeDiv.dataset.index = index; 
    shapeDiv.dataset.name = shapeName; 
    shapeDiv.dataset.color = colorName;
    output.appendChild(shapeDiv);

    shapeDiv.addEventListener('click', () => {
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