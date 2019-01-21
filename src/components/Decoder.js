import React from "react";
////
class Decoder extends React.Component {
  constructor() {
    super();
    this.frequencyLetters = [
      "о",
      "е",
      "а",
      "и",
      "н",
      "т",
      "с",
      "р",
      "в",
      "л",
      "к",
      "м",
      "д",
      "п",
      "у",
      "я",
      "ы",
      "ь",
      "г",
      "з",
      "б",
      "ч",
      "й",
      "х",
      "ж",
      "ш",
      "ю",
      "ц",
      "щ",
      "э",
      "ф",
      "ъ",
      "ё"
    ];
    this.amountLetters = {};
    this.cipher = {};
  }
  state = {
    text: ""
  };

  compareNumeric = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  };

  getAmoutnAndValueLetters = array => {
    let amountLetters = {};
    for (let i = 0; i < array.length; i++) {
      amountLetters[array[i].toLowerCase()] = 0;
    }
    for (let i = 0; i < array.length; i++) {
      for (let key in amountLetters) {
        if (key === array[i].toLowerCase()) amountLetters[key]++;
      }
    }
    amountLetters.wholeAmountLetters = 0;
    for (let key in amountLetters) {
      if (/[а-яА-ЯёЁ]/g.test(key) === true)
        amountLetters.wholeAmountLetters += amountLetters[key];
    }
    this.amountLetters = amountLetters;
  };

  decode = () => {
    let { text } = this.state;
    text = text.split("");
    this.getAmoutnAndValueLetters(text);
    for (let key in this.amountLetters) {
      if (key !== "wholeAmountLetters")
        this.amountLetters[key] = (
          this.amountLetters[key] / this.amountLetters.wholeAmountLetters
        ).toFixed(4);
    }
    let sortingOrderOfLetters = [];
    let letters = [];
    for (let key in this.amountLetters) {
      if (key !== "wholeAmountLetters") {
        sortingOrderOfLetters.push(+this.amountLetters[key]);
        letters.push(key);
      }
    }
    sortingOrderOfLetters.sort(this.compareNumeric);

    let sortingLetters = [];

    let sorting = () => {
      let i = sortingOrderOfLetters.length - 1;
      if (sortingOrderOfLetters.length < 0) return;
      for (let key in this.amountLetters) {
        if (sortingOrderOfLetters[i] === +this.amountLetters[key]) {
          sortingLetters.push(key);
          sortingOrderOfLetters.pop();
          sorting();
        }
      }
    };
    sorting();
//
    sortingLetters = sortingLetters.filter(item => {
      if (/[а-яА-ЯёЁ]/g.test(item)) return item;
    });
    //sortingLetters is the array where the most popular letters go decreasing their value
    let cipher = {};
    for (let i = 0; i < sortingLetters.length; i++) {
      cipher[sortingLetters[i]] = this.frequencyLetters[i];
    }
    for (let i = 0; i < text.length; i++) {
      if (/[а-яА-Я]/g.test(text[i]) === true) text[i] = cipher[text[i]];
    }
    text = text.join("");
    this.setState({ text: text });
  };

  handleTextArea = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { text } = this.state;

    return (
      <>
        <form>
          <label htmlFor="codedText" className="text-info">{this.state.text.length} символов</label>
          <textarea
            style={{ width: "500px" }}
            placeholder="Вставьте зашифрованный русскоязычный текст объемом не менее 2000 символов"
            className="form-control"
            id="codedText"
            rows="10"
            onChange={this.handleTextArea}
            value={text}
          />
        </form>
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={this.decode}
        >
          Начать дешифровку
        </button>
        <div style={{ width: "500px" }} />
      </>
    );
  }
}

export default Decoder;
