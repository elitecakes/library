const cardContainer = document.querySelector('.cardContainer');
const newButton = document.getElementById('newBtn');
const delButton = document.getElementById('deleteBtn');
const editButton = document.getElementById('editBtn');
const form = document.querySelector('.newForm');
const bod = document.querySelector('.bodyContent');
const addBookBtn = document.querySelector('.addBook');
const bookCard = document.querySelector('.bookCard');

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

    if (bookobj === 1) {
        return 1;
    }

    myBooks.push(bookobj);
    let div = document.createElement('div');
    div.classList.add('bookCard'); 
    
    cardContainer.appendChild(div);

    div.setAttribute("id", cardContainer.childElementCount - 1);
    let currDiv = document.querySelector('.cardContainer').lastChild;


    //Making book title appear in div for easier css alignment
    let textDiv = document.createElement("div");
    textDiv.classList.add('.textCont')
    textDiv.innerText = `${bookobj.title}`;
    currDiv.appendChild(textDiv);
    

    // Create a button that lives inside this creaated div
    let readBtn = document.createElement("button");
    readBtn.classList.add('cardBtn');
    //if checkbox ticked, toggle read-unread
    readBtn.classList.add('readBtn');
    if (bookobj.readStatus === true) {
        readBtn.classList.toggle('read-unread');
    }
    
    console.log(bookobj);
    readBtn.innerText = "Read";
    currDiv.appendChild(readBtn);


    let removeBtn = document.createElement("button");
    removeBtn.classList.add('cardBtn', 'removeBtn');
    removeBtn.innerText = "Remove";
    currDiv.appendChild(removeBtn);

    let infoBtn = document.createElement("button");
    infoBtn.classList.add('cardBtn')
    infoBtn.innerText = "Information";
    currDiv.appendChild(infoBtn);

    //add event listeners so these buttons do thier inteded functions
    //read button
    readBtn.addEventListener('click', function () {
        readStatus(currDiv);
    });

    //remove button
    removeBtn.addEventListener('click', function () {
        removeBookFromLibrary(currDiv);
        refreshID();
    });

    //make the card clickable for more info
    infoBtn.addEventListener('click', function () {
        showBookInfo(currDiv);
    });
}

function removeBookFromLibrary (bookForDeletion) {
    //Are you sure you want to delete this book message first
    let bookID = bookForDeletion.getAttribute('id');
    //remove from myBooks Array
    myBooks.splice(bookID, 1);
    //remove from cardContainter 
    bookForDeletion.remove();
}

/*function addSelectorsToBooks() {
    let allBooks = document.querySelectorAll('.bookCard');
    allBooks.forEach((item) => {
        let checkBox = document.createElement('input');
        checkBox.setAttribute("type", "checkbox");
        item.appendChild(checkBox);
    });

}*/

function showBookInfo (thisBook) {
    let infoDiv = document.createElement('div');

    console.log(myBooks[thisBook.getAttribute("id")]);
}

function readStatus(bookCard) {
    let currentId = bookCard.getAttribute("id");
    let currDivChildren = document.getElementById(`${currentId}`).children;
    let currReadBtn = currDivChildren.item(1);
    currReadBtn.classList.toggle('read-unread');
    console.log(bookCard);
}

function refreshID () {
    let allBooks = document.querySelectorAll('.bookCard');
    let i = 0;
    allBooks.forEach((item) => {
        item.setAttribute('id', i);
        i++;
});
}

function showForm() {
    form.classList.toggle('visible');
    bod.classList.toggle('blur');
}

function addBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let year = document.getElementById('year').value;
    let readStatus = document.getElementById('readStatus').checked;
    let pages = document.getElementById('pages').value;

    
    if (title === "" || author === "" ||
    year === "" || isNaN(year)) {
        return 1;
    }

    return(new Book(title, author, year, readStatus, pages));
}

newButton.addEventListener('click', showForm);

//Click off form to hide it again
/*document.addEventListener('click', function exitFormByClick(event) {;
    console.log(event.target);
    if (bod.contains(event.target)) {
      //showForm();
    }
  });*/
  

/*delButton.addEventListener('click', addSelectorsToBooks);*/
addBookBtn.addEventListener('click', function e() {
    let x = addBookToLibrary(addBook());
    if (x === 1) {
        e();
    }
    showForm();
});

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 1937, false, "Pretty good book", true);
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 1994, true, "Good Series", true);
const wheelOfTime = new Book("The Wheel of Time", "Robert Jordan", 1990, false, "I dunno", true);








