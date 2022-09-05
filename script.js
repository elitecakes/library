const cardContainer = document.querySelector('.cardContainer');
const newButton = document.getElementById('newBtn');
const delButton = document.getElementById('deleteBtn');
const editButton = document.getElementById('editBtn');
const form = document.querySelector('.newForm');
const bod = document.querySelector('.bodyContent');
const addBookBtn = document.querySelector('.addBook');
const bookCard = document.querySelector('.bookCard');

let myBooks = [];

function Book(title, author, year, readStatus, info, seriesStatus) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.readStatus = readStatus;
    this.info = info;
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
        /*removeBookFromLibrary(currDiv);
        refreshID();*/
        console.log("currDiv: \n");
        console.log(currDiv);
        removeConfirmation(currDiv);
        
    });

    //make the card clickable for more info
    infoBtn.addEventListener('click', function () {
        showBookInfo(currDiv);
    });

    //make info div card associated with this bookObj
    createInfoDiv(bookobj);
}

function removeBookFromLibrary (bookForDeletion) {
    //Are you sure you want to delete this book message first
    let bookID = bookForDeletion.getAttribute('id');
    //remove from myBooks Array
    myBooks.splice(bookID, 1);

    //remove book from cardContainer and infoDiv from body 
    let allBookDivs = document.querySelectorAll(`[id="${bookID}"]`);
    allBookDivs.forEach((item) => {
        item.remove();
    });
}

/*function addSelectorsToBooks() {
    let allBooks = document.querySelectorAll('.bookCard');
    allBooks.forEach((item) => {
        let checkBox = document.createElement('input');
        checkBox.setAttribute("type", "checkbox");
        item.appendChild(checkBox);
    });

}*/
function confirmRemoveBookFromLibrary (currDiv) {
    removeBookFromLibrary(currDiv);
    refreshID();
}
function removeConfirmation (currDiv) {
    const removeContainer = document.createElement('div');
    removeContainer.classList.add('removeContainer');
    bod.appendChild(removeContainer);

    const removeText = document.createElement('div');
    removeText.innerText = `Are you sure you want to remove ${currDiv.firstChild.innerText} from your library?`;
    removeContainer.appendChild(removeText);

    const removeBtnYes = document.createElement('div');
    removeBtnYes.innerText = "Yep";
    removeBtnYes.addEventListener('click', function () {
        confirmRemoveBookFromLibrary(currDiv);
        bod.removeChild(removeContainer);
    })
    removeContainer.appendChild(removeBtnYes);

    const removeBtnNo = document.createElement('div');
    removeBtnNo.innerText = "Nope";
    removeBtnNo.addEventListener('click', function () {
        bod.removeChild(removeContainer);
    })
    removeContainer.appendChild(removeBtnNo);

}

function showBookInfo (thisInfoDiv) {
    let ref = thisInfoDiv.getAttribute('id');
    let requestedInfoDiv = document.querySelector(`.mockInfo[id="${ref}"]`);
    requestedInfoDiv.classList.toggle('not-visible');
}

function createInfoDiv (bookobj) {
    let infoDiv = document.createElement('div');
    infoDiv.innerText = `${bookobj.title}, ${bookobj.author},
    ${bookobj.year}, ${bookobj.info}`;
    infoDiv.classList.add('mockInfo');
    infoDiv.classList.toggle('not-visible');
    infoDiv.setAttribute('id', myBooks.indexOf(bookobj));

    bod.appendChild(infoDiv);

    console.log(myBooks.indexOf(bookobj));
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
    let allInfo = document.querySelectorAll('.mockInfo');
    let j = 0;
    allInfo.forEach((item) => {
        item.setAttribute('id', j);
        j++;
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
    let info = document.getElementById('info').value;

    
    if (title === "" || author === "" ||
    year === "" || isNaN(year)) {
        return 1;
    }

    return(new Book(title, author, year, readStatus, info));
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
        showForm();
    }

    showForm();
});

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 1937, false, "Pretty good book", true);
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 1994, true, "Good Series", true);
const wheelOfTime = new Book("The Wheel of Time", "Robert Jordan", 1990, false, "I dunno", true);

//click off form to hide it again TODO
//confirmation box to remove book from library TODO
//show warning explaining why something can't be added "enter a number etc." TODO
//clean up information panel TODO
//add edit functionality TODO





