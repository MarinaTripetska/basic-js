const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const result = [...arr];
  const controls = {
    discardNext: "--discard-next",
    discardPrev: "--discard-prev",
    doubleNext: "--double-next",
    doublePrev: "--double-prev",
  };

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "string") {
      // const control = controls[arr[i]];

      if (arr[i] === controls.discardNext) {
        if (i === arr.length - 1) {
          result.pop();
        } else {
          result.splice(arr[i], 2);
        }
      }
      if (arr[i] === controls.discardPrev) {
        console.log("here we are1");
        if (i === 0) {
          console.log("here we are2");
          result.shift();
        } else {
          result.splice(arr[i - 1], 2);
        }
      }
      if (arr[i] === controls.doubleNext) {
        if (i === arr.length - 1) {
          result.pop();
        } else {
          result.splice(arr[i], 1, arr[i + 1]);
        }
      }
      if (arr[i] === controls.doublePrev) {
        if (i === 0) {
          result.shift();
        } else {
          result.splice(arr[i], 1, arr[i - 1]);
        }
      }
    }
  }

  return result;
}

module.exports = {
  transform,
};
