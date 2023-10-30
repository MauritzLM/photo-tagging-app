const utils = require('../utils');


describe("test array checking function", () => {
    const array1 = ['walrus'];
    const array2 = ['bear'];

    const selection = 'walrus';

    test("test that function returns correct result", () => {

         expect(utils.updateSelection(selection, array1)).toBe(false);
         expect(utils.updateSelection(selection, array2)).toBe(true);
    });
});
