const fs = require('fs');
function build(cb) {
  fs.readdir('./public/', function (err, files) {
    if (err) { throw err };
    let list = '';
    files.splice(files.indexOf('404.html'), 1);
    files.splice(files.indexOf('css'), 1);
    files.splice(files.indexOf('index.html'), 1);
    files.splice(files.indexOf('delete.js'), 1);
    files.splice(files.indexOf('put.js'), 1);
    let totalElements = files.length;
    files.forEach(file => {
      list += '<li><a href="' + file + '">';
      let element = file.slice(0, -5);
      element = element.charAt(0).toUpperCase() + element.slice(1);
      list += element + '</a></li>';
    });

    let main = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements</title><link rel="stylesheet" href="/css/styles.css"><script src="/delete.js"></script></head><body><h1>The Elements</h1><h2>These are all the known elements.</h2><h3>These are ${totalElements}</h3><div id="add" class="add" onclick="document.getElementById('addForm').classList.toggle('show')">Add an element?</div><form id="addForm" class="addForm"action="/elements" method="post">Element name:<br><input type="text" name="elementName" value=""><br>Element Symbol:<br><input type="text" name="elementSymbol" value=""><br>Element Atomic Number:<br><input type="text" name="elementAtomicNumber" value=""><br>Element Description:<br><textarea id="description" type="text" name="elementDescription" value=""></textarea><br><br><input type="submit" value="Submit"></form><ol>${list}</ol><div onclick="document.getElementById('deleteForm').classList.toggle('show')">Delete an Element?</div><div id="deleteForm" class="deleteForm">Element to delete:<br><input id="deleteName" type="text" value=""><button onclick="deleteElement()">Delete</button><div id="result"></div></div></body></html>`

    fs.writeFile('./public/index.html', main, function (err, data) {
      if (err) { throw err };
      cb();
    });
  });
};

module.exports = build;