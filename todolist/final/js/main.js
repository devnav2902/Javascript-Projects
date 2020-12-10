const iconPlus = document.querySelector('.icon-plus');
const colorItems = document.querySelectorAll('.item-color');
const colorList = document.querySelector('.color-list');
const noteList = document.querySelector('.note-list');
const noteItem = document.querySelector('.note-box');
const searchBar = document.querySelector('.search-bar');
const search = document.getElementById('search');
// search
search.addEventListener('input', handleSearch);
function handleSearch(e) {
    const allNoteItems = document.querySelectorAll('.note-box');

    const value = e.target.value.toLowerCase();

    allNoteItems.forEach((element) => {
        const getText = element.firstElementChild.innerText.toLowerCase();

        if (getText.indexOf(value) !== -1) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}
// toggle button to show/hide color pattern
iconPlus.addEventListener('click', handleColorList);

function handleColorList() {
    colorList.classList.toggle('active');
}
// when click to color item => show box to write with same color item
colorList.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('item-color')) {
        const colorValue = element.dataset.color; // get value color
        createBoxToWrite(colorValue, 'write here 🙌'); // create box to write
    }
});

// create box same color with color you choose
function createBoxToWrite(colorValue, text) {
    iconPlus.removeEventListener('click', handleColorList);
    search.removeEventListener('input', handleSearch);
    search.value = '';
    colorList.classList.remove('active');
    searchBar.classList.remove('active');
    showAllBox();
    // iconPlus.removeEventListener('click', handleColorList);
    // Note: To remove event handlers, the function specified with the addEventListener() method must be an external function, like in the example above (myFunction).
    // Anonymous functions, like "element.removeEventListener("event", function(){ myScript });" will not work.

    const newElement = document.createElement('div');
    newElement.className = 'note-box shadowBox';
    newElement.style.backgroundColor = colorValue;

    newElement.innerHTML = `<div class="content">
            <textarea
                onClick="this.select();"
                class="text-form-input"
                name=""
                id=""
                cols="30"
                rows="10"
            >${text}</textarea>
            </div>
            <footer
                class="note-footer note-it"
            >
                <div class="text">Note it!</div>
                <div>
                    <i class="icon note-button fas fa-arrow-right"></i>
                </div>
            </footer>`;

    newElement.addEventListener('click', function (e) {
        getValueFormAndCreateNote(e, colorValue);
    });

    noteList.insertBefore(newElement, noteList.childNodes[0]);
}

// get text form input
function getValueFormAndCreateNote(e, colorValue) {
    const parent = e.currentTarget;
    const target = e.target;

    const text = parent.querySelector('.text-form-input').value;
    if (target.classList.contains('note-button')) {
        iconPlus.addEventListener('click', handleColorList);
        search.addEventListener('input', handleSearch);
        colorList.classList.add('active');
        search.value = '';
        searchBar.classList.add('active');

        noteList.insertAdjacentHTML(
            'afterbegin',
            `
                <div class="note-box" data-color=${colorValue} style="background-color:${colorValue}">
                <div class="content">
                    ${text}
                </div>
                <footer class="note-footer">
                    <div class="date">${getDate()}</div>
                    <div class="icons">
                        <i class="icon fas fa-trash"></i>
                        <i class="icon fas fa-pencil-alt"></i>
                    </div>
                </footer>
                </div> 
                `
        );
        parent.remove();
    }
}

// handle click button [click,remove]
noteList.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('fa-pencil-alt')) {
        const footer = target.parentElement.parentElement;
        const parentDiv = footer.parentElement;
        const color = parentDiv.dataset.color;
        const text = parentDiv.firstElementChild.innerText;

        createBoxToWrite(color, text);
        parentDiv.remove();
    }
    if (target.classList.contains('fa-trash')) {
        const footer = target.parentElement.parentElement;
        const parentDiv = footer.parentElement;
        parentDiv.remove();
    }
});

// gat value date show when click create note
function getDate() {
    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    const date = new Date().toLocaleDateString('en-US', options);
    return date;
}

function showAllBox() {
    const allNoteItems = document.querySelectorAll('.note-box');
    allNoteItems.forEach((element) => {
        element.style.display = 'flex';
    });
}
