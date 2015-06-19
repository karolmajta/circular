var uuid = require('uuid');
var _ = require('underscore');

var factory = function (F, iF) {
    return function (data) {
      var obj = F(data).set('uuid', uuid.v1());
      var boundInterface = _.chain(iF)
        .map(function (f, k) { return [k, f.bind(obj)] })
        .object()
        .value()
      return _.extend(obj, boundInterface);
    }
};

module.exports = factory;
