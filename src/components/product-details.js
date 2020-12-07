import React, { Component } from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import Cart from './cart';
import { productOperations } from "../ducks/products";
import { cartOperations } from "../ducks/cart";
import axios from 'axios';

class ProductDetails extends Component {
    constructor(props){
        super(props);
		this.state = {
			productInfo : []
		}
    }
    
    shouldComponentUpdate(nextProps, nextState){
		const {productInfo} = this.state;
		const {product} = this.props;
		if(nextProps.product !== product || nextState.productInfo != productInfo || nextProps.match.params.permalink !== this.props.match.params.permalink){
            console.log("  hello inside  shouldComponentUpdate")
			return true;
		}
		return false;
	}

	componentDidUpdate(prevProps, prevState){
		 const {product, match : { params }, getDetails} = this.props;
		if(prevProps.product !== product || prevProps.match.params.permalink !== params.permalink){
			getDetails(params.permalink);
			this.setState({
				productInfo : this.props.product
			});
		}
	}
	
	componentDidMount(){
        const {match :{params}, getDetails} = this.props;
		getDetails(params.permalink);
		const {productInfo} = this.state;
		
    }
	
	addProductsToCart(){
		const {addToCart, history} = this.props;
		const {productInfo} = this.state;
		addToCart(productInfo, 1);
	}
	
    render( ) {
        const {productInfo, } = this.state;
		const { totalProducts, isProductExists, addToCart} = this.props
        return (
		<Router>
            <div className="container-fluid p-3">
				<div className='row'>
					<div className='col-md-4'>
						<div className='card' style={{'width':'400px'}}>
						  <img className='card-img-top' src={productInfo.imageUrl} />
						  <div className='card-body'>
							<h4 className='card-title'>{ productInfo.name }</h4>
							<p className='card-text'>Price: <strong>${ productInfo.price }</strong></p>
							<p className='card-text'>Description: { productInfo.description }</p>
							<button className='btn btn-primary' onClick={() => addToCart(productInfo, 1)}>Add To Cart</button>
						  </div>
						</div>
					</div>
				</div>
				
            </div>
		</Router>
        );
    }
}

const mapStateToProps = state => {
	return {
		productLists : state.products.products.productLists,
		product : state.products.products.product,
		isProductExists : state.cart.cart.isProductExists,
		totalProducts : state.cart.cart.totalProducts
	}
};

const mapDispatchToProps = {      
	getDetails  : productOperations.getDetails,
	addToCart : cartOperations.addToCart
};

export default connect( mapStateToProps, mapDispatchToProps )(withRouter(ProductDetails));
