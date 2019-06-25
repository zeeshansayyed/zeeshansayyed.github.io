// var img = document.createElement('img');
// img.src = 'images/alf-15.png'

const NUM_IMAGES = 50;
let page_no = 14;

let images = new Array(NUM_IMAGES);
for (let index = 1; index <= NUM_IMAGES; index++) {
    images[`alf-${index}`] = new Image();
    images[`alf-${index}`].src = `images/alf-${index}.png`
}

function changePage() {
    console.log(document.getElementById("pageNo").value);
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    page_no = `alf-${document.getElementById("pageNo").value}`
    context.drawImage(images[page_no], 0, 0);
    return context;
}

function clear() {
    console.log("Clear Called");
    changePage();
    document.getElementById("searchBox").value = "";
}

function drawBox(context, vertices) {
    context.beginPath();
    context.moveTo(vertices[0].x, vertices[0].y);
    context.lineTo(vertices[1].x, vertices[1].y);
    context.lineTo(vertices[2].x, vertices[2].y);
    context.lineTo(vertices[3].x, vertices[3].y);
    context.lineTo(vertices[0].x, vertices[0].y);
    context.stroke();

    context.fillStyle = "#FFFF00";
    context.globalAlpha = 0.2
    context.fillRect(vertices[0].x, vertices[0].y, vertices[1].x - vertices[0].x, vertices[3].y - vertices[0].y);
    context.globalAlpha = 1.0
}

function search(context, searchString) {
    page_no = `alf-${document.getElementById("pageNo").value}`
    data = json_data[page_no]
    for (let word of data.textAnnotations) {
        if (word.description == searchString) {
            console.log(word);
            drawBox(context, word.boundingPoly.vertices);
        }
    }
}

function searchAndDisplay() {
    context = changePage();
    search(context, document.getElementById("searchBox").value)
}

window.onload = function () {
    changePage()

    let typingTimer;                //timer identifier
    let doneTypingInterval = 500;  //time in ms (5 seconds)
    let searchInput = document.getElementById('searchBox');
    let clearButton = document.getElementById('clearButton');
    let pageInput = document.getElementById('pageNo')

    //on keyup, start the countdown
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (searchInput.value) {
            typingTimer = setTimeout(searchAndDisplay, doneTypingInterval);
        }
    });

    pageInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (pageInput.value) {
            typingTimer = setTimeout(changePage, 250);
        }
    });

    clearButton.addEventListener('click', clear);
}