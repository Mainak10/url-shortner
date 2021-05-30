const ALPHABETS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

const CHAR_MAP = {};

ALPHABETS.split("").forEach((elm, i) => {
  CHAR_MAP[elm] = i;
});

/** convert int to radix 64 */

function int2radix64(num) {
  let chars = [];
  while (num) {
    let remainder = num % 64;
    chars.push(ALPHABETS.charAt(remainder));
    num = parseInt(num / 64);
  }
  return chars.join("");
}

/** convert str to  int */

function radix64toint(str) {
  let charsArr = str.split("");
  let num = 0;
  for (let i = 0; i < charsArr.length; i++) {
    num += CHAR_MAP[charsArr[i]] * Math.pow(64, i);
  }
  return num;
}

module.exports = { radix64toint, int2radix64 };
