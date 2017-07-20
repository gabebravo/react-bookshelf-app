import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// components
import BookShelf from './App'
import Search from './Search'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={BookShelf} />
      <Route path="/search" component={Search} />
      <Route />
    </Switch>
  </Router>
, document.getElementById('root'))
