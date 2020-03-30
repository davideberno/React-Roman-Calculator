const romanNumbers = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

const romanToArab = str => {
  return !str
    ? str
    : str
        .split("")
        .reduce((a, b, i, arr) => {
          if (romanNumbers[b] < romanNumbers[arr[i + 1]]) {
            a -= romanNumbers[b];
          } else {
            a += romanNumbers[b];
          }
          return a;
        }, 0)
        .toString();
};

export default romanToArab;
