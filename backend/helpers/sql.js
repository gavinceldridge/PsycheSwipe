const { BadRequestError } = require("../expressError");

/**
 * Organizes data from JSON to SQL compatible string format with corresponding
 * ids of variables for parameterized queries
 *  
 * @param {*} dataToUpdate 
 * @param {*} jsToSql 
 * @returns {setCols, values}
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if (keys.length === 0) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) =>
        `"${jsToSql[colName] || colName}"=$${idx + 1}`,
    );

    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate),
    };
}

module.exports = { sqlForPartialUpdate };
