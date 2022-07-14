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

// Helper Functions
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