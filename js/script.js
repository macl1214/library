/** Variables */

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

// Library storage variables
let myLibrary = [];
let numOfBooks = 0;


/** Class definitions */
// Book class
class Book {
  #title;
  #author;
  #pages;
  #id;
  #read;

  constructor(title, author, pages, id, read = false) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
    this.#id = id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (this.#title === undefined) {
      this.#title = title;
    }
  }

  get author() {
    return this.#author;
  }

  set author(author) {
    if (this.#author === undefined) {
      this.#author = author;
    }
  }

  get pages() {
    return this.#pages;
  }

  set pages(pages) {
    if (this.#pages === undefined && Number.isInteger(pages)) {
      this.#pages = pages;
    }
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    if (Number.isInteger(id)) {
      this.#id = id;
    }
  }

  get read() {
    return this.#read;
  }

  set read(read) {
    this.#read = read;
  }
}

// Library class
class Library {
  #myLibrary;
  #numOfBooks;

  constructor () {
    this.#myLibrary = [];
    this.#numOfBooks = 0;

    this.#addSampleBooks();
  }

  get library() {
    return this.#myLibrary;
  }

  #addSampleBooks() {
    this.addBook(new Book('Animal Farm', 'George Orwell', 112, this.numOfBooks++));
    this.addBook(new Book('Lord of the Flies', 'William Golding', 224, this.numOfBooks++));
    this.addBook(new Book('The Metamorphosis', 'Franz Kafka', 74, this.numOfBooks++));
  }

  addBook(book) {
    if (book !== null) {
      book.id = this.#numOfBooks++;
      
      this.#myLibrary.push(book);

      return book;
    } else {
      throw new Error("Can't add a book that has not been initialized");
    }
  }

  getBookById(id) {
    if (id >= 0 && id < this.#numOfBooks) {
      return this.#myLibrary[id];
    }
  }

  containsBook(title, author) {
    const fTitle = title.toLowerCase();
    const fAuthor = author.toLowerCase();

    for (let book of this.#myLibrary) {
      const curTitle = book.title.toLowerCase();
      const curAuthor = book.author.toLowerCase();

      if (fTitle === curTitle && fAuthor === curAuthor) return true;
    }

    return false;
  }
}

/** Module definitions */
const libraryDisplayController = (() => {
  const _myLibrary = new Library();

  // Element variables
  const _content = document.querySelector('.content');
  const _addBtn = document.querySelector('.add-book-btn');
  const _bookFormCont = document.querySelector('.add-book-container');
  const _bookForm = document.querySelector(".add-book-form");
  const _closeBookForm = document.querySelector('.add-book-form .close-btn');
  const _bookFormSubmitBtn = document.querySelector('.form-submit');
  const _titleInput = document.querySelector('#title');
  const _authorInput = document.querySelector('#author');
  const _pagesInput = document.querySelector('#pages');
  const _readFlag = document.querySelector('#read');
  const _formError = document.querySelector('.form-error');

  const _displayBooks = () => {
    for (let book of _myLibrary.library) {
      _displayBookInGrid(book);
    }
  };

  const _displayBookInGrid = (book) => {
    const bookCard = _createEmptyBookCont();

    _setTitle(bookCard, book.title);
    _setAuthor(bookCard, book.author);
    _setPages(bookCard, book.pages);
    _setId(bookCard, book.id);
    _setRead(bookCard, book.read);
    _content.appendChild(bookCard);
  };

  const _createEmptyBookCont = () => {
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
  };

  const _setTitle = (bookCard, title) => {
    const titleSpan = bookCard.querySelector('.title');
  
    titleSpan.innerText = title;
  };
  
  const _setAuthor = (bookCard, author) => {
    const authorSpan = bookCard.querySelector('.author');
  
    authorSpan.innerText = author;
  };
  
  const _setPages = (bookCard, pages) => {
    const pagesDiv = bookCard.querySelector('.pages');
  
    pagesDiv.innerText = pages;
  };
  
  const _setId = (bookCard, id) => {
    const bookIdDiv = bookCard.querySelector('.book-id');
  
    bookIdDiv.setAttribute('data-id', id);
  };
  
  const _setRead = (bookCard, read) => {
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
  };

  /** Event Listener helper functions */
  const _toggleRead = (e) => {
    const target = e.target;
    
    if(target.classList.contains('read-btn')) {
      const bookCard = target.parentElement;

      const idDiv = bookCard.querySelector('.book-id');
      const bookId = Number.parseInt(idDiv.getAttribute('data-id'));
      
      const book = _myLibrary.getBookById(bookId);
      book.read = !book.read;
    
      _setRead(bookCard, book.read);
    }
  }

  const _clearForm = () => {
    _titleInput.value = '';
    _authorInput.value = '';
    _pagesInput.value = '';
    _readFlag.value = true;
  }

  const _closeForm = () => {
    _bookFormCont.classList.remove('show');
    _clearForm();
  }

  const _keyboardInput = (e) => {
    if (e.key === 'Enter') {
      _submitForm();
    }
    if (e.key === 'Escape') {
      _closeForm();
    }
  };

  const _validPages = (bookForm) => {
    const pagesInput = bookForm.querySelector('#pages');
    
    console.log(pagesInput.value);
  
    const pages = Number.parseInt(pagesInput.value);
    // console.log(Number.isNaN(pages));
    
    if (Number.isNaN(pages)) {
      pagesInput.setCustomValidity('Enter in a valid number');
      return bookForm.reportValidity();
    }
    else if (pages < 1 || pages > 5000) {
      pagesInput.setCustomValidity('There should be at least 1 page and no more than 5000');
      return bookForm.reportValidity();
    }
  
    return true;
  };

  const _submitForm = () => {
    if (_bookForm.reportValidity() && _validPages(bookForm)) {

      const title = _titleInput.value.trim();
      const author = _authorInput.value.trim();
  
      if (_myLibrary.containsBook(title, author)) {
        formError.innerText = '* This book is already in your library!'
  
      } else {
        const pages = _pagesInput.value;
        const hasRead = _readFlag.checked;
  
        const newBook = new Book(title, author, pages, hasRead);
        _myLibrary.addBook(newBook);
        _displayBookInGrid(newBook);
  
        _closeForm();
        _clearForm();
      }
    }
  };

  window.onload = () => {

    _displayBooks();
    /** Event Listener  */

    // Read Button
    _content.addEventListener('click', _toggleRead);
    // Show book form
    _addBtn.addEventListener('click', () => _bookFormCont.classList.add('show'));
    // Close book Form
    _closeBookForm.addEventListener('click', _closeForm);
    _bookFormCont.addEventListener('click', _closeForm);
    _bookForm.addEventListener('click', (e) => e.stopPropagation());
    // Enter and escape key functionality
    _bookForm.addEventListener('keydown', _keyboardInput);
    // Clear custom validation to remove popup message
    _pagesInput.addEventListener('input', () => _pagesInput.setCustomValidity(''));
    // Submit form button
    _bookFormSubmitBtn.addEventListener('click', _submitForm);
  }
})();

// /** Library functions */

// // Book Object Definition
// function Book(title, author, pages, read = false) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;

//   this.id = numOfBooks++;
//   this.read = read;
// }

// // Init Function - Add sample books
// function initLibrary() {
//   addBookToLibrary(new Book('Animal Farm', 'George Orwell', 112));
//   addBookToLibrary(new Book('Lord of the Flies', 'William Golding', 224));
//   addBookToLibrary(new Book('The Metamorphosis', 'Franz Kafka', 74));

//   // displayBooks();
// }

// // Library Helper Functions
// function addBookToLibrary(book) {
//   myLibrary.push(book);

//   displayBookInGrid(book);
// }

// function displayBooks() {
//   for (let book of myLibrary) {
//     displayBookInGrid(book);
//   }
// }

// // Display Functions
// function displayBookInGrid(book) {
//   const bookCard = createEmptyBookCont();

//   setTitle(bookCard, book.title);
//   setAuthor(bookCard, book.author);
//   setPages(bookCard, book.pages);
//   setId(bookCard, book.id);
//   setRead(bookCard, book.read);

//   content.appendChild(bookCard);
// }

// function createEmptyBookCont() {
//   const bookCard = document.createElement('div');
//   const titleBlock = document.createElement('div');
//   const title = document.createElement('span');
//   const authorBlock = document.createElement('div');
//   const author = document.createElement('span');
//   const pages = document.createElement('div');
//   const bookId = document.createElement('div');
//   const readBtn = document.createElement('button');

//   bookCard.classList.add('book-card');
//   titleBlock.classList.add('title-block');
//   title.classList.add('title');
//   authorBlock.classList.add('author-block');
//   author.classList.add('author');
//   pages.classList.add('pages');
//   bookId.classList.add('book-id');
//   bookId.setAttribute('hidden', '');
//   readBtn.classList.add('read-btn');

//   titleBlock.appendChild(title);
//   authorBlock.appendChild(author);

//   bookCard.appendChild(titleBlock);
//   bookCard.appendChild(authorBlock);
//   bookCard.appendChild(pages);
//   bookCard.appendChild(bookId);
//   bookCard.appendChild(readBtn);

//   return bookCard;
// }

// function setTitle(bookCard, title) {
//   const titleSpan = bookCard.querySelector('.title');

//   titleSpan.innerText = title;
// }

// function setAuthor(bookCard, author) {
//   const authorSpan = bookCard.querySelector('.author');

//   authorSpan.innerText = author;
// }

// function setPages(bookCard, pages) {
//   const pagesDiv = bookCard.querySelector('.pages');

//   pagesDiv.innerText = pages;
// }

// function setId(bookCard, id) {
//   const bookIdDiv = bookCard.querySelector('.book-id');

//   bookIdDiv.setAttribute('data-id', id);
// }

// function setRead(bookCard, read) {
//   const bookReadBtn = bookCard.querySelector('.read-btn');

//   if (read) {
//     bookReadBtn.classList.remove('not-read');
//     bookReadBtn.classList.add('has-read');
//     bookReadBtn.innerText = 'Not read';
//   } else {
//     bookReadBtn.classList.remove('has-read');
//     bookReadBtn.classList.add('not-read');
//     bookReadBtn.innerText = 'Read';
//   }
// }

// function bookExists(title, author) {
//   const t1 = title.toLowerCase();
//   const a1 = author.toLowerCase();

//   for (let book of myLibrary) {
//     if (book.title.toLowerCase() === t1 && book.author.toLowerCase() === a1) {
//       return true;
//     }
//   }

//   return false;
// }

// function getBookById(id) {
//   for (let book of myLibrary) {
//     if (book.id === id) {
//       return book;
//     }
//   } 
// }


// /** Event listeners */

// // Read button
// document.addEventListener('click', function(e) {
//   const readBtn = e.target;

//   // Check if read button was clicked
//   if(readBtn.classList.contains('read-btn')) {
    
//     const book = readBtn.parentElement;
//     // console.log(book);

//     toggleRead(book);
//   }
// });

// // Add Book Form
// addBtn.addEventListener('click', function () {
//   bookFormCont.classList.add('show');
// });

// // Close Book Form
// closeBookForm.addEventListener('click', closeForm);

// bookFormCont.addEventListener('click', closeForm);

// bookForm.addEventListener('click', function (e) {
//   e.stopPropagation();
// });

// // Enter key and escape key functionality
// bookForm.addEventListener('keydown', function (e) {
//   if (e.key === 'Enter') {
//     submitForm();
//   }
//   if (e.key === 'Escape') {
//     closeForm();
//   }
// });

// // Clear custom validation to remove popup message
// pagesInput.addEventListener('input', function() {
//   // console.log('pagesInput: input event triggered')
//   pagesInput.setCustomValidity('');
// });

// // Link button to submit form
// bookFormSubmitBtn.addEventListener('click', submitForm);

// function toggleRead(bookCard) {
//   const idDiv = bookCard.querySelector('.book-id');
//   const bookId = Number.parseInt(idDiv.getAttribute('data-id'));
  
//   const book = getBookById(bookId);
//   book.read = !book.read;

//   setRead(bookCard, book.read);
// }

// function closeForm() {
//   bookFormCont.classList.remove('show');
//   clearForm();
// }

// function submitForm() {

//   if (bookForm.reportValidity() && validPages(bookForm)) {

//     const title = titleInput.value.trim();
//     const author = authorInput.value.trim();

//     if (bookExists(title, author)) {
//       formError.innerText = '* This book is already in your library!'

//     } else {
//       const pages = pagesInput.value;
//       const hasRead = readFlag.checked;

//       const newBook = new Book(title, author, pages, hasRead);
//       addBookToLibrary(newBook);

//       closeForm();
//       clearForm();
//     }
//   }
// }

// function clearForm() {
//   titleInput.value = '';
//   authorInput.value = '';
//   pagesInput.value = '';
//   readFlag.checked = true;
// }

// function validPages(bookForm) {
//   const pagesInput = bookForm.querySelector('#pages');
  
//   console.log(pagesInput.value);

//   const pages = Number.parseInt(pagesInput.value);
//   console.log(Number.isNaN(pages));
  
//   if (Number.isNaN(pages)) {
//     pagesInput.setCustomValidity('Enter in a valid number');
//     return bookForm.reportValidity();
//   }
//   else if (pages < 1 || pages > 5000) {
//     pagesInput.setCustomValidity('There should be at least 1 page and no more than 5000');
//     return bookForm.reportValidity();
//   }

//   return true;
// }

// window.onload(initLibrary());


/** TO DO LIST */
// Delete button on book cards