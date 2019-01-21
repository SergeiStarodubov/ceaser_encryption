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
    //add the keyword into the cipher
    for (let i of lettersOfKey) {
      cipher[code] = i;
      code++;
    }

    let haveLetterBeenUsed = letter => {
      for (let i = 0; i < lettersOfKey.length; i++) {
        if (letter === lettersOfKey[i]) return false;
      }
    };
    //fill out the rest chipher by russian letters in turn of Alphabet
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
    //add into the cipher UpperLetter
    for (let key in this.encryption) {
      this.encryption[key.toUpperCase()] = this.encryption[key].toUpperCase();
    }
    // and all punctuation marks
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

  checkItcontainsOnlyRussianLetters = array => {
    // to check  if the key has only russian letters
    for (let i = 0; i < array.length; i++) {
      // check if key letters are not repeatable themself
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
    //compare letters from original text and the cipher and replace them in case if they are RegExp marks
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
    text = text.replace(/undefined/g, " ");
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
    const { valueText } = this.state;
    // checking is to make sure that all requarments are carried out
    if (/[a-zA-z]/g.test(valueText) === true) {
      this.setState({ validationTextarea: "is-invalid" });
      this.setState({ errorTextarea: "visible" });
    } else {
      this.setState({ validationTextarea: "is-valid" });
      this.setState({ errorTextarea: "hidden" });
    }
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
    if (
      valueKey === undefined ||
      valueCode === undefined ||
      valueText === undefined
    ) {
      return false;
    }
    let [key, text] = [valueKey.split(""), valueText.split("")];
    // checking is to make sure that all requarments are carried out
    for (let i = 0; i < text.length; i++) {
      if (
        /[а-яА-ЯЁё\s\d!`_\-\)\]\[\}\{<>'".,:|«»—\\\/\?=\?\*\$\^&\(\+#@~]/g.test(
          text[i]
        ) === false
      )
        text = false;
    }
    if (
      this.checkItcontainsOnlyRussianLetters(key) === false ||
      text === false ||
      isNaN(valueCode) === true ||
      valueCode === 0 ||
      valueCode.toString().length > 1
    ) {
      return false;
    } else {
      this.encryptText(valueText, valueKey, valueCode);
    }
  };

  state = {
    valueText: undefined,
    valueKey: undefined,
    valueCode: undefined,
    validationTextarea: "is-invalid",
    validationKey: "is-invalid",
    validationCode: "is-invalid",
    errorTextarea: "visible",
    errorKey: "visible",
    errorCode: "visible"
  };

  render() {
    let {
      validationTextarea,
      validationKey,
      validationCode,
      errorTextarea,
      errorKey,
      errorCode,
      valueKey,
      valueCode,
      valueText
    } = this.state;

    let textarea = `form-control ${validationTextarea}`,
      inputCode = `form-control ${validationCode}`,
      inputKey = `form-control ${validationKey}`;
    //cheking the Key =====================
    let lettersOfKey = valueKey === undefined ? " " : valueKey.split("");
    if (
      /[a-zA-z0-9]/g.test(valueKey) === true ||
      this.checkItcontainsOnlyRussianLetters(lettersOfKey) === false ||
      valueKey === ""
    ) {
      inputKey = "form-control is-invalid";
      errorKey = "visible";
    } else {
      inputKey = "form-control is-valid";
      errorKey = "hidden";
    }
    // =====================================

    // cheking the Code -----------------------
    if (
      isNaN(valueCode) === true ||
      valueCode === 0 ||
      valueCode.toString().length > 1
    ) {
      inputCode = "form-control is-invalid";
      errorCode = "visible";
    } else {
      inputCode = "form-control is-valid";
      errorCode = "hidden";
    }
    //-------------------------------------

    if (/[a-zA-z]/g.test(valueText) === true || valueText === "") {
      textarea = "form-control is-invalid";
      errorTextarea = "visible";
    } else {
      textarea = "form-control is-valid";
      errorTextarea = "hidden";
    }

    return (
      <>
        <form className="was-valodated">
          <label htmlFor="validationTextarea" className="text-info">
            {" "}
          </label>
          <textarea
            className={textarea}
            id="validationTextarea"
            placeholder="Напишите текст"
            required
            ref={this.textarea}
            value={this.state.valueText}
            onChange={this.handleTextArea}
          />
          <div
            className="text-danger"
            style={{ visibility: errorTextarea, fontSize: "80%" }}
          >
            Используйте только русскую раскладку
          </div>

          <div>
            <label htmlFor="validationKey01" className="text-info">
              Введите ключ:
            </label>
            <input
              type="text"
              style={{ width: "500px" }}
              className={inputKey}
              id="validationKey01"
              required
              onChange={this.handleValueKey}
              onMouseDown={this.handleValueKey2}
            />
            <div
              className="text-danger"
              style={{ visibility: errorKey, fontSize: "80%" }}
            >
              только русская раскладка, буквы не должны повторяться
            </div>
          </div>

          <div>
            <label htmlFor="validationCode" className="text-info">
              Введите код:
            </label>
            <input
              style={{ width: "500px" }}
              type="text"
              className={inputCode}
              id="validationCode"
              required
              onChange={this.handleValueCode}
            />
            <div
              className="text-danger"
              style={{ visibility: errorCode, fontSize: "80%" }}
            >
              только цифры от 1 до 9 включительно
            </div>
          </div>
        </form>

        <p>
          <button
            className="btn btn-primary mr-5 mt-2"
            onClick={this.startEncryption}
          >
            шифровать
          </button>
          <button
            className="btn btn-secondary mt-2"
            id="copyTextToClipBoard"
            onClick={this.copyTextToClipBoard}
          >
            копировать текст
          </button>
        </p>
      </>
    );
  }
}

export default Encrypter;
