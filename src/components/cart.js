import React, { Component } from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import { cartOperations } from "../ducks/cart";
//let changedItem = {}
let selectedProducts = [];
let productsToRemove = [];
class Cart extends Component {
    constructor(props){
        super(props);
			
			this.state = {
			cartAllItems : [],
			quantity : 0,
			totalSum : 0,
			cartItems  : props.cartItems.map(el => ({...el, total : el.price}))
		}
		this.handleChange = this.handleChange.bind(this);
		this.totalPrice = this.totalPrice.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.removeProducts = this.removeProducts.bind(this);
    }
		
	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.totalProducts !== this.props.totalProducts ||
		nextState.cartItems != this.state.cartItems || 
		nextState.totalSum  != this.state.totalSum){
			console.log("  hello inside cart  shouldComponentUpdate")
			return true;
		}
		return false;
	}
	
	componentDidUpdate(prevProps, prevState){
		const {totalProducts} = this.props;
		if(prevProps.totalProducts !== totalProducts){
			this.setState({
				cartItems : totalProducts
			}, () => {this.totalPrice(this.state.cartItems)});
		}
		
	}
	
	handleChange(event, c){
		const { changeQuantity } = this.props;
		const { cartItems } = this.state;
		const selected_quantity = event.target.value;
		changeQuantity(selected_quantity, cartItems, c)
	}
	
	totalPrice(item){		
		const price = item.reduce((sum, obj) => sum + obj['total'], 0);
		this.setState({
			totalSum : price			
		})
	}
	
	handleCheckBoxChange(event,p){
		const { cartItems } = this.state;
		const selected = {...p, remove : event.target.checked}
		const { selectProductToRemove } = this.props;
		selectProductToRemove(selected, cartItems)
		
	}
		
	removeProducts(){
		const {totalProducts} = this.props;
		const { cartItems } = this.state;
		let i = totalProducts.length;
		while (i--) {
			if (totalProducts[i].remove == true) {
				totalProducts.splice(i, 1);
			}
		}
		this.setState({
				cartItems : totalProducts,
				type : 'remove'
		}, () => {this.totalPrice(this.state.cartItems)});
	}
	
	componentDidMount(){
		const { cartItems } = this.props;
		this.setState({			
			cartItems : cartItems.map(el => ({...el, total : el.price}))
		}, () => {this.totalPrice(this.state.cartItems)})
	}
    
    render( ) {        
		const { isProductExists, totalProducts } = this.props;
		const { quantity, changedItem, totalSum, cartItems, type } = this.state;		
		//console.log(" render cartItems ",  cartItems)
        return (
		<Router>
            <div>
			{ 
				cartItems && cartItems.length ? 
				<>
				<table className="table">
					<thead>
					  <tr>
						<th></th>
						<th>Product Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
						<th>Actions</th>
					  </tr>
					</thead>
					<tbody>
					{cartItems.map(c => {
					return(					
						<tr key={c.id}>
						    <td><input type="checkbox" checked={c.remove || false}  value={c} name={ c.name } onChange={(event) => this.handleCheckBoxChange(event,c)}/></td>
							<td>{ c.name }</td>
							<td>{ c.quantity } { c.quantity > 1 ? "items" : "item" }</td> 
							<td>{`$${c.price}`}</td>
							<td>{`$${c.total}`}</td>							
							<td><select className="form-control" name={c.id}  onChange={(event) => this.handleChange(event, c)}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
							</td>
						</tr>
						)
					})}
					</tbody>
				  </table>
				  <button type='button' className='btn btn-secondary m-2'  onClick={this.removeProducts}>REMOVE SELECTED PRODUCTS</button>
				  </>				  
				: <div className="alert alert-warning">No Products</div>
			}
			{ totalProducts == null ? '' : (isProductExists ? '' : <div className="alert alert-info">{ type !== 'remove' ? 'New Product Added In Cart' : 'Product Removed'}</div>) }
			
			{ 
				cartItems && cartItems.length ? <div className="alert alert-info">Total Price : <strong>{`$${totalSum}`}</strong></div> : null
			}
            </div>
		</Router>
        );
    }
}

const mapStateToProps = state => {
	return {
		cartItems: state.cart.cart.totalProducts,
		isProductExists : state.cart.cart.isProductExists,
		totalProducts : state.cart.cart.totalProducts
		
	}
};

const mapDispatchToProps = {
	changeQuantity : cartOperations.changeQuantity,	
	selectProductToRemove : cartOperations.selectProductToRemove
};


export default connect( mapStateToProps,  mapDispatchToProps)(withRouter(Cart));
