function build(elementData) {
  const fs = require('fs');
  let main = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ';
  const mid = '</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>';
  const end = '</p><p><a href="/">back</a></p>'
  let name = elementData.elementName;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  main += name + mid + name + '</h1><h2>';
  main += elementData.elementSymbol + '</h2><h3>';
  main += 'Atomic Number' + elementData.elementAtomicNumber + '</h3><p>';
  main += elementData.elementDescription + end;

  return main;
}

module.exports = build;