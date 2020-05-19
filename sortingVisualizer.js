var arr = []
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
initialize()

function initialize() {
    setupSliders();
    setupButtons();
    setMaxArraySize(); //Set the max array size based on size of the screen; capped at 1000
    arr = generateArray(20);
    setBarHeights(20);
}

function setupSliders() {
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
}

function setupButtons() {
    sortBtn.addEventListener('click', function() {
        const selection = selectionBox.options[selectionBox.selectedIndex].text;
        resetWatch();
        buttonsAndSliderOFF();
        switch (selection) {
            case 'Bubble Sort':
                startWatch();
                const runBubbleSort = async() => { 
                    await bubbleSort();
                    stopWatch();
                    buttonsAndSliderON();
                }
                runBubbleSort();
                break;
            case 'Insertion Sort':
                startWatch();
                const runInsertionSort = async() => { 
                    await insertionSort();
                    stopWatch();
                    buttonsAndSliderON();
                }
                runInsertionSort();
                break;
            case 'Bogo Sort':
                startWatch();
                const runBogoSort = async() => { 
                    await bogoSort();
                    stopWatch();
                    buttonsAndSliderON();
                }
                runBogoSort();
                break;
            case 'Selection Sort':
                startWatch();
                const runSelectionSort = async() => { 
                    await selectionSort();
                    stopWatch();
                    buttonsAndSliderON();
                }
                runSelectionSort();
                break;
            case 'Quicksort Sort':
                startWatch();
                const runQuickSort = async() => { 
                    //Need to set to 0 since quicksort using async recursion
                    comparisons.innerHTML = 0;
                    accesses.innerHTML = 0;
                    await quickSort(arr, 0, arr.length - 1);
                    stopWatch();
                    setAllBarsGreen(true);
                    buttonsAndSliderON();
                }
                runQuickSort();
                break;
            case 'Merge Sort':
                startWatch();
                const runMergeSort = async() => { 
                    await mergeSort();
                    stopWatch();
                    setAllBarsGreen(true);
                    buttonsAndSliderON();
                }
                runMergeSort();
                break;
            case 'Gnome Sort':
                startWatch();
                const runGnomeSort = async() => { 
                    await gnomeSort();
                    stopWatch();
                    setAllBarsGreen(true);
                    buttonsAndSliderON();
                }
                runGnomeSort();
                break;
            case 'Cocktail Sort':
                startWatch();
                const runCocktailSort = async() => { 
                    await cocktailSort();
                    stopWatch();
                    buttonsAndSliderON();
                }
                runCocktailSort();
                break;
            default:
                console.log("Error")
        }
    });
    generateBtn.addEventListener('click', function() {
        arr = generateArray(slider.value);
        setBarHeights(slider.value)
    });
}
function buttonsAndSliderON() {
    generateBtn.className = "active";
    sortBtn.className = "active";
    slider.className = "active, slider";
    generateBtn.disabled = false;
    sortBtn.disabled = false;
    slider.disabled = false;
}

function buttonsAndSliderOFF() {
    generateBtn.className = "notActive";
    sortBtn.className = "notActive";
    slider.className = "notActive, slider";
    generateBtn.disabled = true;
    sortBtn.disabled = true;
    slider.disabled = true;
}

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