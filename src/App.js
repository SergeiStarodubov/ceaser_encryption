import React from "react";
import Encrypter from "./components/Encrypter.js";
import Decoder from "./components/Decoder.js";

class App extends React.Component {
  state = {
    link: false
  };

  switchTabs = e => {
    let allTabs = document.querySelectorAll("a");
    for (let tab of allTabs) {
      tab.classList.remove("active");
    }
    if (e.target.id === "decoder") this.setState({ link: true });
    else if (e.target.id === "cipher") this.setState({ link: false });
    e.target.classList.add("active");
  };

  render() {

    const {link} = this.state;

    return (
      <div className="container mt-2">
        <ul className="nav nav-tabs" style={{ width: "500px" }}>
          <li className="nav-item">
            <a
              id="cipher"
              className="nav-link active "
              style={{ width: "140px" }}
              href="#"
              onClick={this.switchTabs}
            >
              Шифр Цезаря
            </a>
          </li>
          <li className="nav-item">
            <a
              id="decoder"
              className="nav-link "
              href="#"
              onClick={this.switchTabs}
            >
              Частотный анализ
            </a>
          </li>
        </ul>
        {link === false? <Encrypter/> : <Decoder/>}
      </div>
    );
  }
}

export default App;
