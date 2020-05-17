
var arr = generateArray(10);
var bars = document.querySelectorAll('.bar');
var slider = document.getElementById("arraySize");
const totalPixelWidth = document.getElementById('container').offsetWidth;
//Set the max array size based on size of the screen; capped at 1000
setMaxArraySize()
setBarHeights(10)

slider.addEventListener('input', function() {
    var container = document.getElementById('container');
    const numChildElem = container.childElementCount;
    if (numChildElem < slider.value) {
        while (container.childElementCount != slider.value) {
            addElement();
        }
    }
    else {
        while (container.childElementCount != slider.value) {
            removeElement();
        }
    }
    console.log(slider.value)

    arr = generateArray(slider.value);
    setBarHeights(slider.value)
});

function setMaxArraySize() {
    for (var i = 10; i < 1000; i++) {
        var barWidth = (totalPixelWidth - i * 2) / i;
        if (barWidth < 2.0) {
            slider.max = i-1;
            break;
        }
    }
}

function generateArray(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(getRandomIntegerRange(5,750));
    }
    return arr;
}

function getRandomIntegerRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addElement() {
    // Adds an element to the document
    var p = document.getElementById('container');
    var newElement = document.createElement('div');
    newElement.setAttribute('class', 'bar');
    newElement.setAttribute('style', 'background: steelblue;');
    newElement.setAttribute('style', 'height: 10px;');
    p.appendChild(newElement);
}

function removeElement() {
    var list = document.getElementById('container');
    list.removeChild(list.childNodes[0]);
}

function setBarHeights(numBars) {
    bars = document.querySelectorAll('.bar');
    var width = (totalPixelWidth - (numBars * 2)) / numBars;
    for (var i = 0; i < numBars; i++) {
        bars[i].style.height = arr[i].toString()+"px";
        bars[i].style.width = width.toString()+"px";
    }
}



