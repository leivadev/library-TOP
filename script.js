'use strict';

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`);
    }
    this.toggleRead = function () {
        this.read = !this.read;
    }
    this.deleteBook = function () {
        myLibrary.splice(myLibrary.indexOf(this), 1);
    }
}

const myLibrary = [];
const bookList = document.querySelector('.book-list');
const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = document.getElementById('title').value
    const bookAuthor = document.getElementById('author').value
    const bookPages = document.getElementById('pages').value
    const bookRead = document.getElementById('read').checked
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    showLibrary();
    form.reset();
});

bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-button')) {
        const book = myLibrary[Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode)];
        book.toggleRead();
        showLibrary();
    }
    if (e.target.classList.contains('delete-button')) {
        const book = myLibrary[Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode)];
        book.deleteBook();
        showLibrary();
    }
});

function reset() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function showLibrary() {
    myLibrary.length == 0 ? bookList.innerHTML = '<p>No books in the library...</p>' : bookList.innerHTML = '';
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <h3>${book.author}</h3>
            <p>${book.pages} pages</p>
            <button class="read-button">${book.read ? 'Read' : 'Not Read'}</button>
            <button class="delete-button">Delete</button>
        `;
        bookList.appendChild(bookDiv);
    });
}

showLibrary();