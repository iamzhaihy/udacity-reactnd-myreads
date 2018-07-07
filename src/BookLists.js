import React from 'react';
import BookShelf from './BookShelf';

class BookLists extends React.Component {
    render() {
        const { books, onMoveBook } = this.props;
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
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default BookLists;