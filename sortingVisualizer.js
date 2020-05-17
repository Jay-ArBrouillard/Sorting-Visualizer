
var arr = generateArray(20);
var bars = document.querySelectorAll('.bar');
var slider = document.getElementById('arraySize');
var delaySlider = document.getElementById('delaySlider');
var generateBtn = document.getElementById('generate');
var sortBtn = document.getElementById('sort');
var comparisons = document.getElementById('comparisons');
var swaps = document.getElementById('swaps');
const totalPixelWidth = document.getElementById('container').offsetWidth;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
var sortRunning = false;
var sortDelay = 1 //ms
//Set the max array size based on size of the screen; capped at 1000
setMaxArraySize()
setBarHeights(20)

delaySlider.addEventListener('input', function() {
    if (delaySlider.value == 0) {
        sortDelay = 0;
    }
    else if (delaySlider.value == 1) {
        sortDelay = 0.001;
    }
    else if (delaySlider.value == 2) {
        sortDelay = 1;
    }
    else { //Exponential increase in time
        sortDelay = Math.pow(2, delaySlider.value-2);
    }
});

sortBtn.addEventListener('click', function() {
    sortRunning = true;
    bubbleSort(arr);
});

slider.addEventListener('input', function() {
    var container = document.getElementById('container');
    var numChildElem = container.childElementCount;
    if (numChildElem < slider.value) {
        console.log("Adding ", slider.value - numChildElem)
        for (var i = 0; i < slider.value - numChildElem; i++) {
            addElement();
        }
    }
    else {
        console.log("Removing ", numChildElem - slider.value)
        for (var i = 0; i < (numChildElem - slider.value); i++) {
            removeElement();
        }
    }
    bars = document.querySelectorAll('.bar');
    arr = generateArray(bars.length);
    setBarHeights(bars.length);
});

generateBtn.addEventListener('click', function() {
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
    newElement.setAttribute('style', 'background: steelblue; height: 10px;');
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
        bars[i].style.background = "steelblue";
        bars[i].style.height = arr[i].toString()+"px";
        bars[i].style.width = width.toString()+"px";
    }
}

async function bubbleSort(arr) {
    var isSorted = false;
    var lastUnsorted = arr.length-1;
    var numComparisons = 0
    var numSwaps = 0
    swaps.innerHTML = 0;
    comparisons.innerHTML = 0;
    while (!isSorted) {
        isSorted = true;
        for (var i = 0; i < lastUnsorted; i++) {
            bars[i].style.background = "red";
            bars[i+1].style.background = "red";
            if (sortDelay > 0) {
                await sleep(sortDelay)
            }
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                bars[i].parentNode.insertBefore(bars[i+1], bars[i]);
                bars = document.querySelectorAll('.bar');
                isSorted = false;
                bars[i].style.background = "purple";
                bars[i+1].style.background = "purple";
                if (sortDelay > 0) {
                    await sleep(sortDelay)
                }
                numSwaps++;
                swaps.innerHTML = numberWithCommas(numSwaps);
            }
            bars[i].style.background = "steelblue";
            bars[i+1].style.background = "steelblue";
            numComparisons++;
            comparisons.innerHTML = numberWithCommas(numComparisons);
        }
        bars[lastUnsorted].style.background = "green";
        lastUnsorted -= 1;

        if (isSorted) {
            var i = 0;
            do {
                bars[i].style.background = "green";
                i++;
            }
            while (bars[i].style.background != "green");
        }
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}