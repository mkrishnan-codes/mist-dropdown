import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
	const ref = useRef(null);
	const [pos, setPos] = useState(0);
	useEffect(() => {
		if (props.show && pos > 0 && ref.current) {
			ref.current.scrollTo(0, pos)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.show]);
	const onScroll = useCallback((e) => {
		setPos(e.currentTarget.scrollTop)
		props.onScroll(e);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(props.showFilter, 'Show');
	return props.show && (
		<div className={`dropdown-container ${props.showFilter ? `has-filter` : ``}`}>
			{props.showFilter && <div
				className="search-container">
				<input className="search-input" placeholder="Search" value={props.filterValue} onChange={props.onFilterValueChange} />
			</div>

			}
			<div
				className="dropdown"
				style={{ maxHeight: props.containerHeight }}
				ref={ref}
				id="async-dropdown-list"
				onScroll={onScroll}>


				<ul style={{ height: props.innerHeight }} >

					{
						props.items.map((item, index) => <li
							style={{ height: props.itemHeight, top: (props.startIndex + index) * props.itemHeight }}
							key={props.keyExtractor(item)}
							datavalue={props.startIndex + index}
							onClick={props.onClick}
						>
							<div className="li-inner">{props.itemRender(item)}</div></li>)
					}

				</ul>
			</div>
		</div>
	);
}
List.propTypes = {
	show: PropTypes.bool.isRequired,
	containerHeight: PropTypes.number,
	showFilter: PropTypes.bool,
	filterValue: PropTypes.string,
	onFilterValueChange: PropTypes.func,
	items: PropTypes.array.isRequired,
	innerHeight: PropTypes.number,
	startIndex: PropTypes.number,
	onScroll: PropTypes.func,
	onClick: PropTypes.func,
	keyExtractor: PropTypes.func,
	itemRender: PropTypes.func,
	itemHeight: PropTypes.number
}

export default List;
