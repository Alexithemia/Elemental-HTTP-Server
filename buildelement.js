function build(elementData) {
  const fs = require('fs');
  let main = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ';
  const mid = '</title><link rel="stylesheet" href="/css/styles.css"><script src="/deleteput.js"></script></head><body><h1>';
  const pre = '</p><p><a href="/">back</a></p>'
  const form1 = '<div id="put" class="put" onclick=' + "'" + 'document.getElementById("putForm").classList.toggle("show")' + "'" + '>Something wrong?</div><div id="putForm" class="putForm" action="/elements" method="post">Element name:<br><input type="text" id="elementName"      name="elementName" value="'
  const form2 = '"><br>Element Symbol:<br><input type="text" id="elementSymbol" name="elementSymbol" value="'
  const form3 = '"><br>Element Atomic Number:<br><input type="text" id="elementAtomicNumber" name="elementAtomicNumber" value="'
  const form4 = '"><br>Element Description:<br><textarea id="elementDescription" type="text" name="elementDescription">'
  const end = '</textarea><br><br><button onclick=changeElement()">Change</button></div></body></html>'
  let name = elementData.elementName;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  main += name + mid + name + '</h1><h2>';
  main += elementData.elementSymbol + '</h2><h3>';
  main += 'Atomic Number ' + elementData.elementAtomicNumber + '</h3><p>';
  main += elementData.elementDescription + pre;
  main += form1 + elementData.elementName + form2;
  main += elementData.elementSymbol + form3;
  main += elementData.elementAtomicNumber + form4;
  main += elementData.elementDescription + end;

  return main;
}

module.exports = build;