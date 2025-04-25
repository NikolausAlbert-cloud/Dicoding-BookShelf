// Do your work here...

const books_keyLocalStorage = "booksList";
const RENDER_BOOKS_EVENT = "render-books";
let books = [];
let searchBooks = [];
let showSearchBooks = false;

// New Book
const bookForm = document.querySelector("#bookForm");
const newBookFormTitle = document.querySelector("#bookFormTitle");
const newBookFormAuthor = document.querySelector("#bookFormAuthor");
const newBookFormYear = document.querySelector("#bookFormYear");
const newBookFormIsComplete = document.querySelector("#bookFormIsComplete");
const newBookFormSubmit = document.querySelector("#bookFormSubmit");

// Search Book
const searchBookTitle = document.querySelector("#searchBookTitle");
const searchBookSubmit = document.querySelector("#searchSubmit"); 
const showAllBooks = document.querySelector("#showAllBooks");

// Incomplete Book List
const incompleteBookList = document.querySelector("#incompleteBookList");

// Complete Book List
const completeBookList = document.querySelector("#completeBookList");

document.addEventListener("DOMContentLoaded", function () {
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addNewBook();
  })

  if (isWebStorageExist()) {
    loadFromStorage();
  }
});

document.addEventListener(RENDER_BOOKS_EVENT, function () {
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  let typeBookList = showSearchBooks ? searchBooks : books;
 
  for (const book of typeBookList) {
    const bookElement = createBookElement(book);
    if (!book.isComplete) {
      incompleteBookList.append(bookElement);
      put_To_OtherBookShelf(bookElement);
      removeBook(bookElement);

    } else {
      completeBookList.append(bookElement);
      put_To_OtherBookShelf(bookElement);
      removeBook(bookElement);
    }
  }
});

document.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTitle = document.querySelector("#searchBookTitle").value.trim();

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase() === searchTitle.toLowerCase();
  });


  if (filteredBooks.length > 0) {
    showSearchBooks = true;
  }
  
  searchBooks = filteredBooks;
  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
});

showAllBooks.addEventListener("click", function () {
  
  showSearchBooks = false;
  searchBookTitle.value = "";
  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
});

const get_nthParentElement = (element, n) => {
  let current = element;
  for (let i = 0; i < n; i++) {
    current = current.parentElement;
  }
  
  return current;
}

function generateId() {
  return +new Date();
}

const addNewBook = () => {
  const id = generateId();
  const title = newBookFormTitle.value.trim();
  const author = newBookFormAuthor.value.trim();
  const year = newBookFormYear.value;
  const isComplete = newBookFormIsComplete.checked;

  if (title !== "" && author !== "" && year !== "") {
    const userInput = {
      id, title, author, year, isComplete
    };
  
    books.unshift(userInput);
    updateLocalStorage(books);
    showSearchBooks = false;

    newBookFormTitle.value = "";
    newBookFormAuthor.value = "";
    newBookFormYear.value = "";
    newBookFormIsComplete.checked = false;
    
    document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
  }
};

const put_To_OtherBookShelf = (bookElement) => {
  const changeBookList = bookElement.querySelector("[data-testid='bookItemIsCompleteButton']");
 
  changeBookList.addEventListener("click", function () {
    const targetParentElement = get_nthParentElement(changeBookList, 2);
    const bookId = targetParentElement.getAttribute("data-bookid");
    const bookIndex = findBookIndex(bookId);
  
    if (bookIndex !== -1) {
      books[bookIndex].isComplete = !books[bookIndex].isComplete;
      updateLocalStorage(books);
    }
  })
}

const removeBook = (bookElement) => {
  const deleteBook = bookElement.querySelector("[data-testid='bookItemDeleteButton']");

  deleteBook.addEventListener("click", function () {
    const bookId = bookElement.getAttribute("data-bookid");
    const bookIndex = findBookIndex(bookId);

    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      updateLocalStorage(books);
    }
  })
}

const isWebStorageExist = () => {
  if (typeof(Storrage) === undefined) {
    alert("Browser does not support web storage");
    return false;
  }
  return true;
}

const loadFromStorage = () => {
  const parsedBooks = JSON.parse(localStorage.getItem(books_keyLocalStorage));

  if (parsedBooks !== null) {
    for (const book of parsedBooks) {
      books.unshift(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
}

const updateLocalStorage = (books) => {
  if (isWebStorageExist()) {
    localStorage.setItem(books_keyLocalStorage, JSON.stringify(books));
    document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
  }
};

const createBookElement = (book) => {
  const bookItemElement = document.createElement("div");
  bookItemElement.setAttribute("data-testid", "bookItem");
  bookItemElement.setAttribute("data-bookid", book.id);

  const titleElement = document.createElement("h3");
  titleElement.setAttribute("data-testid", "bookItemTitle");
  titleElement.innerText = book.title;

  const authorElement = document.createElement("p");
  authorElement.setAttribute("data-testid", "bookItemAuthor");
  authorElement.innerText = `Penulis: ${book.author}`;

  const yearElement = document.createElement("p");
  yearElement.setAttribute("data-testid", "bookItemYear");
  yearElement.innerText = `Tahun ${book.year}`;

  const buttonContainer = document.createElement("div");

  const finished_buttonElement = document.createElement("button");
  finished_buttonElement.setAttribute("data-testid", "bookItemIsCompleteButton");
  finished_buttonElement.innerText = book.isComplete ? "Baca ulang" : "Selesai Dibaca";

  const delete_buttonElement = document.createElement("button");
  delete_buttonElement.setAttribute("data-testid", "bookItemDeleteButton");
  delete_buttonElement.innerText = "Hapus Buku";

  const edit_buttonElement = document.createElement("button");
  edit_buttonElement.setAttribute("data-testid", "bookItemEditButton");
  edit_buttonElement.innerText = "Edit Buku";

  buttonContainer.append(finished_buttonElement, delete_buttonElement, edit_buttonElement);
  bookItemElement.append(titleElement, authorElement, yearElement, buttonContainer);

  return  bookItemElement;
}

const findBookIndex = (bookId) => {
  const targetIndex = books.findIndex(book => book.id == bookId);
  return targetIndex;
}