import ColumnMover from '../MillerColumns/ColumnMover';

let totalWidth = 772;
let totalChilden = 7;
let maxColumn = 5;
let columnMagin = 20;
let minColumnWidth = 150;
let peekWidth = 30;

describe('ColumnMover model', () => {
    let mover = null;
    beforeEach(() => {
        mover = new ColumnMover(
            totalWidth,
            totalChilden,
            maxColumn,
            columnMagin,
            minColumnWidth,
            peekWidth
        );
    })

    it('Should create an instance of ColumnMover', () => {
        expect(mover instanceof ColumnMover).toEqual(true);
    })

    it('GetColumns property should return 4', () => {
        expect(mover.GetColumns()).toEqual(4);
    })

    it('shouldShowPeek property should return true', () => {
        expect(mover.shouldShowPeek).toEqual(true);
    })

    it('visibleColumns property should return 4', () => {
        expect(mover.visibleColumns).toEqual(4);
    })

    it('peekIndex property should return 2', () => {
        expect(mover.peekIndex).toEqual(2);
    })

    it('maxColumnsInContainer property should return 4', () => {
        expect(mover.maxColumnsInContainer).toEqual(4);
    })

    it('maxColumnWidth property should return 173', () => {
        expect(mover.maxColumnWidth).toEqual(173);
    })

    it('ShouldMoveSlider property', () => {
        expect(mover.ShouldMoveSlider(false)).toEqual(true);
        expect(mover.ShouldMoveSlider(true)).toEqual(true);
    })

    it('MoveToEnd property', () => {
        expect(mover.MoveToEnd()).toEqual(519);
    })

    it('MoveTo property', () => {
        expect(mover.MoveTo(1, false)).toEqual(153);
        expect(mover.MoveTo(1, true)).toEqual(183);
    })

})