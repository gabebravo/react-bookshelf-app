import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class Search extends Component {

  constructor(props){
    super(props);
      this.state = {
        searchTerm: '', 
        books: [], 
        booksInShelf: this.props.location.state.booksInShelf,
        ids: this.props.location.state.booksInShelf.map( book => book.id)
      }
  }
/* complicated algorithm to show the shelf status of books from the homepage: 
    when the search term matches, the query returns an array of books from the api.
    Then I map over those books, and if one has an ID that matches those passed in 
    form the state of the bookshelf, I get the index of it and pull it from the bookshelf array.
    I then return it in place of the non-shelf categorized book.
*/ 
  updateSearchTerm = (e) => {
    const { ids, booksInShelf } = this.state;
    this.setState({ searchTerm: e.target.value });

      if(e.target.value.length > 0 ){
        BooksAPI.search(e.target.value, 20)
          .then( books => {
            const matches = books.map( book => {
              if( ids.indexOf(book.id) >= 0 ) {
                return booksInShelf[ids.indexOf(book.id)]
              } else {
                return book              
              }
            })
            this.setState({ books: matches });
          })
          .catch( error => {
            console.log('there is no match');
          })
      } else {
        this.setState({ books: [] });
      }
  }

  /* More simple algorithm used to update a book's shelf status
    on the Search page. It would update the status as soon as it
    is changed. */ 
  updateBookShelf = (bookID, ev) => {
    const shelf = ev.target.value;
    
     BooksAPI.update({ id: bookID }, shelf )
      .then( () => { 
        const arr = this.state.books.map( book => {
          if( book.id === bookID ){
            book.shelf = shelf;
            return book;
          } else {
            return book;
          }
        })
        this.setState({ books: arr });
      })
      .catch( error => {
        console.log('there is no match');
      })
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