import React, {useEffect} from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { productOperations } from "../ducks/products";
import ProductDetails from './product-details';
const ProductLists = ( { productLists : {products}, loadProductsData } ) => {
	useEffect(() => {
		loadProductsData();
	}, []);
	
	return (
	    <Router>
        <div className="container-fluid p-4">
			<ul className="list-group">
			{
			
				products && products.length ? products.map( p => {
					return (<li className="list-group-item" key={ p.id }><Link  activeClassName="active" to={ `/products/${ p.permalink }` }>{ p.name }</Link></li>)
					}) : null
			}
			</ul>
			<Switch><Route exact path="/products/:permalink" component={ProductDetails} /></Switch>
        </div>
		</Router>
    );
}

const mapStateToProps = state => {
	return {
		productLists : state.products.products.productLists
	}
};

const mapDispatchToProps = {
	loadProductsData  : productOperations.loadProductsData
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductLists );