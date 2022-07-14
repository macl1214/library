// Library storage
let myLibrary = [];

// Book Object Definition
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  this.read = false;
}

// Init Function - Add sample books
function initLibrary() {

  addBookToLibrary(new Book('Animal Farm', 'George Orwell', 112));
  addBookToLibrary(new Book('Lord of the Flies', 'William Golding', 224));
  addBookToLibrary(new Book('The Metamorphosis', 'Franz Kafka', 74));
}

// Library Helper Functions
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (let book in myLibrary) {
    console.log(book);
  }
}

// Display Functions
function displayBookInGrid(book) {

}

// Element variables
const content = document.querySelector('.content');
const addBtn = document.querySelector('.add-book-btn');
const bookFormCont = document.querySelector('.add-book-container');
const closeBookForm = document.querySelector('.add-book-form .close-btn');

// Event listeners
addBtn.addEventListener('click', function() {
  bookFormCont.classList.add('show');
});

closeBookForm.addEventListener('click', function() {
  bookFormCont.classList.remove('show');
})