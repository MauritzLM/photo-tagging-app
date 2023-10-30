
// check that value is not in array and array length is less than 3
exports.updateSelection = function(selection, array) {

    // check if selection is already in array
    let value_in_array = array.includes(selection);

    return (!value_in_array && array.length < 3)
};
