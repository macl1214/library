// Library storage
let myLibrary = [];
let numOfBooks = 0;

// Book Object Definition
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  
  this.id = numOfBooks++;
  this.read = false;
}

// Init Function - Add sample books
function initLibrary() {
  addBookToLibrary(new Book('Animal Farm', 'George Orwell', 112));
  addBookToLibrary(new Book('Lord of the Flies', 'William Golding', 224));
  addBookToLibrary(new Book('The Metamorphosis', 'Franz Kafka', 74));
  
  displayBooks();
}

// Library Helper Functions
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (let book of myLibrary) {
    displayBookInGrid(book);
  }
}

// Display Functions
function displayBookInGrid(book) {
  const bookCard = createEmptyBookCont();

  setTitle(bookCard, book.title);
  setAuthor(bookCard, book.author);
  setPages(bookCard, book.pages);
  setId(bookCard, book.id);

  content.appendChild(bookCard);
}

function createEmptyBookCont() {
  const bookCard = document.createElement('div');
  const titleBlock = document.createElement('div');
  const title = document.createElement('span');
  const authorBlock = document.createElement('div');
  const author = document.createElement('span');
  const pages = document.createElement('div');
  const bookId = document.createElement('div');
  const readBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  titleBlock.classList.add('title-block');
  title.classList.add('title');
  authorBlock.classList.add('author-block');
  author.classList.add('author');
  pages.classList.add('pages');
  bookId.classList.add('book-id');
  bookId.setAttribute('hidden', '');
  readBtn.classList.add('read');

  titleBlock.appendChild(title);
  authorBlock.appendChild(author);

  bookCard.appendChild(titleBlock);
  bookCard.appendChild(authorBlock);
  bookCard.appendChild(pages);
  bookCard.appendChild(bookId);
  bookCard.appendChild(readBtn);

  return bookCard;
}

function setTitle(bookCard, title) {
  const titleSpan = bookCard.querySelector('.title');

  titleSpan.innerText = title;
}

function setAuthor(bookCard, author) {
  const authorSpan = bookCard.querySelector('.author');

  authorSpan.innerText = author;
}

function setPages(bookCard, pages) {
  const pagesDiv = bookCard.querySelector('.pages');
  
  pagesDiv.innerText = pages;
}

function setId(bookCard, id) {
  const bookIdDiv = bookCard.querySelector('.book-id');

  bookIdDiv.setAttribute('data-id', id);
}

// Element variables
const content = document.querySelector('.content');
const addBtn = document.querySelector('.add-book-btn');
const bookFormCont = document.querySelector('.add-book-container');
const bookForm = document.querySelector(".add-book-form");
const closeBookForm = document.querySelector('.add-book-form .close-btn');
const bookFormSubmitBtn = document.querySelector('.form-submit');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');


/** Event listeners */

// Add Book Form
addBtn.addEventListener('click', function() {
  bookFormCont.classList.add('show');
});

// Close Book Form
closeBookForm.addEventListener('click', function() {
  bookFormCont.classList.remove('show');
});

bookFormCont.addEventListener('click', function() {
  bookFormCont.classList.remove('show');
});

bookForm.addEventListener('click', function(e) {
  e.stopPropagation();
});

bookForm.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    submitForm();
  }
})

bookFormSubmitBtn.addEventListener('click', submitForm);

window.onload(initLibrary());

function submitForm() {
  
  if (bookForm.reportValidity()) {
    
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    
    if (bookExists(title, author)) {
      titleInput.setCustomValidity('This book is already in your library!');
      bookForm.reportValidity();
    } else {
      
      console.log(`${title} is a valid entry`);
    }

  }
}

function bookExists(title, author) {
  for (let book of myLibrary) {
    if (book.title.toLowerCase() === title.toLowerCase()) {
      return true;
    }
  }

  return false;
}