import React, {useState} from "react";
import { connect } from "react-redux";
import { duckOperations } from "../ducks/bird";

const Bird = ( props ) => {
	const items = [
		{ id : '1', quantity : 10},
		{ id : '2', quantity : 20}
	]
	console.log(props)
	const [products, setProducts] = useState(items)
	const [quantity, setQuantity] = useState({})
	
	const handleChange = (event, c) => {
		const value = event.target.value;
		setQuantity({
			...quantity,
			[event.target.name]: value
		});
	}
	
	return (
	
	    
        <div className="container-fluid p-4">
            <button className="btn btn-primary" type="button" onClick={() => props.swim(120)}>CLICK</button> &nbsp;
			<button className="btn btn-primary" type="button" onClick={() => props.complexQuack(1001)}>CLICK</button>
				<p className="pt-3 mb-0">Distance  : {props.distance}</p>
				<p className="pt-3">Quacking  : {props.quacking == false ? 'No' : 'Yes'}</p>
					{
						products.map(c => {
							return(	
							<div className="col-md-2 pt-2"><select className="form-control" key={c.id} name={c.id}   onChange={(event) => handleChange(event, c)} style={{ 'width' : 'auto;'}}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select></div>)						
						})
					}
				
        </div>
		
    );
}

const mapStateToProps = state => {
	return {
		distance : state.bird.distance,
		quacking : state.bird.quacking
	}
};

const mapDispatchToProps = {
	swim  : duckOperations.swim,
	complexQuack : duckOperations.complexQuack
};

export default connect( mapStateToProps, mapDispatchToProps )( Bird );