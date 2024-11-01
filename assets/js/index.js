'use strict';

const shape = select('.shape');
const color = select('.color');
const generateBtn = select('.create');
const disableBtn = select('.disable-btn');
const output = select('.output');
const info = select('.info');
const shapes = [];
const CAPACITY = 30;
const colorMap = { // Added to map the colors
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
        this._color = color  = colorMap[color] || color; // Map hexadecimal to color name
    }
 
    get index() {
        return this._index;
    }

    get color() {
        return this._color; // chenged de order:  color - name
    }

    get name() {
        return this._name;
    }
  
    getInfo() {
        return `Unit ${this._index + 1}: ${this._color} ${this._name} `;
    } //Changed the position to index - color - name (like pdf model)
      // added  + 1 at index
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
    const index = shapes.length;// == 0 ? 0 : shapes.length - 1;
    
    const newShape = new Shape(index, shapeName, colorName);
    const shapeDiv = document.createElement('div');

    shapes.push(newShape);
    shapeDiv.className = `shape ${shapeName}`;
    shapeDiv.style.backgroundColor = colorName;
    shapeDiv.dataset.index = index; // Adiciona um atributo de dados
    shapeDiv.dataset.name = shapeName; // Adiciona um atributo de dados
    shapeDiv.dataset.color = colorName;// Adiciona um atributo de dados
    output.appendChild(shapeDiv);


    shapeDiv.addEventListener('click', () => {
        info.textContent = newShape.getInfo();
    });
/*
    newShape.addEventListener('click', () => {
        info.textContent = newShape.getInfo();
    });
*/
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