function generateEmail() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for (var i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  var email = string + '@whatever.com';
  return email;
}
module.exports = generateEmail();
