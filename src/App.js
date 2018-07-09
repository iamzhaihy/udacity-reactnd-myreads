import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import BookLists from './BookLists';
import BookSearchBar from './BookSearchBar';
import NotFound from './NotFound';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: {}
        };

        this.onMoveBook = this.onMoveBook.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then((all_books) => {
            const _currentlyReading = all_books.filter(b => b.shelf === 'currentlyReading');
            const _wantToRead = all_books.filter(b => b.shelf === 'wantToRead');
            const _read = all_books.filter(b => b.shelf === 'read');
            this.setState({
                books: {
                    currentlyReading: _currentlyReading,
                    wantToRead: _wantToRead,
                    read: _read
                }
            });
        });
    }

    onMoveBook(book, dest_shelf) {
        let _books = Object.assign({}, this.state.books);
        
        Object.keys(_books).forEach(key => {
            _books[key] = _books[key].filter(b => b.id !== book.id)
        });

        book.shelf = dest_shelf;
        BooksAPI.update(book, dest_shelf);
        dest_shelf !== 'none' && _books[dest_shelf].push(book);

        this.setState({books: _books});
    }

    render() {
        return (
            <div className="app">
                <Switch> 
                    <Route path='/search' render={() => (
                        <BookSearchBar books={this.state.books} onAddBook={this.onMoveBook}/>
                    )}/>
                    <Route exact path='/' render={() => (
                        <BookLists books={this.state.books} onMoveBook={this.onMoveBook} />
                    )}/>
                    <Route component={NotFound}></Route>
                </Switch>
            </div>
        )
    }
}

export default BooksApp;
