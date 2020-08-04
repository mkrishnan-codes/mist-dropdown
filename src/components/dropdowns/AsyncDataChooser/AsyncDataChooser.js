import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import List from './List';
import { useDataSlice } from '../../../hooks/useDataSlice';


const AsyncDataChooser = (props) => {
	// ref to test dynamic height of content
	let testDivRef = useRef(null);
	// ref to container to identify click inside and outside
	let containerRef = useRef(null);
	// States
	const [show, setShow] = useState(false);
	const [hieghtCalculated, setHieghtCalculated] = useState(false);
	const [itemHeight, setItemHeight] = useState(100);
	const [scrollTop, setScrollTop] = useState(0);
	const [filter, setFilter] = useState('');
	// Container height to manage number of items to display
	const containerHeight = 500;


	// Data slicing logic and absolute position calculations of list items by a custom hook

	const [data, items, innerHeight, startIndex] = useDataSlice(props.getAsyncData, containerHeight, scrollTop, itemHeight, props.filterFn !== null, props.filterFn, filter)

	// Logic to find the inner item hieght which can be dynamic
	const renderTest = items.length > 0;
	useLayoutEffect(() => {
		if (!hieghtCalculated && testDivRef.current) {
			const height = testDivRef.current.clientHeight
			setItemHeight(height)
			setHieghtCalculated(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderTest])

	// Close if click outside after checking container target
	const handleClickOutside = useCallback((e) => {
		if (containerRef.current && !containerRef.current.contains(e.target)) {
			setShow(false)
		}
	}, [containerRef])


	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Cleanup event listener
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	// change top position of all list item based on scroll
	const onScroll = useCallback(e => setScrollTop(e.currentTarget.scrollTop), []);

	// Click listener to set selected item
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
				(show && (items.length < 1)) && (
					<div className="loader-container">
						{props.loaderRenderFn ? props.loaderRenderFn() : <div>Loading..</div>}
					</div>
				)
			}
			{(items.length > 0) && <List show={show}
				containerHeight={containerHeight}
				showFilter={props.filterFn !== null}
				filterValue={filter}
				onFilterValueChange={(e) => setFilter(e.target.value)}
				items={items}
				innerHeight={innerHeight}
				startIndex={startIndex}
				onScroll={onScroll}
				onClick={onClick}
				keyExtractor={props.keyExtractor}
				itemRender={props.itemRender}
				itemHeight={itemHeight}
			/>}
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
	filterFn: PropTypes.func,

	// optional Loader function shown while loading async data, default will be 'Loading..' text
	loaderRenderFn: PropTypes.func
}
export default AsyncDataChooser;
