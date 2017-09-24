import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

//Shelf status are listed in this object: in case we want to update or add
// more status in the future, this is the only placheholder for shelf values.

const shelfDictionary = {
      curr: {
        shelfTitle : 'Currently Reading',
        shelfStatus : 'currentlyReading'},
      want: {
        shelfTitle : 'Want to Read',
        shelfStatus : 'wantToRead'},
      read: {
        shelfTitle : 'Read',
        shelfStatus : 'read'},
      none: {
        shelfTitle : 'None',
        shelfStatus : 'none'
      }
    }

const shelfSelection = [
      {shelfTitle: shelfDictionary.curr.shelfTitle, shelfStatus: shelfDictionary.curr.shelfStatus},
      {shelfTitle: shelfDictionary.want.shelfTitle, shelfStatus: shelfDictionary.want.shelfStatus},
      {shelfTitle: shelfDictionary.read.shelfTitle, shelfStatus: shelfDictionary.read.shelfStatus}]

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  /**
  * @description  Update books state, according to the new shelf selection.
  * @param {book} query - The book obj to be updated
  * @param {shelfValue} query - The new shelf status of the book
  */
  updateShelf = (book, shelfValue) => {
    BooksAPI.update(book, shelfValue).then((book) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    }) 
  }

  render() {
    return (
     <div className="app">
      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {shelfSelection.map((item, index) => 
              <ListBooks
                key={index}
                shelfDictionary={shelfDictionary}
                shelfTitle={item.shelfTitle}
                books={this.state.books.filter(book => book.shelf === item.shelfStatus)}
                onUpdateShelf={this.updateShelf}
              />
              )}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div> 
      )}/>
      <Route path="/search" render={({ history }) => (
            <SearchBooks
              shelfDictionary={shelfDictionary}
              books={this.state.books}
              onUpdateShelf={this.updateShelf}
            />          
      )}/>  
     </div>
    )
  }
}

export default BooksApp
