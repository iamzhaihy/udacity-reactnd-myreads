import React from 'react';

function Book(props) {
    const { bookInfo, onMove } = props;
    const { shelf, title, authors, imageLinks} = bookInfo;
    const cover_link = imageLinks? imageLinks.thumbnail : 'https://imgplaceholder.com/128x193?text=No+Cover+Image';
    const cover_style = { width: 128, height: 193, backgroundImage: `url("${cover_link}")`};

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={cover_style}></div>
                <div className="book-shelf-changer">
                    <select value={shelf ? shelf: 'none'} 
                            onChange={(event) => onMove(bookInfo, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
}

export default Book;