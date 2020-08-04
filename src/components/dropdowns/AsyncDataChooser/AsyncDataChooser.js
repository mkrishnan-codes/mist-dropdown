import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import List from './List';
import { useDataSlice } from '../../../hooks/useDataSlice';
import Loader from '../../loaders/Loader';


const AsyncDataChooser = (props) => {
	let testDivRef = useRef(null);
	let containerRef = useRef(null);
	let ulContainerRef = useRef(null);
	const [show, setShow] = useState(false);
	const [hieghtCalculated, setHieghtCalculated] = useState(false);
	const [itemHeight, setItemHeight] = useState(100);
	const [scrollTop, setScrollTop] = useState(0);
	const [filter, setFilter] = useState('');
	const windowHeight = 500;

	const [data, items, innerHeight, startIndex] = useDataSlice(props.getAsyncData, windowHeight, scrollTop, itemHeight, props.filterFn !== null, props.filterFn, filter)

	const renderTest = items.length > 0;
	useLayoutEffect(() => {
		// const rect = testDivRef.current && testDivRef.current.getBoundingClientRect();
		// console.log(rect, 'RECT');
		if (!hieghtCalculated && testDivRef.current) {
			const height = testDivRef.current.clientHeight
			setItemHeight(height)
			setHieghtCalculated(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderTest])
	const handleClickOutside = (event) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setShow(false)
		}
	}
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const onScroll = e => setScrollTop(e.currentTarget.scrollTop);
	const onClick = useCallback((e) => {
		setShow(false);
		if (props.onSelect) {
			props.onSelect(data[e.currentTarget.getAttribute('datavalue')])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	return (
		<div
			style={props.style}
			ref={containerRef}
			className={`ac-dropdown ${props.className ? props.className : ``}`} >
			<div
				role="button"
				aria-label={props.label}
				tabIndex={0}
				onClick={() => setShow(!show)}
				className="dropdown-button">
				<div className="truncated">{props.label}</div>
				<div className={`arrow ${show ? `down` : 'up'}`}></div>
			</div>
			{
				(show && (!items || items.length < 1)) && (
					<div className="loader-container">
						<Loader />
					</div>
				)
			}
			<List show={show}
				showFilter={props.filterFn !== null}
				filterValue={filter}
				onFilterValueChange={(e) => setFilter(e.target.value)}
				items={items}
				innerHeight={innerHeight}
				startIndex={startIndex}
				onScroll={onScroll}
				onClick={onClick}
				ref={ulContainerRef}
				keyExtractor={props.keyExtractor}
				itemRender={props.itemRender}
				itemHeight={itemHeight}
			/>
			{renderTest && <li ref={testDivRef} className="test-height" key="hidden">{props.itemRender(items[0])}</li>}
		</div>
	);
}
AsyncDataChooser.defaultProps = {
	label: 'Choose',
	filterFn: null,
}
AsyncDataChooser.propTypes = {
	//  Required getAsyncData should be an async function to fetch data 
	getAsyncData: PropTypes.func.isRequired,

	// Required  itemRender fn to render the dropdown list item
	itemRender: PropTypes.func.isRequired,

	// Required keyExtractor function for supply key to list items
	keyExtractor: PropTypes.func.isRequired,

	// optional button label, if not supplied default label 'Choose' will be shown
	label: PropTypes.string,

	// optional style attribute
	style: PropTypes.object,

	// optional on change function which will return selected object
	onChange: PropTypes.func,

	// optional className attribute passign into the base react component
	className: PropTypes.string,

	// optional Filter function which can filter the data array supplied in to the dropdown list
	filterFn: PropTypes.func
}
export default AsyncDataChooser;
