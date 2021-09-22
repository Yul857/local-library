function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  let found = accounts.sort((accountOne, accountTwo)=> 
  accountOne.name.last.toLowerCase() > accountTwo.name.last.toLowerCase() ? 1 : -1)
  return found
}

function getTotalNumberOfBorrows(account, books) {
  let accumulator = 0;
  return books.reduce((acc, book)=> {
    let isBorrowed = 0;
    //calculate how many times the book is boorrowed by the account
    book.borrows.forEach(element => {
      if (element.id === account.id){
        isBorrowed += 1
      }
    });
    acc += isBorrowed;
    return acc
  }, accumulator)
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];

  //create a list of books that the acoount borrowed
  for (let book of books){
    if (book.borrows.find(borrower=> borrower.id === account.id && !borrower.returned)){
      booksPossessed.push(book)
    }
  }
  //return the bookList with the author embedded
  booksPossessed.forEach((book) => {
    book['author'] = authors.find(author => author.id === book.authorId);
  })
  return booksPossessed;  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
