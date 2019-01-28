function deleteElement() {
  let name = document.getElementById('deleteName').value;

  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", name, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
  xhr.onload = function () {
    document.getElementById('result').innerHTML = xhr.responseText;
    if (JSON.parse(xhr.responseText)['success']) {
      document.location.reload(true)
    }
  }
  xhr.send()
}