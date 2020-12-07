export const productExistsInCart = (cartProducts, product) => {	
	return cartProducts.some(prod => prod.id === product.id)
}

export const productToRemoveExistsInCart = (cartProducts, product) => {	
	return cartProducts.find(prod => prod.id === product.id)
}
