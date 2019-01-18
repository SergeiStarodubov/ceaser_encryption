import React from "react";

class Decoder extends React.Component {
  constructor() {
    super();
    this.frequencyLetters = {
      о: "0,10983",
      е: "0,08483",
      а: "0,07998",
      и: "0,07367",
      н: "0,067",
      т: "0,06318",
      с: "0,05473",
      р: "0,04746",
      в: "0,04533",
      л: "0,04343",
      к: "0,03486",
      м: "0,03203",
      д: "0,02977",
      п: "0,02804",
      у: "0,02615",
      я: "0,02001",
      ы: "0,01898",
      ь: "0,01735",
      г: "0,01687",
      з: "0,01641",
      б: "0,01592",
      ч: "0,0145",
      й: "0,01208",
      х: "0,00966",
      ж: "0,0094",
      ш: "0,00718",
      ю: "0,00639",
      ц: "0,00486",
      щ: "0,00361",
      э: "0,00331",
      ф: "0,00267",
      ъ: "0,00037",
      ё: "0,00013"
    };
  }
  render() {
    return (
      <>
        <form>
          <label htmlFor="codedText" className = 'text-info'></label>
          <textarea
            style={{ width: "500px" }}
            placeholder="Вставьте зашифрованный текст"
            className="form-control"
            id="codedText"
            rows="10"
          />
        </form>
        <button type="button" className="btn btn-primary mt-2">Начать дешифровку</button>
        <div style = {{width: '500px'}}></div>
      </>
    );
  }
}

export default Decoder;
