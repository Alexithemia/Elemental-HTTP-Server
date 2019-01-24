let url = function (reqUrl) {
  switch (reqUrl) {
    case '':
    case '/':
    case '/index':
      return '/index.html'
    case '/hydrogen':
      return '/hydrogen.html'
    case '/helium':
      return '/helium.html'
    case '/css/styles':
      return '/styles.css'
    default:
      return reqUrl;
  }
}

let body = function (reqBody) {
  let size = 0;
  const bodyMap = {
    elementName: true,
    elementSymbol: true,
    elementAtomicNumber: true,
    elementDescription: true
  }
  for (const key in reqBody) {
    size++
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
  url: url,
  body: body
}