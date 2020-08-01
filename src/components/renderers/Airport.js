import React from 'react';
import './style.scss'
const Airport = (props) => {
	return (
		<div className="airport-wrapper">
			<div className="top-div">
				<div className="lg-txt city">{`${props.city}, ${props.country}`}</div>
				<div className="sm-txt name">{props.name}</div>
			</div>
			<div className="lg-txt code">{props.code}</div>
		</div>
	);
}

export default Airport;
