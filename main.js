// Do your work here...

const books_keyLocalStorage = "booksList";
const RENDER_BOOKS_EVENT = "render-books";
let books = [];

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

  for (const book of books) {
    const bookElement = createBookElement(book);
    if (!book.isComplete) {
      incompleteBookList.append(bookElement);
    } else {
      completeBookList.append(bookElement);
    }
  }
});

function generateId() {
  return +new Date();
}

const addNewBook = () => {
  const id = generateId();
  const title = newBookFormTitle.value;
  const author = newBookFormAuthor.value;
  const year = newBookFormYear.value;
  const isComplete = newBookFormIsComplete.checked;

  const userInput = {
    id, title, author, year, isComplete
  };

  books.push(userInput);
};

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
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
}

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
  finished_buttonElement.innerText = book.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca";

  const delete_buttonElement = document.createElement("button");
  delete_buttonElement.setAttribute("data-testid", "bookItemDeleteButton");
  delete_buttonElement.innerText = "Hapus Buku";

  const edit_buttonElement = document.createElement("button");
  edit_buttonElement.setAttribute("data-testid", "bookItemEditButton");
  edit_buttonElement.innerText = "Edit Buku";

  buttonContainer.append(finished_buttonElement, delete_buttonElement, edit_buttonElement);
  bookItemElement.append(titleElement, authorElement, yearElement, buttonContainer);

}

