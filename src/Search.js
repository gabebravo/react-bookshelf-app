import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class Search extends Component {

  state = {
    searchTerm: '', 
    books: []
  }

  updateSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
    if(e.target.value.length > 0 ){
      BooksAPI.search(e.target.value, 20)
        .then( books => {
          this.setState({ books });
        })
    } else {
      this.setState({ books: [] });
    }
  }

  updateBookShelf = (bookID, ev) => {
     BooksAPI.update({ id: bookID }, ev.target.value )
      .then( () => { console.log('book updated') })
  }

  render() {
    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.searchTerm} placeholder="Search by title or author" 
                  onChange={this.updateSearchTerm} />
              </div>
            </div>
            <div className="search-books-results">
              { this.state.books.length > 0 && (
                <ListBooks books={this.state.books} 
                optionHandler={this.updateBookShelf} />
              )} 
            </div>
          </div>
    );
  }
}

export default Search;