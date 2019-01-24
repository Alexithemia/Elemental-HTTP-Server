function build() {
  const fs = require('fs');
  let main = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>The Elements</h1><h2>These are all the known elements.</h2><h3>These are ';
  const mid = '</h3><ol>';
  const end = '</ol></body></html>';

  fs.readdir('./public/', function (err, files) {
    files.splice(files.indexOf('404.html'), 1);
    files.splice(files.indexOf('css'), 1);
    files.splice(files.indexOf('index.html'), 1);
    main += files.length + mid;
    files.forEach(file => {
      main += '<li><a href="' + file + '">';
      let element = file.slice(0, -5);
      element = element.charAt(0).toUpperCase() + element.slice(1);
      main += element + '</a></li>';
    });
    main += end;
    fs.writeFile('./public/index.html', main, function (err, data) {
      if (err) { throw err };
    });
  })
}

module.exports = build;