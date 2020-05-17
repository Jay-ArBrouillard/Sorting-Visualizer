
var arr = generateArray(10);
var bars = document.querySelectorAll('.bar');
var slider = document.getElementById("arraySize");
var barSpacing = 10
const totalPixelWidth = document.getElementById('container').offsetWidth;
setBarHeights(10, barSpacing)

slider.addEventListener('change', function() {
    var container = document.getElementById('container');
    container.innerHTML = '';
    for (var i = 0; i < slider.value; i++) {
        addElement();
    }
    arr = generateArray(slider.value);
    //ŷ = -0.00444X + 4.6096
    barSpacing = slider.value * .00444 + 4.6;
    setBarHeights(slider.value, barSpacing)
});

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

function setBarHeights(numBars, barSpacing) {
    bars = document.querySelectorAll('.bar');
    var width = (totalPixelWidth - (numBars * barSpacing * 2)) / numBars;
    console.log(numBars)
    console.log(width)
    console.log(totalPixelWidth)
    for (var i = 0; i < numBars; i++) {
        bars[i].style.height = arr[i].toString()+"px";
        bars[i].style.width = width.toString()+"px";
        bars[i].style.margin = "0px " + barSpacing.toString()+"px";
    }
}



