function Bot(data) {
  //Solve the challenge here and pass all the tests
  this.command = data.command;
  this.data = data.data;
  this.hash = null;
}


Bot.prototype.generateHash = function() {
  this.hash = (
    scientificNotation(_replaceCharacterToASCIICode(this.command))
    +scientificNotation(_replaceCharacterToASCIICode(this.data))
  ).toString(16);
}

_replaceCharacterToASCIICode = function(str){
  return str.split('').reduce(function(charA, charB) {return charA+charB.charCodeAt(0);},'');
}


// Convert the number into scientific notation with 16 digits after "."
// If power of e is greater than 20, get the number (between "." and "e" + after e+)
// Else return the number itself
function scientificNotation(num) {
  var result = parseInt(num);
  if(num.length>=22) {
    var _ = result.toExponential(16).toString().replace('e+','.').split('.');
    result = parseInt(_[1]+_[2]);
  }
  return result;
}

module.exports = Bot;
