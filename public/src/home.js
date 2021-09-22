function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = 0;
  //loops through each book and see if the books is returned of not
  books.forEach(book => {
    //if the book is not returned, then the booksBorrowed plus 1
    if (!book.borrows[0].returned) {
      booksBorrowed += 1
    }
  });
  return booksBorrowed
}

function getMostCommonGenres(books) {
  //use the reduce method to create an object that includes genre and the count
  const genreList = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 1;
    } else {
      acc[book.genre] += 1;
    }
    return acc;
    }, {});
    //create an array that includes the genre and the count of the genre 
  let result = [];
  for (let key in genreList) {
    result.push({
      'name' : key,
      'count' : genreList[key]
    }); 
  }
  //sort the array by count then limit the array to five elements
  return result.sort((genreOne, genreTwo) => genreTwo.count - genreOne.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  //create an array that includes the name of the book and the count of the books get borrowed
  const bookList = books.map(book=> {
    return {
      name: book.title,
      count: getBookBorrowslength(book)
    };
  })
  //sort the bookList in descending order
  const sortedBooklist =  bookList.sort((bookOne, bookTwo)=> bookTwo.count - bookOne.count)
  return sortedBooklist.slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  // create an authorList that constains the author name and the borrows count of the authors' book
  const authorList = authors.map(author=> {
    const AuthorsBook = getBooksByAuthor(books, author)
    let accumulator =  0
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: AuthorsBook.reduce((acc, book)=> {
        return acc + getBookBorrowslength(book)
      }, accumulator)
    }
  })
  //sort the authorlist array
  const sortedAuthor = authorList.sort((authorOne, authorTwo)=> authorTwo.count - authorOne.count);
  return sortedAuthor.slice(0,5)
}

//helpersFunction
function getBookBorrowslength(book){
  return book.borrows.length
}

function getBooksByAuthor(books, author){
  return books.filter((book) => book.authorId === author.id)
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
