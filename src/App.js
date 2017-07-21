import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    booksInShelf: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  updateBookShelfState = (books) => {
    this.setState({
      booksInShelf: books,
      currentlyReading: books.filter( book => (book.shelf === "currentlyReading") ),
      wantToRead: books.filter( book => (book.shelf === "wantToRead") ),
      read: books.filter( book => (book.shelf === "read") ) 
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then( books => {
        this.updateBookShelfState(books);
      })
  }

  updateBookShelf = (bookID, ev) => {
     BooksAPI.update({ id: bookID }, ev.target.value )
      .then( () => {
          BooksAPI.getAll()
          .then( books => {
            this.updateBookShelfState(books);
          })
      })
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    { this.state.currentlyReading.length > 0 && (
                      <ListBooks books={this.state.currentlyReading}
                      optionHandler={this.updateBookShelf} />
                    )} 
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <div className="bookshelf-books">
                     { this.state.wantToRead.length > 0 && (
                       <ListBooks books={this.state.wantToRead} 
                       optionHandler={this.updateBookShelf} />
                     )} 
                    </div>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    { this.state.read.length > 0 && (
                      <ListBooks books={this.state.read} 
                      optionHandler={this.updateBookShelf} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Link className="open-search" to={{ 
              pathname: "/search", 
              state: { booksInShelf: this.state.booksInShelf }
              }}/>
          </div>
        }
      </div>
    )
  }
}

export default BooksApp
