import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
//import sortBy from 'sort-by'

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
				console.log(query)
				if(!result.error) {
    	  			for(var i=0; i < result.length; i++) {
    	  				let match = this.props.books.filter((e) => e.id === result[i].id)
						if (match.length === 1) {
							result[i].shelf = match[0].shelf
							console.log("Match! ====>> " + result[i].shelf)
						} else {
							result[i].shelf = this.props.shelfDictionary.none.shelfStatus
							console.log("NO match! ====>> " + result[i].shelf)
						}
					}
					this.setState({ searchBooks: result })
    	  		}
    		})
		} else {
			this.setState({ searchBooks: [] })
		}
	}

	render() {
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/"></Link>
              <div className="search-books-input-wrapper">
                <input 
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
                	onUpdateShelf={this.props.onUpdateShelf}
              	/>
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks