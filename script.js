// Selecting Elements
const popupOverlay = document.querySelector(".popup-overlay");
const popupBox = document.querySelector(".popup-box");
const addPopupButton = document.getElementById("add-popup-button");
const cancelPopup = document.getElementById("cancel-popup");
const addBookButton = document.getElementById("add-book");

const container = document.querySelector(".container");

const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookDescriptionInput = document.getElementById("book-description-input");

const bookCountElement = document.getElementById("book-count");
const featuredTitle = document.getElementById("featured-title");
const featuredAuthor = document.getElementById("featured-author");
const featuredBox = document.getElementById("featured-book");

let editTarget = null; // used when editing an existing book

// Show Popup
addPopupButton.addEventListener("click", () => {
  resetForm();
  editTarget = null;
  popupOverlay.style.display = "block";
  popupBox.style.display = "block";
  setTimeout(() => {
    popupBox.classList.add("active");
  }, 10);
});

// Hide Popup
cancelPopup.addEventListener("click", (e) => {
  e.preventDefault();
  popupBox.classList.remove("active");
  setTimeout(() => {
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
  }, 300);
});

// Add/Edit Book
addBookButton.addEventListener("click", function (e) {
  e.preventDefault();
  const title = bookTitleInput.value.trim();
  const author = bookAuthorInput.value.trim();
  const desc = bookDescriptionInput.value.trim();

  if (!title || !author || !desc) {
    alert("Please fill out all fields!");
    return;
  }

  if (editTarget) {
    // Edit mode
    editTarget.querySelector("h2").innerText = title;
    editTarget.querySelector("h5").innerText = author;
    editTarget.querySelector("p").innerText = desc;
    editTarget = null;
  } else {
    // Add new book
    const div = document.createElement("div");
    div.classList.add("book-container");
    div.innerHTML = `
      <h2>${title}</h2>
      <h5>${author}</h5>
      <p>${desc}</p>
      <button onclick="editBook(event)">Edit</button>
      <button onclick="deleteBook(event)">Delete</button>
    `;
    container.appendChild(div);
  }

  saveBooks();
  updateBookCount();
  closePopup();
});

// Delete Book
function deleteBook(event) {
  event.target.parentElement.remove();
  saveBooks();
  updateBookCount();
}

// Edit Book
function editBook(event) {
  const book = event.target.parentElement;
  const title = book.querySelector("h2").innerText;
  const author = book.querySelector("h5").innerText;
  const desc = book.querySelector("p").innerText;

  bookTitleInput.value = title;
  bookAuthorInput.value = author;
  bookDescriptionInput.value = desc;

  editTarget = book;
  popupOverlay.style.display = "block";
  popupBox.style.display = "block";
  setTimeout(() => popupBox.classList.add("active"), 10);
}

// Save to LocalStorage
function saveBooks() {
  localStorage.setItem("books", container.innerHTML);
}

// Load from LocalStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) {
    container.innerHTML = savedBooks;
  }
  updateBookCount();
});

// Update Book Count & Featured Book
function updateBookCount() {
  const books = document.querySelectorAll(".book-container");
  bookCountElement.innerText = `You have ${books.length} book(s).`;

  if (books.length > 0) {
    const firstBook = books[0];
    featuredBox.style.display = "block";
    featuredTitle.innerText = firstBook.querySelector("h2").innerText;
    featuredAuthor.innerText = firstBook.querySelector("h5").innerText;
  } else {
    featuredBox.style.display = "none";
  }
}

// Reset Form Fields
function resetForm() {
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
  bookDescriptionInput.value = "";
}

// Close Popup
function closePopup() {
  popupBox.classList.remove("active");
  setTimeout(() => {
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
    resetForm();
  }, 300);
}
