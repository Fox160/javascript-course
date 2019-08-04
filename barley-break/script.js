var container = '';

createCards();
shuffle();

let emptyDiv = document.createElement('div');
emptyDiv.classList.add('emptyCard');
emptyDiv.setAttribute('row', 3);
emptyDiv.setAttribute('column', 3);
container.appendChild(emptyDiv);

var button = document.createElement("button");
    button.innerHTML = "Начать игру";
    // button.onclick = shuffle;
    document.body.appendChild(button);

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
}

function setNewAttribute(toNode, columnAttr, rowAttr) {
    toNode.setAttribute('row', rowAttr);
    toNode.setAttribute('column', columnAttr);
}

function createCards() {
    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
    for (let i = 0; i < 15; i++) {
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('card');
        innerDiv.innerHTML += i + 1 + '';
        container.appendChild(innerDiv);
        innerDiv.addEventListener('click', moveCard);
    }
}

//В будущем использовать эту функцию при нажатии кнопки "Старт"
function shuffle() {
    var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('card'));
    elementsArray.forEach(function(element) {
        container.removeChild(element);
    });
    shuffleArray(elementsArray);

    elementsArray.forEach(function(element, i) {
        element.setAttribute('row', parseInt(i / 4, 10));
        element.setAttribute('column', parseInt(i % 4, 10));
        container.appendChild(element);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
