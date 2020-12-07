import * as types from "./types";

export const addToCart = (product, quantity) => ({
    type: types.ADD,
    payload: {
        product,
        quantity
    }
});

export const changeQuantity = (selected_quantity, cart, product) => ({
	type: types.CHANGE_QUANTITY,
	payload: {
        selected_quantity,
		cart,
        product
    }
})

export const selectProductToRemove = (prd, cartProducts) => ({
	type: types.SELECT_PRODUCTS_TO_REMOVE_FROM_CART,
	payload : {prd, cartProducts}
})


