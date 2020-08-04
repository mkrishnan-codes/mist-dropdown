import React, { forwardRef, useState, useCallback, useEffect } from 'react';

const List = forwardRef((props, ref) => {
	const [pos, setPos] = useState(0);
	useEffect(() => {
		if (props.show && pos > 0 && ref.current) {
			ref.current.scrollTo(0, pos)
		}
	}, [props.show]);
	const onScroll = useCallback((e) => {

		setPos(e.currentTarget.scrollTop)
		props.onScroll(e);
	}, []);

	return props.show && (
		<div className={`dropdown-container ${props.showFilter ? `has-filter` : ``}`}>
			{props.showFilter && <div
				className="search-container">
				<input className="search-input" placeholder="Search" value={props.filterValue} onChange={props.onFilterValueChange} />
			</div>

			}
			<div
				className="dropdown"
				style={{ maxHeight: 500 }}
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
})

export default List;
