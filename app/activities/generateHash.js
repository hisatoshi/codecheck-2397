var  GenerateHash = function() {

  function generate (messages) {
    return new Promise(function(resolve) {
      resolve (
        (
          _scientificNotation(_replaceCharacterToASCIICode(messages[0]))
          +_scientificNotation(_replaceCharacterToASCIICode(messages[1]))
        ).toString(16)
      );
    });
  }

  function _replaceCharacterToASCIICode(str) {
    return str.split('').reduce(function(charA, charB) {return charA+charB.charCodeAt(0);},'');
  }

  function _scientificNotation(num) {
    var result = parseInt(num);
    if(num.length>=22) {
      var _ = result.toExponential(16).toString().replace('e+','.').split('.');
      result = parseInt(_[1]+_[2]);
    }
    return result;
  }

  return {
    generate : generate
  };
};

module.exports = GenerateHash;
