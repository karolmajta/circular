var randFrom = function (start, stop) {
  return Math.random()*(stop-start) + start;
};


module.exports = {
  randFrom: randFrom
};
