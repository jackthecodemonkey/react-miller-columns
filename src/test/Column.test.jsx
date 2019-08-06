import React from 'react';
import Column from '../MillerColumns/Column';
import { shallow } from 'enzyme';

describe('Column component', () => {
    it('Should render children', () => {
        const wrapper = shallow(<Column><div className='row'>1</div></Column>);
        expect(wrapper.find('.row').length).toEqual(1);
    })

    it('Should have props passed via Column except style object', () => {
        const wrapper = shallow(
            <Column
                testProp={true}
                style={{ width: '100px' }}>
                <div style={{ width: '200px' }} className='row'>1</div>
            </Column>
        );
        expect(wrapper.find('.column').props().style).toEqual({ width: '100px' });
        expect(wrapper.find('.row').props().style).toEqual({ width: '200px' });
        expect(wrapper.find('.row').props().testProp).toEqual(true);
    })
})