import * as types from "./types";
import axios from 'axios';

export const fetchProducts = (products) => ({
    type : types.FETCH_LIST,
    payload : products
})

export const loadProductsData = () => {
    return (dispatch) =>{
		axios.get('./data/products.json')
		.then(({data: products}) => {
				dispatch(fetchProducts(products))
		})
    }
}

export const fetchProductDetails = (product) => ({
    type : types.FETCH_DETAILS,
    payload : product
})

export const getDetails = (prd) => {
	return (dispatch) =>{	
	 axios.get("../data/products.json")
        .then(({ data: products }) => {	
		  console.log(products, Object.values(products)[0])	  
          let product =  Object.values(products)[0].filter(p => p.permalink === prd)
		  
		  if(product[0].permalink === prd){
				dispatch(fetchProductDetails(product[0]))
		  }
        });
    }
}