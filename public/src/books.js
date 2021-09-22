const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find((book)=> book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  return [getborrowedBooks(books), getReturnedBooks(books)]
}

function getBorrowersForBook(book, accounts) {
  // create a new array that includes the object of accountInfo and returned status
  const result = book.borrows.map(({id, returned})=> {
    const accountInfo = findAccountById(accounts, id)
    return {
      ...accountInfo,
      returned,
    };
  })
  //limit the list to ten borrowers
  return result.slice(0, 10)
}

//Helpersfunction
function getReturnedBooks(books) {
  return books.filter((book)=> book.borrows[0].returned);
}

function getborrowedBooks(books) {
  return borrowedBooks = books.filter((book)=> !book.borrows[0].returned);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

