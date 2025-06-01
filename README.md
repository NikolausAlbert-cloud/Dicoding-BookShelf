# Bookshelf App: Your Virtual Library Companion

#### Video Demo: https://youtu.be/3HYlZFOEQXw

#### Description:

The Bookshelf App offers a practical digital solution for avid readers who struggle to manage their physical book collections and remember the reading status of each title. This application effectively replaces a traditional bookshelf with a virtual one, providing a centralized and organized space to track your reading journey. It empowers users with robust **Create, Read, Update, and Delete (CRUD)** functionalities, allowing for seamless book transfers between "Finished" and "Not Yet Finished" shelves, and ensuring **persistent data storage** so your library is always just as you left it.

---

## Features

### 1. Comprehensive CRUD Operations
The app provides full control over your book data, enabling you to:
* **Create:** Easily add new books with their title, author, and year of release to either the "Finished" or "Not Yet Finished" shelf.
* **Read:** Quickly search for any book by title across both shelves.
* **Update:** Modify existing book details (title, author, year of release) if information needs correction.
* **Delete:** Remove books from your collection when they are no longer relevant, with a confirmation prompt to prevent accidental loss.

### 2. Dynamic Shelf Management
Effortlessly move books between your reading statuses:
* **"Finish Reading" Button:** Transfer books from the "Not Yet Finished" shelf to the "Finished" shelf once completed.
* **"Read Again" Button:** Move books from the "Finished" shelf back to the "Not Yet Finished" shelf if you decide to revisit them.

### 3. Persistent Data Storage
Your library remains intact across sessions:
* Books added to the app are saved in **web storage** (local storage).
* This ensures that your data remains even if you refresh your browser or close the application, as long as your browser's local storage/cookies are not cleared.

### 4. Responsive User Interface
The app is designed for optimal viewing on various devices:
* It is **screen-responsive**, providing a clear and readable view whether accessed on a desktop, laptop, or mobile device.

---

## How to Use

### Adding a New Book
1.  Fill in the **Title**, **Author**, and **Release Year** fields.
2.  Check the "Finished Reading" checkbox if you've already completed the book; otherwise, leave it unchecked.
3.  Click the **"Put Book to Shelf"** button to save the book to the appropriate shelf.

### Moving Books Between Shelves
* **From "Not Yet Finished" to "Finished":** Click the **"Finish Reading"** button on the book card.
* **From "Finished" to "Not Yet Finished":** Click the **"Read Again"** button on the book card.

### Editing Book Information
1.  Click the **"Edit Book"** button on the book card you wish to modify.
2.  The book's current information will populate the input fields at the top of the page.
3.  Update the necessary details.
4.  Click the **"Put Book to Shelf"** button (which now functions as an update) to save the changes.

### Searching for a Book
1.  Type the book's title into the **"Search Book"** field.
2.  The app will display matching books.
3.  To view all books again, click the **"Display All Books"** button.

### Deleting a Book
1.  Click the **"Delete Book"** button on the book card you want to remove.
2.  A confirmation dialog will appear. Confirm to permanently delete the book, as this action cannot be undone.

---

## Technologies Used

* **HTML**: For the structure and content of the web pages.
* **CSS**: For styling the application's user interface and ensuring responsiveness.
* **JavaScript (JS)**: For implementing all core functionalities, including DOM manipulation, data handling, and user interaction.
* **Git**: For version control.
* **GitHub**: For project hosting and collaboration.
* **VS Code**: The primary integrated development environment used for this project.

---

## Main Functionality in JavaScript

The core interactivity and logic of the Bookshelf App are driven by JavaScript, primarily through:
* **Manipulation of the DOM (Document Object Model)** in response to user events within the UI. This includes dynamically adding, removing, and updating book elements on the shelves.
* **Event Handling**: Listening for user actions like clicks on buttons and input changes to trigger specific functions.
* **Local Storage API**: Managing the persistence of book data by saving and retrieving it from the browser's local storage.

---