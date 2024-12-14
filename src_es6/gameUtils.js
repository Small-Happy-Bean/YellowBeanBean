// Game Utils
// ? But the situation is that only several functions here...

// Func: pickRandomElemFromArray
function pickRandomElemFromArray(arrayX) {
  try {
    let randomElem = arrayX[(arrayX.length * Math.random()) | 0];
    return randomElem;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export default pickRandomElemFromArray;