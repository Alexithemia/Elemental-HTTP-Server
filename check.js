let body = function (reqBody) {
  let size = 0;
  const bodyMap = {
    elementName: true,
    elementSymbol: true,
    elementAtomicNumber: true,
    elementDescription: true
  }
  for (const key in reqBody) {
    size++;
    if (!bodyMap[key]) {
      return false;
    }
  }
  if (size === 4 || size === 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  body: body
}