import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
    render() {
        const {shelfTitle, books} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books && books.map(book => {
                        return <li key={book.id}> <Book bookInfo={book}/> </li>
                    })}
                </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf