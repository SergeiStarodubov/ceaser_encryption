import React from "react";
import style from "../styles/encripter.css";

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
    // and all additinal signs
    //make function to wrapp theese exprestions=================
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
    //==============================================
  };

  checkItcontainsOnlyRussianLetters = array => {
    // to check  if the key has only russian letters
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
    this.setState({ valueText: text });
  };

  copyTextToClipBoard = () => {
    try {
      let text = this.textarea.current;
      text.select();
      document.execCommand("copy"); //the command is to copy to the clipboard
      window.getSelection().removeAllRanges(); //to unselect the text
    } catch {
      alert("try to click copy again");
    }
  };

  handleTextArea = event => {
    this.setState({ valueText: event.target.value });
  };

  handleValueKey = e => {
    this.setState({ valueKey: e.target.value });
  };

  handleValueCode = e => {
    let number = +e.target.value;
    this.setState({ valueCode: number });
  };

  startEncryption = () => {
    const { valueKey, valueCode, valueText } = this.state;
    let [key, text] = [valueKey.split(""), valueText.split("")];
    // checking is to make sure that all requarments are carried out
    for (let i = 0; i < text.length; i++) {
      if (/[а-яА-ЯЁё\s\d!`_\-\)\]\[\}\{<>'".,|\\\/\?=\?\*\$\^&\(\+#@~]/g.test(text[i]) === false) text = false;
    }
    if (
      this.checkItcontainsOnlyRussianLetters(key) === false ||
      text === false ||
      isNaN(valueCode) === true
    ) {
      return false;
    } else {
      this.encryptText(valueText, valueKey, valueCode);
    }
  };

  state = {
    valueText: undefined,
    valueKey: undefined,
    valueCode: undefined
  };

  //система сеток
  // col-10 order-2 -менять блоки местами
  // <div className =  'container-fluid'>
  // <div className = 'row'>
  //   <div className = 'col-md-6' style = {{border: '1px solid black'}}>
  //     <div className = 'row'>
  //       <div className =  'col-md-4' style = {{border: '1px solid black'}}> inside 1</div>
  //       <div className =  'col-md-4' style = {{border: '1px solid black'}}> inside 2</div>
  //       <div className =  'col-md-4' style = {{border: '1px solid black'}}> inside 3</div>
  //     </div>
  //   </div>
  //   <div className =  'col-md-5' style = {{border: '1px solid black'}}> second</div>
  // </div>
  // </div>


  render() {
    return (
      <div>
        <textarea
          style = {{width: '300px'}}
          ref={this.textarea}
          value={this.state.valueText}
          onChange={this.handleTextArea}
        />
        <p>
          <button id="copyTextToClipBoard" onClick={this.copyTextToClipBoard}>
            copy
          </button>
        </p>
        <p>
          Введите ключ : <input type="text" onChange={this.handleValueKey} />
        </p>
        <p>
          Введите код (цифра 0-32)
          <input type="text" onChange={this.handleValueCode} />
        </p>
        <p>
          <button onClick={this.startEncryption}>encrypt</button>
        </p>
      </div>
    );
  }
}

export default Encrypter;
