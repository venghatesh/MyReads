import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksListDetail from './BooksListDetail';
import * as BooksAPI from '../BooksAPI';
/*
    This component handles functionality related to Search Page.

*/


class SearchPage extends Component {
  state = {
      books: [], // List of books
      query: '' // Search String
  };

handleUpdateQuery(query) {


this.setState({ query: query.trim()});
    if (query.length > 0) {
      BooksAPI.search(query, 20).then((searchedBooks) => {
        const displayBooks = searchedBooks && !searchedBooks.hasOwnProperty("error") ? searchedBooks : [];
        BooksAPI.getAll().then((books) => {
          for (const displayBook of displayBooks) {

            const shelfBook = books.find(book => book.id === displayBook.id)
            if (shelfBook){
              displayBook.shelf = shelfBook.shelf;

            }else{
              // Not belonging to any shelf.
              displayBook.shelf = "none";

            }

        }
        this.setState({ books:displayBooks });
      })
      })

    }
}

  handleBookShelf(book, shelf) {

    BooksAPI.update(book, shelf)
        .then(() => shelf !== 'none' ? alert(`${book.title} is successfully added to your shelf!`) : null)
        .catch(() => alert('Oops !!! Something went wrong! Please try again!'));
    book.shelf = shelf
    this.setState({});

  }

  renderSearchResults() {
      const { books, query } = this.state;

      if (query) {
          return books.error ?
              <div>No results found</div>
              : books.map((book) => {
                  return (
                      <BooksListDetail
                          key={book.id}
                          book={book}
                          handleBookShelf={this.handleBookShelf.bind(this)}
                      />
                  );
              });
      }
  }


    render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to='/'
              className='close-search'
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={e => this.handleUpdateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {this.renderSearchResults()}
            </ol>
          </div>
        </div>
      );
  }
}

export default SearchPage;
