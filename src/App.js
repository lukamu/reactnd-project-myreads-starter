import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false, //to be replced with React Router
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const shelfDictionary = {
      curr: {
        shelfTitle : 'Currently Reading',
        shelfStatus : 'currentlyReading'},
      want: {
        shelfTitle : 'Want to Read',
        shelfStatus : 'wantToRead'},
      read: {
        shelfTitle : 'Read',
        shelfStatus : 'read'
      }
    }

    const shelfSelection = [
      {shelfTitle: shelfDictionary.curr.shelfTitle, shelfStatus: shelfDictionary.curr.shelfStatus},
      {shelfTitle: shelfDictionary.want.shelfTitle, shelfStatus: shelfDictionary.want.shelfStatus},
      {shelfTitle: shelfDictionary.read.shelfTitle, shelfStatus: shelfDictionary.read.shelfStatus}]





    return (
     <div className="app">
      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {shelfSelection.map(item => (
              <ListBooks
                shelfDictionary={shelfDictionary}
                shelfTitle={item.shelfTitle}
                books={this.state.books.filter(book => book.shelf === item.shelfStatus)}
              />
              ))}
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div> 
      )}/>
          
      <Route path="/search" render={({ history }) => (
        <div className="search-books">
          <div className="search-books-bar">
            <SearchBooks 
              books={this.state.books}
            />
          </div>
        </div>
      )}/>  
     </div>
    )
  }
}

export default BooksApp
