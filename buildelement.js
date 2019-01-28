const fs = require('fs');

function build(elementData) {
  let name = elementData.elementName;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ${name}</title><link rel="stylesheet" href="/css/styles.css"><script src="/put.js"></script></head><body><h1>${name}</h1><h2>${elementData.elementSymbol}</h2><h3>Atomic Number ${elementData.elementAtomicNumber}</h3><p>${elementData.elementDescription}</p><p><a href="/">back</a></p><div id="put" class="put" onclick='document.getElementById("putForm").classList.toggle("show")'>Something wrong?</div><div id="putForm" class="putForm" action="/elements" method="post">Element name:<br><input type="text" id="elementName"      name="elementName" value="${elementData.elementName}"><br>Element Symbol:<br><input type="text" id="elementSymbol" name="elementSymbol" value="${elementData.elementSymbol}"><br>Element Atomic Number:<br><input type="text" id="elementAtomicNumber" name="elementAtomicNumber" value="${elementData.elementAtomicNumber}"><br>Element Description:<br><textarea id="elementDescription" type="text" name="elementDescription">${elementData.elementDescription}</textarea><br><br><button onclick="changeElement()">Change</button></div></body></html>`
}

module.exports = build;