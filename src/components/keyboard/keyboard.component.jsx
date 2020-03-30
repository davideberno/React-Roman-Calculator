import React from "react";

import "./keyboard.styles.scss";

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const romanNumbers = ["I", "V", "X", "L", "C", "D", "M"];
const symbols = {
  plus: " + ",
  minus: " - ",
  times: " * ",
  divided: " / ",
  equal: "=",
  cancel: "Canc"
};

const Keyboard = ({ handleClick, romanOn, switchFormat }) => (
  <div className="keyboard-container">
    <div className="keyboard">
      <button
        className={`key arabic-button ${romanOn ? "" : "inverted"}`}
        onClick={() => switchFormat()}
      >
        Arabic
      </button>
      <button
        className={`key roman-button ${romanOn ? "inverted" : ""}`}
        onClick={() => switchFormat()}
      >
        Roman
      </button>
      {romanOn
        ? romanNumbers.map((num, i) => (
            <button className="key" key={i} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))
        : numbers.map((num, i) => (
            <button className="key" key={i} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))}
      {Object.keys(symbols).map((sym, i) => (
        <button
          key={i}
          className={`key inverted key-${sym}`}
          onClick={() => handleClick(symbols[sym])}
        >
          {symbols[sym]}
        </button>
      ))}
    </div>
  </div>
);

export default Keyboard;
