import React from 'react';

const Airport = (props) => {
	return (
		<div>
			<div>{props.name}</div>
			<div>{props.code}</div>
			<div>{props.city}</div>
			<div>{props.country}</div>
		</div>
	);
}

export default Airport;
