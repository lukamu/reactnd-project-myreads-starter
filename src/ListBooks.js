import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'


class ListBooks extends Component {
	static propTypes = {
    shelfDictionary : PropTypes.object.isRequired,
    shelfTitle : PropTypes.string,
		books : PropTypes.array.isRequired,
    onUpdateShelf : PropTypes.func.isRequired
	}

  changeShelf = (book, event) => {
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(book, event.target.value);
    }
  }

	render() {
		const { shelfDictionary, shelfTitle, books } = this.props;
    books.sort(sortBy('title'));
  	return(
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {books.map(book => 
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={this.changeShelf.bind(this, book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value={shelfDictionary.curr.shelfStatus}>{shelfDictionary.curr.shelfTitle}</option>
                            <option value={shelfDictionary.want.shelfStatus}>{shelfDictionary.want.shelfTitle}</option>
                            <option value={shelfDictionary.read.shelfStatus}>{shelfDictionary.read.shelfTitle}</option>
                            <option value={shelfDictionary.none.shelfStatus}>{shelfDictionary.none.shelfTitle}</option>
                          </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )}
              </ol>
            </div>
          </div>
  	)
	}
}

export default ListBooks

