import React, { Component } from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import ItemField from './itemfield';
let z = [];
let changedItem = {}
let updatedCartItem = {}
let zPrice = []
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
    }
	
	handleChange(event, c){
        const { cartItems } = this.state;
		console.log( " cartItems ", cartItems )
		//const { orderItems }= this.state;		
        const item = cartItems.find(e => e.id == c.id);		
		if(item.id == c.id){
			const price = parseFloat(item.price) * parseFloat(event.target.value)
			console.log(price)
			const updatedItem = {total : price, quantity : event.target.value}
			changedItem = {...item, ...updatedItem};
			console.log( " changedItem ", changedItem)
			//updatedCartItem = cartItems.find(x => x.id === changedItem.id);
			//console.log( " updatedCartItem ", updatedCartItem)
			
			const newCartItems = cartItems.map(el => el.id == changedItem.id ? {...el, quantity : changedItem.quantity, total : changedItem.total} : el)
			console.log(" newCartItems " ,newCartItems)
			//z = {...cartItems , changedItem}
			
			/*z = z.filter(e => e.id !== c.id);
			z = z.concat(changedItem)*/
			
			//console.log(" === zzzzz === ", z)
			this.setState({
				[event.target.name] : event.target.value,
				changedItem : changedItem,
				cartItems : newCartItems
			})			
			this.totalPrice(newCartItems);
		}
	}
	
	totalPrice(item){		
		const price = item.reduce((sum, obj) => sum + obj['total'], 0);
		this.setState({
			totalSum : price			
		})
	}
	
	componentDidMount(){
		const { cartItems } = this.props;
		this.setState({			
			cartItems : cartItems.map(el => ({...el, total : el.price}))
		}, () => {this.totalPrice(this.state.cartItems)})

		
		//if(cartItems && cartItems.length){} 
	}
    
    render( ) {        
		const { isProductExists, totalProducts } = this.props;
		const { quantity, changedItem, totalSum, cartItems } = this.state;
		
		console.log(" render cartItems ",  cartItems)
        return (
		<Router>
            <div>
			{ 
				cartItems && cartItems.length ? 
				
				<table className="table">
					<thead>
					  <tr>
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
				: <div className="alert alert-warning">No Products</div>
			}
			{ totalProducts == null ? '' : (isProductExists ? '' : <div className="alert alert-info">New Product Added In Cart</div>) }
			
			{ /*
				orderItems && orderItems.length ? 
				<table class="table">
					<thead>
					  <tr>
						<th>Product Name</th>
						<th>Quantity</th>
						<th>Price</th>
					  </tr>
					</thead>
					<tbody>				
					{
						orderItems.map((o, index) => {
							return(					
							<tr key={index}>
								<td>{ o.name }</td>
								<td>{ o.quantity } { o.quantity > 1 ? "items" : "item" }</td> 
								<td>{`$${o.price}`}</td> 
							</tr>)
						})
					}
					</tbody>
				</table> : ''
			*/}
			{ 
				cartItems && cartItems.length ? <div className="alert alert-info">Total Price : <strong>{`$${totalSum}`}</strong></div> : null
			}
            </div>
		</Router>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
	return {
		cartItems: state.cart.cart.totalProducts,
		isProductExists : state.cart.cart.isProductExists,
		totalProducts : state.cart.cart.totalProducts
	}
};


export default connect( mapStateToProps,  null)(withRouter(Cart));
