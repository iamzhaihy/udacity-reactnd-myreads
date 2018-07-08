import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'

function BookLists(props) {
    const { books, onMoveBook } = props;
    const currentlyReading = books.filter(b => b.shelf === 'currentlyReading');
    const wantToRead = books.filter(b => b.shelf === 'wantToRead');
    const read = books.filter(b => b.shelf === 'read');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf shelfTitle="Currently Reading" books={currentlyReading} onMoveBook={onMoveBook}/>
                    <BookShelf shelfTitle="Want to Read" books={wantToRead} onMoveBook={onMoveBook}/>
                    <BookShelf shelfTitle="Read" books={read} onMoveBook={onMoveBook}/>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

export default BookLists;