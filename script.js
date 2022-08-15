const cardContainer = document.querySelector('.cardContainer');
const newButton = document.getElementById('newBtn');
const form = document.querySelector('.newForm');
const bod = document.querySelector('.bodyContent');
const addBookBtn = document.querySelector('.addBook');

let myBooks = [];

function Book(title, author, year, readStatus, pages, seriesStatus) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.readStatus = readStatus;
    this.pages = pages;
    this.seriesStatus = seriesStatus;
}

function addBookToLibrary(bookobj) {
    myBooks.push(bookobj);
    let div = document.createElement('div');
    div.classList.add('bookCard');
    cardContainer.appendChild(div);
    div.innerText = `${bookobj.title}`;
    
}



function showForm() {
    form.classList.toggle('visible');
    bod.classList.toggle('blur');
}

function addBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let year = document.getElementById('year').value;
    let readStatus = document.getElementById('readStatus').value;
    let pages = document.getElementById('pages').value;

    return(new Book(title, author, year, readStatus, pages));
}

newButton.addEventListener('click', showForm);
addBookBtn.addEventListener('click', function () {
    addBookToLibrary(addBook());
    showForm();
});

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 1937, false, "Pretty good book", true);
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 1994, true, "Good Series", true);
const wheelOfTime = new Book("The Wheel of Time", "Robert Jordan", 1990, false, "I dunno", true);








