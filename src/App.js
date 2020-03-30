import React, { Component } from "react";

import Display from "./components/display/display.component";
import Keyboard from "./components/keyboard/keyboard.component";

import romanToArab from "./utils/roman-to-arab";
import arabToRoman from "./utils/arab-to-roman";

import "./App.scss";

class App extends Component {
  state = {
    displayMain: "",
    displayOps: "",
    romanOn: false
  };

  handleClick = key => {
    if (/\d/.test(key)) {
      this.handleDigits(key);
    } else if (/=/.test(key)) {
      this.handleEqual();
    } else if (/Canc/.test(key)) {
      this.cancelDisplay();
    } else if (/I|V|X|L|C|D|M/.test(key)) {
      this.handleRomanNumbers(key);
    } else {
      this.handleOperators(key);
    }
  };

  handleDigits = key => {
    this.setState({
      displayMain: this.state.displayMain + key
    });
  };

  handleRomanNumbers = key => {
    this.setState({
      displayMain: this.state.displayMain + key
    });
  };

  handleOperators = key => {
    const { displayMain, displayOps } = this.state;
    this.setState({
      displayOps: displayOps + displayMain + key,
      displayMain: ""
    });
  };

  handleEqual = () => {
    const { displayMain, displayOps, romanOn } = this.state;
    const str = displayOps + displayMain;
    const result = this.calculate(str);

    if (result > 3999 && romanOn) {
      this.romanNumTooBig();
    } else {
      romanOn
        ? this.showResult(arabToRoman(String(result)))
        : this.showResult(String(result));
    }
  };

  calculate = str => {
    const { romanOn } = this.state;

    const arr = romanOn ? this.convert(str).split(" ") : str.split(" ");

    const symbols = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b
    };

    return arr.reduce((a, b, i) =>
      symbols[b] && arr[i + 1] ? (a = symbols[b](+a, +arr[i + 1])) : a
    );
  };

  showResult = result => {
    const { displayMain, displayOps } = this.state;
    this.setState(
      {
        displayOps: displayOps + displayMain,
        displayMain: ""
      },
      () => {
        setTimeout(() => {
          this.setState({
            displayOps: "",
            displayMain: result
          });
        }, 800);
      }
    );
  };

  switchFormat = () => {
    const { displayMain, displayOps, romanOn } = this.state;

    if (+displayMain > 3999 || this.calculate(displayOps) > 3999) {
      this.romanNumTooBig();
    } else {
      const converteDisplayMain = displayMain ? this.convert(displayMain) : "";
      const converteDisplayOps = displayOps ? this.convert(displayOps) : "";

      this.setState({
        romanOn: !romanOn,
        displayMain: converteDisplayMain,
        displayOps: converteDisplayOps
      });
    }
  };

  convert = display => {
    return this.state.romanOn
      ? display
          .split(" ")
          .map(el => (/\+|-|\*|\//g.test(el) ? el : romanToArab(el)))
          .join(" ")
      : display
          .split(" ")
          .map(el =>
            /\+|-|\*|\//g.test(el) ? el : arabToRoman(String(Math.floor(el)))
          )
          .join(" ");
  };

  romanNumTooBig = () => {
    const screen = this.state.displayOps;
    this.setState(
      {
        displayOps: "The number is too big to be converted"
      },
      () => {
        setTimeout(() => {
          this.setState({
            displayOps: screen
          });
        }, 800);
      }
    );
  };

  cancelDisplay = () => {
    this.setState({
      displayMain: "",
      displayOps: ""
    });
  };

  render() {
    const { displayMain, displayOps, romanOn } = this.state;
    return (
      <div className="calculator">
        <Display displayMain={displayMain} displayOps={displayOps} />
        <Keyboard
          romanOn={romanOn}
          handleClick={this.handleClick}
          switchFormat={this.switchFormat}
        />
      </div>
    );
  }
}

export default App;
