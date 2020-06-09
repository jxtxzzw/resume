const { dictMap } = require('./lang');

function dict(val, i18n) {
  if (dictMap[val] !== undefined) {
    return i18n.t(dictMap[val]);
  }
  return val;
}

module.exports = { dict };
