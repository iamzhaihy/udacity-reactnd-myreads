import React from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class BookSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            search_results: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const _query = event.target.value;
        this.setState({query: _query});

        // send request if query is not empty
        _query && BooksAPI.search(_query).then(results => {
            let _results = Array.isArray(results) ? results : [];
            this.setState({search_results: _results});
        });

        // empty search results if query is empty
        !_query && this.setState({search_results: []});
    }

    componentWillUnmount() {
        this.setState({
            query: '',
            search_results: []
        });
    }

    render() {
        const { onAddBook } = this.props;
        const search_results = [];
        this.state.search_results.forEach(res => {
            search_results.push((
                <li key={res.id}> <Book bookInfo={res} onMove={onAddBook}/> </li>
            ));
        });
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">   
                        <input type="text" onChange={this.handleChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {search_results}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearchBar;