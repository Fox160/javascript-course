shuffle();

function createCards() {
    let element = document.createElement('div');
    element.classList.add('container');
    document.body.appendChild(element);
    for (let i = 0; i < 15; i++) {
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('card');
        innerDiv.innerHTML += i + 1 + '';
        element.appendChild(innerDiv);
    }
}

//В будущем использовать эту функцию при нажатии кнопки "Старт"
function shuffle() {
    createCards();
    var container = document.getElementsByClassName('container')[0];
    var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('card'));
    elementsArray.forEach(function(element) {
        container.removeChild(element);
    });
    shuffleArray(elementsArray);
    elementsArray.forEach(function(element) {
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
