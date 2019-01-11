import React from "react";

class Encrypter extends React.Component {
  constructor() {
    super();
    this.textarea = React.createRef();
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
    //add this.encryption UpperLetter
    for (let key in this.encryption) {
      this.encryption[key.toUpperCase()] = this.encryption[key].toUpperCase();
    }
    // and additinal signs
    this.encryption[" "] = " ";
    this.encryption[","] = ",";
    this.encryption["."] = ".";
    this.encryption["!"] = "!";
    this.encryption["`"] = "`";
    this.encryption["~"] = "~";
    this.encryption["@"] = "@";
    this.encryption["#"] = "#";
    this.encryption["%"] = "%";
    this.encryption["&"] = "&";
    this.encryption["_"] = "_";
    this.encryption["-"] = "-";
    this.encryption["="] = "=";
    this.encryption[">"] = ">";
    this.encryption["<"] = "<";
    this.encryption["1"] = "1";
    this.encryption["2"] = "2";
    this.encryption["3"] = "3";
    this.encryption["4"] = "4";
    this.encryption["5"] = "5";
    this.encryption["6"] = "6";
    this.encryption["7"] = "7";
    this.encryption["8"] = "8";
    this.encryption["9"] = "9";
    this.encryption["0"] = "0";
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
    text = text.split("");
    for (let i = 0; i < text.length; i++) {
      let letter = text[i];
      if (letter === "}")
        text[i] = text[i].replace("\\}", this.encryption[letter]);
      else if (letter === "$")
        text[i] = text[i].replace("\\$", this.encryption[letter]);
      else if (letter === "^")
        text[i] = text[i].replace("\\^", this.encryption[letter]);
      else if (letter === "*")
        text[i] = text[i].replace("\\*", this.encryption[letter]);
      else if (letter === "?")
        text[i] = text[i].replace("\\?", this.encryption[letter]);
      else if (letter === "\\")
        text[i] = text[i].replace("\\\\", this.encryption[letter]);
      else if (letter === "{")
        text[i] = text[i].replace("\\{", this.encryption[letter]);
      else if (letter === "+")
        text[i] = text[i].replace("\\+", this.encryption[letter]);
      else if (letter === "]")
        text[i] = text[i].replace("\\]", this.encryption[letter]);
      else if (letter === "(")
        text[i] = text[i].replace("\\(", this.encryption[letter]);
      else if (letter === ")")
        text[i] = text[i].replace("\\)", this.encryption[letter]);
      else if (letter === "[")
        text[i] = text[i].replace("\\[", this.encryption[letter]);
      else if (letter === "|")
        text[i] = text[i].replace("\\|", this.encryption[letter]);
      else {
        let reg = new RegExp(`${letter}`, "g");
        text[i] = text[i].replace(reg, this.encryption[letter]);
      }
    }
    text = text.join("");
    return text;
  };

  state = {
    valueText: ""
  };

  copyTextToClipBoard = () => {
    try {
      let text = this.textarea.current;
      text.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    } catch {
      alert("try to click the button again");
    }
  };

  handleTextArea = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    this.encryptText("Привет, Мир}\\@+9.", "язь", 3);
    return (
      <div id="encrypter">
        <textarea
          ref={this.textarea}
          value={this.state.valueText}
          onChange={this.handleTextArea}
        />
        <button onClick={this.copyTextToClipBoard}>click</button>
      </div>
    );
  }
}

export default Encrypter;
