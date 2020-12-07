import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from "./utils";

const initialState = {
	product : null,
	quantity : 0,
	totalProducts : null,
	isProductExists : false
}
let newProuduct = [];
let changedItem = {};
let newCartItems = [];
let selectedProducts = [];
let changedSelectedItem = {};
let selectedCartItems = [];
const cartReducer = ( state = initialState, action ) => {
	     
		switch( action.type ) {
        case types.ADD:
				const p = {...action.payload.product, quantity : action.payload.quantity}
				const isProductExists = utils.productExistsInCart(newProuduct, p);			
				if(isProductExists == false) {
					newProuduct = newProuduct.concat(p);
				}			
				return {
							...state, 
							product : p,
							totalProducts : newProuduct,
							isProductExists : isProductExists
				};																				
			
		case types.CHANGE_QUANTITY:
			 const {selected_quantity, cart, product}= action.payload;
			 const item = cart.find(e => e.id == product.id);
			 if(item.id == product.id){
				const price = parseFloat(item.price) * parseFloat(selected_quantity)
				const updatedItem = {total : price, quantity : selected_quantity}
				changedItem = {...item, ...updatedItem};					
				newCartItems = cart.map(el => el.id == changedItem.id ? {...el, quantity : changedItem.quantity, total : changedItem.total} : el)
				 
			 }
			 return {
				 ...state,
				 totalProducts : newCartItems
			 }
		 
		 case types.SELECT_PRODUCTS_TO_REMOVE_FROM_CART:
			 const {prd, cartProducts}= action.payload;
			 const prditem = cartProducts.find(el => el.id == prd.id);
			 const removeItem = {remove : prd.remove}
			 changedSelectedItem = {...prditem, ...removeItem}
			 newProuduct = cartProducts.map(el => el.id == changedSelectedItem.id ? {...el, remove : changedSelectedItem.remove} : el)
			 return {
				 ...state,
				 totalProducts : newProuduct
			 }
		 
        default: return state;
    }
	
}

const reducer = combineReducers({
    cart: cartReducer
});

export default reducer;