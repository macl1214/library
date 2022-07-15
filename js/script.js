// Library storage
let myLibrary = [];
let numOfBooks = 0;

// Book Object Definition
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  this.id = numOfBooks++;
  this.read = read;
}

// Init Function - Add sample books
function initLibrary() {
  addBookToLibrary(new Book('Animal Farm', 'George Orwell', 112));
  addBookToLibrary(new Book('Lord of the Flies', 'William Golding', 224));
  addBookToLibrary(new Book('The Metamorphosis', 'Franz Kafka', 74));

  // displayBooks();
}

// Library Helper Functions
function addBookToLibrary(book) {
  myLibrary.push(book);

  displayBookInGrid(book);
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
  setRead(bookCard, book.read);

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
  readBtn.classList.add('read-btn');

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

function setRead(bookCard, read) {
  const bookReadBtn = bookCard.querySelector('.read-btn');

  if (read) {
    bookReadBtn.classList.remove('not-read');
    bookReadBtn.classList.add('has-read');
    bookReadBtn.innerText = 'Not read';
  } else {
    bookReadBtn.classList.remove('has-read');
    bookReadBtn.classList.add('not-read');
    bookReadBtn.innerText = 'Read';
  }
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
const pagesInput = document.querySelector('#pages');
const readFlag = document.querySelector('#read');
const formError = document.querySelector('.form-error');

/** Event listeners */

// Read button
document.addEventListener('click', function(e) {
  const readBtn = e.target;

  // Check if read button was clicked
  if(readBtn.classList.contains('read-btn')) {
    
    const book = readBtn.parentElement;
    // console.log(book);

    toggleRead(book);
  }
});

// Add Book Form
addBtn.addEventListener('click', function () {
  bookFormCont.classList.add('show');
});

// Close Book Form
closeBookForm.addEventListener('click', closeForm);

bookFormCont.addEventListener('click', closeForm);

bookForm.addEventListener('click', function (e) {
  e.stopPropagation();
});

bookForm.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    submitForm();
  }
  if (e.key === 'Escape') {
    closeForm();
  }
})

bookFormSubmitBtn.addEventListener('click', submitForm);

window.onload(initLibrary());

function toggleRead(bookCard) {
  const idDiv = bookCard.querySelector('.book-id');
  const bookId = Number.parseInt(idDiv.getAttribute('data-id'));
  
  const book = getBookById(bookId);
  book.read = !book.read;

  setRead(bookCard, book.read);
}

function closeForm() {
  bookFormCont.classList.remove('show');
}

function submitForm() {

  if (bookForm.reportValidity()) {

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (bookExists(title, author)) {
      formError.innerText = '* This book is already in your library!'

    } else {
      const pages = pagesInput.value;
      const hasRead = readFlag.checked;

      const newBook = new Book(title, author, pages, hasRead);
      addBookToLibrary(newBook);

      closeForm();
      clearForm();
    }
  }
}

function clearForm() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readFlag.checked = true;
}

function bookExists(title, author) {
  const t1 = title.toLowerCase();
  const a1 = author.toLowerCase();

  for (let book of myLibrary) {
    if (book.title.toLowerCase() === t1 && book.author.toLowerCase() === a1) {
      return true;
    }
  }

  return false;
}

function getBookById(id) {
  for (let book of myLibrary) {
    if (book.id === id) {
      return book;
    }
  } 
}