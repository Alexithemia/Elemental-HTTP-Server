function checkCredentials(credidentials) {
  const userMap = {
    'user:password': true
  }
  if (userMap[credidentials]) {
    return true;
  } else {
    return false;
  }
}
module.exports = checkCredentials;