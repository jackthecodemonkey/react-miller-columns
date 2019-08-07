import React from 'react';
import { Column, MillerColumns } from '../MillerColumns/';
import { shallow } from 'enzyme';

const getColumns = (columns) => {
    let arr = [];
    for (let i = 0; i < columns; i++) {
        arr.push(
            <Column key={i}>
                <div>
                    {i}
                </div>
            </Column>
        )
    }
    return arr;
}

describe('MillerColumn component', () => {
    let wrapper = null;
    let wrapperFactory = (numberOfColumns = 7) => {
        wrapper = shallow(
        <div>
            <MillerColumns
                maxColumn={5}
                minColumnWidth={150}
                columnMagin={20}
                peekWidth={30}
            >
                {
                    getColumns(numberOfColumns)
                }
            </MillerColumns>
        </div>)
    }

    it('Should render 7 Column components', () => {
        wrapperFactory();
        expect(wrapper.find('Column').length).toEqual(7);
    })

    it('Should render 10 Column components', () => {
        wrapperFactory(10);
        expect(wrapper.find('Column').length).toEqual(10);
    })

    it('Should have a ColumnMover instance', () => {
        wrapperFactory(10);
        const instance = wrapper.find('MillerColumn').dive().instance();
        expect(instance.columnMover.maxColumn).toEqual(5);
        expect(instance.columnMover.columnMagin).toEqual(20);
        expect(instance.columnMover.minColumnWidth).toEqual(150);
        expect(instance.columnMover.peekWidth).toEqual(30);
        expect(instance.columnMover.totalChilden).toEqual(10);
    })

})