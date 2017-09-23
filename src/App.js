import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

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
      this.setState({ books : books })
    })
  }

  updateShelf = (book, shelfValue) => {
    if (this.state.books.filter(e => e.id === book.id)) {
      console.log("Found book: " + book.title)
      BooksAPI.update(book, shelfValue).then((book) => {
        BooksAPI.getAll().then((books) => {
          this.setState({ books : books })
        })
      }) 
    } else if (book.shelf !== shelfDictionary.none.shelfStatus) {
      console.log("Insert new book: " + book.title)
    }
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
        <div className="search-books">
          <div className="search-books-bar">
            <SearchBooks
              shelfDictionary={shelfDictionary}
              books={this.state.books}
              onUpdateShelf={this.updateShelf}
            />
          </div>
        </div>
      )}/>  
     </div>
    )
  }
}

export default BooksApp
