let counterField = createElement('p', 'Ходы: 0', 'counter');
let container = createElement('div', '', 'container');
let emptyDiv = '';
let counter = undefined;
let button = createElement('button', 'Начать игру');
button.onclick = startGame;
createCards();

function createElement(tagName, innerText, className, parentNode) {
    let elem = document.createElement(tagName);
    elem.innerHTML = innerText;
    if (className != undefined) {
        elem.classList.add(className);
    }
    if (parentNode == undefined) {
        document.body.appendChild(elem);
    } else {
        parentNode.appendChild(elem);
    }
    return elem;
}

function createCards() {
    for (let i = 0; i < 15; i++) {
        let innerDiv = createElement('div', i + 1 + '', 'card', container);
        innerDiv.addEventListener('click', moveCard);
        setNewAttribute(innerDiv, parseInt(i % 4, 10), parseInt(i / 4, 10));
    }

    emptyDiv = createElement('div', '', 'emptyCard', container);
    setNewAttribute(emptyDiv, 3, 3);
}

function moveCard() {
    const columnAttr = this.getAttribute('column');
    const rowAttr = this.getAttribute('row');

    if (this.getAttribute('row') == emptyDiv.getAttribute('row')) {
        if (+this.getAttribute('column') + 1 == emptyDiv.getAttribute('column')) {
            //Right
            emptyDiv.parentNode.insertBefore(emptyDiv, this);
        } else if (+this.getAttribute('column') - 1 == emptyDiv.getAttribute('column')) {
            //Left
            emptyDiv.parentNode.insertBefore(this, emptyDiv);
        } else {
            return;
        }
    } else if (this.getAttribute('column') == emptyDiv.getAttribute('column')) {
        const afterNode2 = emptyDiv.nextElementSibling;

        if (
            +this.getAttribute('row') + 1 == emptyDiv.getAttribute('row') ||
            +this.getAttribute('row') - 1 == emptyDiv.getAttribute('row')
        ) {
            //Up or Down
            this.replaceWith(emptyDiv);
            emptyDiv.parentNode.insertBefore(this, afterNode2);
        } else {
            return;
        }
    } else {
        return;
    }
    setNewAttribute(this, emptyDiv.getAttribute('column'), emptyDiv.getAttribute('row'));
    setNewAttribute(emptyDiv, columnAttr, rowAttr);

    counterField.innerHTML = 'Ходы: ' + parseInt(counter());
    isGameOver();
}

function setNewAttribute(toNode, columnAttr, rowAttr) {
    toNode.setAttribute('row', rowAttr);
    toNode.setAttribute('column', columnAttr);
}

function startGame() {
    let elementsArray = Array.prototype.slice.call(container.getElementsByTagName('div'));
    elementsArray.forEach(function(element) {
        container.removeChild(element);
    });
    shuffleArray(elementsArray);

    elementsArray.forEach(function(element, i) {
        setNewAttribute(element, parseInt(i % 4, 10), parseInt(i / 4, 10));
        element.addEventListener('click', moveCard);
        container.appendChild(element);
    });

    //Перемешивать, пока не найдется выигрышный вариант
    while (!isSolutionExists()) {
        shuffleArray(elementsArray);
        elementsArray.forEach(function(element, i) {
            setNewAttribute(element, parseInt(i % 4, 10), parseInt(i / 4, 10));
            container.appendChild(element);
            element.addEventListener('click', moveCard);
        });
    }
    counterField.innerHTML = 'Ходы: 0';
    counter = makeCounter();
}

function makeCounter() {
    let currentCount = 1;
    return function() {
        return currentCount++;
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function disableField() {
    let elementsArray = Array.prototype.slice.call(container.getElementsByTagName('div'));
    elementsArray.forEach(function(element) {
        element.removeEventListener('click', moveCard);
    });
}

function isGameOver() {
    let array = Array.prototype.slice.call(container.getElementsByTagName('div'));

    for (let i = 0; i < 15; i++) {
        if (array[i].innerHTML !== i + 1 + '') {
            return false;
        }
    }
    alert('Игра окончена!');
    disableField();
    return true;
}

function isSolutionExists() {
    let numInversions = 0;
    let array = container.getElementsByTagName('div');

    for (let i = 0; i < 16; ++i) {
        if (array[i].innerHTML !== '') {
            for (let j = 0; j < i; ++j) {
                if (+array[j].innerHTML > +array[i].innerHTML) {
                    ++numInversions;
                }
            }
        }
    }
    for (let i = 0; i < 16; ++i) {
        if (array[i].innerHTML == '') {
            numInversions += 1 + i / 4;
        }
    }

    return numInversions % 2 == 0;
}
