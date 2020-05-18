//////////////////////////////////BUBBLE SORT//////////////////////////////////////////////
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
                await swap(arr, i, i+1);
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

//////////////////////////////////INSERTION SORT//////////////////////////////////////////////
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

//////////////////////////////////BOGO SORT//////////////////////////////////////////////
async function bogoSort() {
    var n = arr.length; 
    var numComparisons = 0;
    var numAccesses = 0;
    shuffle = async () => {
         for (var i= 1; i < n; i++) {
            await swap(arr, i, Math.floor(Math.random()*n)); 
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

//////////////////////////////////SELECTION SORT//////////////////////////////////////////////
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
        await swap(arr, i, minIndex);
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

//////////////////////////////////QUICK SORT//////////////////////////////////////////////
async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}
  
async function partition(arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        bars[pivotIndex].style.background = "red";
        bars[i].style.background = "red";
        if (arr[i] < pivotValue) {
            bars[pivotIndex].style.background = "purple";
            bars[i].style.background = "purple";
            if (sortDelay > 0) await sleep(sortDelay);
            bars[pivotIndex].style.background = "steelblue";
            bars[i].style.background = "steelblue";
            swapElements(bars[i], bars[pivotIndex]);
            bars = document.querySelectorAll('.bar');
            await swap(arr, i, pivotIndex);
            pivotIndex++;
        }
        if (sortDelay > 0) await sleep(sortDelay);
        bars[pivotIndex].style.background = "steelblue";
        bars[i].style.background = "steelblue";
    }
    if (sortDelay > 0) await sleep(sortDelay);
    swapElements(bars[pivotIndex], bars[end]);
    bars = document.querySelectorAll('.bar');

    await swap(arr, pivotIndex, end);
    return pivotIndex;
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

async function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function setAllBarsGreen(useDelay) {
    if (useDelay) {
        for (var i = 0; i < bars.length; i++) {
            await sleep(0.1);
            bars[i].style.background = "green";
        }
    }
    else {
        for (var i = 0; i < bars.length; i++) {
            bars[i].style.background = "green";
        }
    }
}