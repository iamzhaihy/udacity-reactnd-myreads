import React from 'react';

class Book extends React.Component {
    render() {
        const { bookInfo, onMove } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookInfo.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={bookInfo.shelf} onChange={(event) => onMove(bookInfo.id, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookInfo.title}</div>
                <div className="book-authors">{bookInfo.authors}</div>
            </div>
        )
    }
}

export default Book;