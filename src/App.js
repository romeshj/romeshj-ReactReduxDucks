import React , {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Bird from './components/bird';
import ProductLists from './components/product-lists';
import Cart from './components/cart';
function App() {
  return (
    <div>
	<Router>
		<div className="container-fluid">
			<ul className="nav nav-tabs">
			  <li className="nav-item">
				<Link to="/bird" className="nav-link" activeClassName="active">Bird</Link>
			  </li>
			  <li className="nav-item">
				<Link to="/productlists" className="nav-link" activeClassName="active">Product Lists</Link>
			  </li>
			  <li className="nav-item">
				<Link to="/cart" className="nav-link" activeClassName="active">Cart</Link>
			  </li>
			</ul>
		</div>
		<Switch>
              <Route exact path="/bird" component={Bird} />			  
              <Route exact path="/productlists" component={ProductLists} />
			  <Route exact path="/cart" component={Cart} />
		</Switch>
	</Router>
    </div>
  );
}

export default App;
