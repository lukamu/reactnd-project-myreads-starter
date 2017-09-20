import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class ListBooks extends Component {
	static propTypes = {
    shelfDictionary : PropTypes.object.isRequired,
    shelfTitle : PropTypes.string.isRequired,
		books : PropTypes.array.isRequired
	}


	render() {
		const { shelfDictionary, shelfTitle, books } = this.props

  	return(
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {books.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value={shelfDictionary.curr.shelfStatus}>{shelfDictionary.curr.shelfTitle}</option>
                            <option value={shelfDictionary.want.shelfStatus}>{shelfDictionary.want.shelfTitle}</option>
                            <option value={shelfDictionary.read.shelfStatus}>{shelfDictionary.read.shelfTitle}</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
  	)
	}
}

export default ListBooks

