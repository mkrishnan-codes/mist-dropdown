import React from 'react';
import AsyncDataChooser from '../AsyncDataChooser';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
const mockData = async () => {
	return Promise.resolve(['One', 'Two', 'Three']);
};
const mockFourData = async () => {
	return Promise.resolve(['One', 'Two', 'Three', '4']);
};
test('Snapshot test', () => {
	const component = renderer.create(
		<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Choose airport'}
			onSelect={item => item}
		/>,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


describe('Button behavior', () => {
	it('Render Button with specified label', () => {
		const dataChoser = shallow(<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Select item'}
			onSelect={item => item}
		/>);

		expect(dataChoser.text()).toEqual('Select item');
	});
	it('Render Button with default label', () => {
		const dataChoser = shallow(<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			onSelect={item => item}
		/>);

		expect(dataChoser.text()).toEqual('Choose');
	});
	
});
describe('List behaviour', () => {
	it('List is not shown first', () => {
		const wrapper = shallow((<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Select item'}
			onSelect={item => item}
		/>));
		expect(wrapper.containsMatchingElement(<ul />)).toEqual(false);
	});
	it('List is shown after click', () => {
		const wrapper = shallow((<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Select item'}
			onSelect={item => item}
		/>));

		wrapper.find('.dropdown-button').simulate('click');
		setTimeout(() => {
			expect(wrapper.containsMatchingElement(<ul />)).toEqual(true);
		}, 100);

	});
	it('List loaded with 4 items', () => {
		const wrapper = shallow((<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockFourData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Select item'}
			onSelect={item => item}
		/>));

		wrapper.find('.dropdown-button').simulate('click');
		setTimeout(() => {
			expect(wrapper.find('ul').children().length).toEqual(4);
		}, 100);

	});
	it('list loaded with 3 items', () => {
		const wrapper = shallow((<AsyncDataChooser
			className="airport-chooser"
			getAsyncData={mockData}
			keyExtractor={item => item.code}
			itemRender={item => item}
			label={'Select item'}
			onSelect={item => item}
		/>));

		wrapper.find('.dropdown-button').simulate('click');
		setTimeout(() => {
			expect(wrapper.find('ul').children().length).toEqual(3);
		}, 100);

	});

});