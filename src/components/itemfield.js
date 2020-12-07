import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {rowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
const ItemField = ( props ) => {
	console.log(props.location.state)
	const item = props.location.state.item;
	const [quantity, setQuantity] = useState(item.quantity);
	
	const handleChange = (event) => {		
		setQuantity(event.target.value)
	}
	
	return (
        <div>
			<form>
				<p>Quantity <select value={quantity} onChange={(event) => handleChange(event)}>
					<option value="1">1</option>
					<option value="2">2</option>
				</select></p>
				<p>Price :  </p>
				<button type="button"></button>
			</form>
        </div>
    );
}

export default withRouter(ItemField);