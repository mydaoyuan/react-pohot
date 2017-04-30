// 返回一个随机值
function getRangeRandom(low, hight) {
  return Math.ceil(Math.random() * (hight - low) + low);
}

// 返回一个+-30deg之间的数值
function get30degRandom() {
  return ((Math.random() > 0.5 ? '' : '-' ) + Math.ceil(Math.random() * 30) + 'deg')
}

export {
  getRangeRandom,
  get30degRandom
}
