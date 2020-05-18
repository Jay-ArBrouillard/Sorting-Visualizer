var arr = generateArray(20);
var bars = document.querySelectorAll('.bar');
var slider = document.getElementById('arraySize');
var delaySlider = document.getElementById('delaySlider');
var generateBtn = document.getElementById('generate');
var sortBtn = document.getElementById('sort');
var comparisons = document.getElementById('comparisons');
var accesses = document.getElementById('accesses');
var selectionBox = document.getElementById('select');
var numElements = document.getElementById('elements');
const totalPixelWidth = document.getElementById('container').offsetWidth;
const totalPixelHeight = document.getElementById('container').offsetWidth;
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
    const selection = selectionBox.options[selectionBox.selectedIndex].text;
    switch (selection) {
        case 'Bubble Sort':
            bubbleSort();
            break;
        case 'Insertion Sort':
            insertionSort();
            break;
        case 'Bogo Sort':
            bogoSort();
            break;
        case 'Selection Sort':
            selectionSort();
            break;
        default:
            console.log("Error")
    }
});

slider.addEventListener('input', function() {
    var container = document.getElementById('container');
    var numChildElem = container.childElementCount;
    if (numChildElem < slider.value) {
        for (var i = 0; i < (slider.value - numChildElem); i++) {
            addElement();
        }
    }
    else {
        for (var i = 0; i < (numChildElem - slider.value); i++) {
            removeElement();
        }
    }
    bars = document.querySelectorAll('.bar');
    arr = generateArray(bars.length);
    setBarHeights(bars.length);
    numElements.innerHTML = numberWithCommas(bars.length)
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
    // var body = document.body,
    // html = document.documentElement;
    // var height = Math.max( body.scrollHeight, body.offsetHeight, 
    //                    html.clientHeight, html.scrollHeight, html.offsetHeight );
    // var headerHeight = document.getElementById('header').offsetHeight + 40;
    // var barHeight = height - headerHeight;
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

async function bubbleSort() {
    var isSorted = false;
    var lastUnsorted = arr.length-1;
    var numComparisons = 0
    var numAccesses = 0
    accesses.innerHTML = 0;
    comparisons.innerHTML = 0;
    while (!isSorted) {
        isSorted = true;
        for (var i = 0; i < lastUnsorted; i++) {
            bars[i].style.background = "red";
            bars[i+1].style.background = "red";
            if (sortDelay > 0) await sleep(sortDelay)
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                bars[i].parentNode.insertBefore(bars[i+1], bars[i]);
                bars = document.querySelectorAll('.bar');
                isSorted = false;
                bars[i].style.background = "purple";
                bars[i+1].style.background = "purple";
                if (sortDelay > 0) await sleep(sortDelay)
                numAccesses += 2;
                accesses.innerHTML = numberWithCommas(numAccesses);
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

async function insertionSort() {
    var n = arr.length; 
    var numComparisons = 0;
    var numAccesses = 0;
    for (var i = 1; i < n; ++i) { 
        var key = arr[i]; 
        var j = i - 1;
        numAccesses++;
        bars[i].style.background = "red";
        bars[j].style.background = "red";
        const savedJ = j;
        if (sortDelay > 0) {
            await sleep(sortDelay)
        }

        while (j >= 0 && arr[j] > key) {
            bars[j].style.background = "purple";
            bars[j+1].style.background = "purple";
            if (sortDelay > 0) await sleep(sortDelay)
            bars[j].parentNode.insertBefore(bars[j+1], bars[j]);
            bars = document.querySelectorAll('.bar');
            bars[j].style.background = "green";
            bars[j+1].style.background = "green";
            arr[j + 1] = arr[j]; 
            j = j - 1;
            numComparisons++;
            numAccesses++;
            comparisons.innerHTML = numberWithCommas(numComparisons);
            accesses.innerHTML = numberWithCommas(numAccesses);
        }

        bars[i].style.background = "green";
        bars[savedJ].style.background = "green";
        arr[j + 1] = key;
        numAccesses++;
        accesses.innerHTML = numberWithCommas(numAccesses);
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

async function bogoSort() {
    var n = arr.length; 
    var numComparisons = 0;
    var numAccesses = 0;
    shuffle = function() {
         for (var i= 1; i < n; i++) {
            swap(arr, i, Math.floor(Math.random()*n)); 
            numAccesses += 4;
            accesses.innerHTML = numberWithCommas(numAccesses);
         }
    };

    isSorted = function(){
        for(var i= 1 ; i < n; i++) {
            numComparisons++;
            numAccesses += 2;
            comparisons.innerHTML = numberWithCommas(numComparisons);
            accesses.innerHTML = numberWithCommas(numAccesses);
            if (arr[i-1] > arr[i]) {
                return false; 
            }
            else {
                bars[i-1].style.background = "green";
                bars[i].style.background = "green";
            }
        }
        return true;
    }

    var sorted = false;
    while(sorted == false){
        shuffle();
        setBarHeights(n);
        sorted = isSorted();
        if (sortDelay > 0) await sleep(sortDelay)
        if (!sorted) {
            var i = 0;
            while (i < n && bars[i].style.background == "green") {
                bars[i].style.background = "steelblue";
                i++;
            }
        }
    }
}

async function selectionSort() {
    var numAccesses = 0;
    var numComparisons = 0;
    var n = arr.length;
    for (var i = 0; i < n; i++) {
        var currMin = arr[i];
        var minIndex = i;
        numAccesses++;
        for (var j = i; j < n; j++) {
            bars[minIndex].style.background = "red";
            bars[j].style.background = "red";
            if (sortDelay > 0) await sleep(sortDelay)
            if (arr[j] < currMin) {
                bars[minIndex].style.background = "steelblue";
                currMin = arr[j];
                minIndex = j;
                bars[minIndex].style.background = "red";
            }
            bars[minIndex].style.background = "steelblue";
            bars[j].style.background = "steelblue";
            numAccesses++;
            numComparisons++;
            comparisons.innerHTML = numberWithCommas(numComparisons);
            accesses.innerHTML = numberWithCommas(numAccesses);
        }
        swap(arr, i, minIndex);
        numAccesses += 4;
        accesses.innerHTML = numberWithCommas(numAccesses);
        if (i == minIndex) {
            bars[i].style.background = "purple";
        }
        else {
            bars[i].style.background = "purple";
            bars[minIndex].style.background = "purple";
        }
        if (sortDelay > 0) await sleep(sortDelay)
        swapElements(bars[i], bars[minIndex])
        if (i == minIndex) {
            bars[i].style.background = "green";
        }
        else {
            bars[i].style.background = "steelblue";
            bars[minIndex].style.background = "green";
        }
        bars = document.querySelectorAll('.bar');
    }
}

function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);
    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);
    // remove temporary marker node
    temp.parentNode.removeChild(temp);
}