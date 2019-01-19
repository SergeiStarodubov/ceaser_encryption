import React from "react";
//
class Decoder extends React.Component {
  constructor() {
    super();
    this.frequencyLetters = {
      о: 0.10983,
      е: 0.08483,
      а: 0.07998,
      и: 0.07367,
      н: 0.067,
      т: 0.06318,
      с: 0.05473,
      р: 0.04746,
      в: 0.04533,
      л: 0.04343,
      к: 0.03486,
      м: 0.03203,
      д: 0.02977,
      п: 0.02804,
      у: 0.02615,
      я: 0.02001,
      ы: 0.01898,
      ь: 0.01735,
      г: 0.01687,
      з: 0.01641,
      б: 0.01592,
      ч: 0.0145,
      й: 0.01208,
      х: 0.00966,
      ж: 0.0094,
      ш: 0.00718,
      ю: 0.00639,
      ц: 0.00486,
      щ: 0.00361,
      э: 0.00331,
      ф: 0.00267,
      ъ: 0.00037,
      ё: 0.00013
    };
    this.amountLetters = {};
    this.cipher = {}
  }
  state = {
    text: ""
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
    //it is wrong
    // for (let enscriptedLetter in this.amountLetters) {
    //   for (let letter in this.frequencyLetters) {
    //     if (
    //       this.amountLetters[enscriptedLetter] >
    //         this.frequencyLetters[letter] - 0.001 &&
    //       this.amountLetters[enscriptedLetter] <
    //         this.frequencyLetters[letter] + 0.001
    //
    //     ) {
    //       this.cipher[enscriptedLetter] = letter
    //     }
    //   }
    // }
    // for (let i = 0; i < text.length; i++) {
    //   if (/[а-яА-ЯёЁ]/g.test(text[i]) ===  true) {
    //     text[i] = this.cipher[text[i].toLowerCase()];
    //   }
    // }
    // text = text.join('');
    console.log(text);
  };

  handleTextArea = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { text } = this.state;

    return (
      <>
        <form>
          <label htmlFor="codedText" className="text-info" />
          <textarea
            style={{ width: "500px" }}
            placeholder="Вставьте зашифрованный русскоязычный текст"
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
