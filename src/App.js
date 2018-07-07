import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearchBar from './BookSearchBar';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showSearchPage: false
        };

        this.onMoveBook = this.onMoveBook.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then((all_books) => {
            this.setState({books: all_books});
        });
    }

    onMoveBook(book_id, dest_shelf) {
        let _books = this.state.books.slice();
        _books.forEach(b => {
            if (b.id === book_id) {
                b.shelf = dest_shelf;
            }
        });

        this.setState({books: _books});
    }

    render() {
        const { books } = this.state;
        const currentlyReading = books.filter(b => b.shelf === 'currentlyReading');
        const wantToRead = books.filter(b => b.shelf === 'wantToRead');
        const read = books.filter(b => b.shelf === 'read');
        
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                <BookSearchBar />
                ) : (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf shelfTitle="Currently Reading" books={currentlyReading} onMoveBook={this.onMoveBook}/>
                            <BookShelf shelfTitle="Want to Read" books={wantToRead} onMoveBook={this.onMoveBook}/>
                            <BookShelf shelfTitle="Read" books={read} onMoveBook={this.onMoveBook}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default BooksApp;
