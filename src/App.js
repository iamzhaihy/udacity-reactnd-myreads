import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom'
import BookLists from './BookLists';
import BookSearchBar from './BookSearchBar';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

        this.onAddBook = this.onAddBook.bind(this);
        this.onMoveBook = this.onMoveBook.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then((all_books) => {
            this.setState({books: all_books});
        });
    }

    onMoveBook(book, dest_shelf) {
        let _books = this.state.books.slice();
        _books.forEach(b => {
            if (b.id === book.id) {
                b.shelf = dest_shelf;
                BooksAPI.update(b, dest_shelf);
            }
        });

        this.setState({books: _books});
    }

    onAddBook(book, dest_shelf) {
        let _books = this.state.books.slice();
        book.shelf = dest_shelf;
        _books.push(book);

        this.setState({books: _books});
        BooksAPI.update(book, dest_shelf);
    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <BookSearchBar onAddBook={this.onAddBook}/>
                )}/>
                <Route exact path='/' render={() => (
                    <BookLists books={this.state.books} onMoveBook={this.onMoveBook} />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
