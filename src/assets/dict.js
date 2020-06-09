const map = {
  总分: 'message.exam.sum',
  语文: 'message.exam.chinese',
  数学: 'message.exam.maths',
  英语: 'message.exam.english',
  物理: 'message.exam.physics',
  化学: 'message.exam.chemistry',
  体育: 'message.exam.pe',
};

function dict(val, i18n) {
  if (map[val] !== undefined) {
    return i18n.t(map[val]);
  }
  return val;
}

module.exports = { dict };
