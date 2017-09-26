import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import DebounceInput from 'react-debounce-input';

class SearchBooks extends Component {
	static propTypes = {
		shelfDictionary : PropTypes.object.isRequired,
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}

	state = {
		searchBooks: []
	}

	/**
	* @description  Search books, and set shelf value if the book.id is
					in one of my book shelfs
	* @param {string} query - The title or author of the book
	*/
	updateQuery = (query) => {
		if (query){
			BooksAPI.search(query, 50).then((result) => {
				if(!result.error) {
    	  			for(var i=0; i < result.length; i++) {
    	  				let match = this.findBook(result[i]);
						if (match.length === 1) {
							result[i].shelf = match[0].shelf;
						} else {
							result[i].shelf = this.props.shelfDictionary.none.shelfStatus;
						}
					}
					this.setState({ searchBooks: result });
    	  		}
    		})
		} else {
			this.setState({ searchBooks: [] });
		}
	}

	findBook(book) {
    	return this.props.books.filter((e) => e.id === book.id);
    }

	/**
	* @description  Update book array in App.js, and the shelf status in the search array.
	* @param {book} query - The book obj to be updated
	* @param {shelfValue} query - The new shelf status of the book
	*/
    updateSelection = (book, shelfValue) => {
  		this.props.onUpdateShelf(book, shelfValue);
  		book.shelf = shelfValue;
  		this.setState({searchBooks: this.state.searchBooks.filter((b) => b.id !== book.id).concat(book)});
	}

	render() {
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/"></Link>
              <div className="search-books-input-wrapper">
                <DebounceInput
          			minLength={1}
          			debounceTimeout={500}
                	type="text"
                	placeholder="Search by title or author"
                	value={this.state.query}
					onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				<ListBooks
					shelfDictionary={this.props.shelfDictionary}
                	books={this.state.searchBooks}
                	onUpdateShelf={this.updateSelection}
              	/>
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks