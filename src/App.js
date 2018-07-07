import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookSearchBar from './BookSearchBar';
import BookLists from './BookLists';

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
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <BookSearchBar />
                ) : (
                    <BookLists books={this.state.books} onMoveBook={this.onMoveBook}/>
                )}
            </div>
        )
    }
}

export default BooksApp;
