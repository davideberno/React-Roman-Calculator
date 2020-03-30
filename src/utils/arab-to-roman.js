const arabNumbers = {
  1: "I",
  5: "V",
  10: "X",
  50: "L",
  100: "C",
  500: "D",
  1000: "M"
};

const arabToRoman = str => {
  return !str
    ? str
    : str
        .split("")
        .map((num, i, arr) => num * Math.pow(10, arr.length - i - 1))
        .reduce((a, b, i, arr) => {
          const n = Math.pow(10, arr.length - i - 1);
          if (arabNumbers[b]) {
            a += arabNumbers[b];
          } else if (b / n === 4 || b / n === 9) {
            a += arabNumbers[n] + arabNumbers[b + n];
          } else if (b / n - 5 > 0) {
            a += arabNumbers[5 * n] + arabNumbers[n].repeat(b / n - 5);
          } else {
            a += arabNumbers[n].repeat(b / n);
          }
          return a;
        }, "");
};

export default arabToRoman;
