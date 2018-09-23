import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import BooksListDetail from './BooksListDetail';
import * as BooksAPI from '../BooksAPI';


class BooksList extends Component {
  // We have 3 states , currently reading, books we want to read and read books.
  // Variable are declared as list since we would be having more than more than  1 book in each shelves.
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };
 // This is part of the React Life cycle component method. This was called when the component is being created
 // and inserted in to the DOM.
    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            const matchCR = new RegExp(escapeRegExp('currentlyReading'));
            let currentlyReading = books ? books.filter(book => matchCR.test(book.shelf)) : null;

            const matchWR = new RegExp(escapeRegExp('wantToRead'));
            let wantToRead = books ? books.filter(book => matchWR.test(book.shelf)) : null;

            const matchR = new RegExp(escapeRegExp('read'));
            let read = books ? books.filter(book => matchR.test(book.shelf)) : null;

            this.setState({ currentlyReading, wantToRead, read });
        });
    }

    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    renderShelf(books, title) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>
                            <BooksListDetail
                                key={book.id}
                                book={book}
                                handleBookShelf={this.handleBookShelf.bind(this)}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.renderShelf(currentlyReading, 'Currently Reading')}
                        {this.renderShelf(wantToRead, 'Want to Read')}
                        {this.renderShelf(read, 'Read')}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >
                        Add a book
                    </Link>
                </div>
            </div>
        );
  }
}

export default BooksList;
