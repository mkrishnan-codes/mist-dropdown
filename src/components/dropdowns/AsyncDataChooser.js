import React, { useState, useEffect } from 'react';
import './style.scss';

const getData = async () => {
	const airports = await import('./configs/airports.js');
	return airports['default'];
};
const AsyncDataChooser = () => {
	const [show, setShow] = useState(false);
	const [data, setdata] = useState([]);
	const [scrollTop, setScrollTop] = useState(0);
	const numItems = data.length;
	const itemHeight = 40;
	const windowHeight = 500;
	useEffect(() => {
		const callApi = async () => {
			const dt = await getData();
			setdata(dt);
		};
		callApi();
	}, []);
	const innerHeight = numItems * itemHeight;
	const startIndex = Math.floor(scrollTop / itemHeight);
	const endIndex = Math.min(
		numItems - 1, 
		Math.floor((scrollTop + windowHeight) / itemHeight)
	);
	const items = [];
	const setItem = (it, _ind) => {
		it._ind = _ind;
		return it;
	}
	for (let i = startIndex; i <= endIndex; i++) {
		items.push(
			setItem(data[i], i)
		);
	}
	const onScroll = e => setScrollTop(e.currentTarget.scrollTop);
	return (
		<div className="ac-dropdown">
			<span onClick={() => setShow(!show)} className="selected"><span>Dropdown</span>
				<i className={`arrow ${show ? `down` : 'up'}`}></i>
			</span>
			{show && <div className="dropdown" style={{  maxHeight: 500 }} onScroll={onScroll}>
				<ul style={{ height: innerHeight }} >
					{
						items.map((item) => <li style={{ height: itemHeight, position: 'absolute', top: item._ind * itemHeight, width:'100%' }} key={item.code}>{item.code}</li>)
					}
				</ul>
			</div>}
		</div>
	);
}

export default AsyncDataChooser;
