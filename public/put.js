function changeElement() {
  let elementName = document.getElementById('elementName');
  let elementSymbol = document.getElementById('elementSymbol');
  let elementAtomicNumber = document.getElementById('elementAtomicNumber');
  let elementDescription = document.getElementById('elementDescription');
  let description = elementDescription.value.replace(/ /g, '%20');

  let putBody = `${elementName.name}=${elementName.value}&${elementSymbol.name}=${elementSymbol.value}&${elementAtomicNumber.name}=${elementAtomicNumber.value}&${elementDescription.name}=${description}`;

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", window.location.pathname, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
  xhr.onload = function () {
    if (JSON.parse(xhr.responseText)['success']) {
      document.location.reload(true)
    }
  }
  xhr.send(putBody);
}