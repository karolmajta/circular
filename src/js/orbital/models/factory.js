var uuid = require('uuid');

var factory = function (F, iF) {
    return function (data) {
      return F(data).set('uuid', uuid.v1());
    }
};

module.exports = factory;
