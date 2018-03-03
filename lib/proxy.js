/*
* @Author: Krishna
* @Date:   2018-03-02 19:40:00
* @Last Modified by:   Krishna
* @Last Modified time: 2018-03-02 19:53:50
*/
const org = process.binding;
const util = require('util');

module.exports = process.binding = function(args) {
  var that = org(args),
    thatc = that;
    for (let i in thatc) {
      if (util.isFunction(thatc[i]) && (!thatc[i].__isStubbed)) {
        let fn = thatc[i];
        if (i[0] !== i[0].toUpperCase()) {
          thatc[i] = function() {
            return fn.apply(that, arguments);
          }
          thatc[i].__isStubbed = true; 
        }
      }
    }
  return that;
};