import React from "react";

class Encrypter extends React.Component {
  constructor() {
    super();
    this.russianAlphabet = [
      "а",
      "б",
      "в",
      "г",
      "д",
      "е",
      "ё",
      "ж",
      "з",
      "и",
      "й",
      "к",
      "л",
      "м",
      "н",
      "о",
      "п",
      "р",
      "с",
      "т",
      "у",
      "ф",
      "х",
      "ц",
      "ч",
      "ш",
      "щ",
      "ъ",
      "ы",
      "ь",
      "э",
      "ю",
      "я"
    ];
    this.encryption = {};
  }

  hashFunction = (key, code) => {
    if (isNaN(code)) return false;
    let cipher = new Array(33);
    let lettersOfKey = key.split("");
    this.checkKey(lettersOfKey) === false
      ? console.log("failed key")
      : console.log("key is ok");
    for (let i of lettersOfKey) {
      cipher[code] = i;
      code++;
    }

    let haveLetterBeenUsed = letter => {
      for (let i = 0; i < lettersOfKey.length; i++) {
        if (letter === lettersOfKey[i]) return false;
      }
    };

    for (let i = 0; i < this.russianAlphabet.length; i++) {
      code = code > 32 ? 0 : code;
      if (
        haveLetterBeenUsed(cipher[code]) === false ||
        haveLetterBeenUsed(this.russianAlphabet[i]) === false
      )
        continue;
      cipher[code] = this.russianAlphabet[i];
      code++;
    }
    for (let i = 0; i < cipher.length; i++) {
      this.encryption[this.russianAlphabet[i]] = cipher[i];
    }
  };

  checkKey = array => {
    for (let i = 0; i < array.length; i++) {
      if (/[а-яА-ЯЁё]/g.test(array[i]) === false) return false;
      for (let j = 0; j < array.length; j++) {
        if (array[i] === array[j] && i !== j) {
          return false;
        }
      }
    }
  };
  encryptText = (text, keyword, code) => {
    this.hashFunction(keyword, code);
    console.log(this.encryption);
    console.log(text);
    text = text.split('')
    console.log(text);
    for (let i = 0; i < text.length; i++) {
      let letter = text[i]
      let reg = new RegExp( `${letter}`,"g")
      text[i] = text[i].replace(reg, this.encryption[letter]);
    }
    text = text.join('')
    text = text.replace(/undefined/g, ' ')
    console.log(text);
  };
  state = {};
  render() {
    this.encryptText('привет мир', 'язь', 3);
    return <div />;
  }
}

export default Encrypter;
