export const reduceToSenseIds = (wordObjArray) => wordObjArray.reduce((acc, wordObj) =>
  wordObj.selected ? [wordObj.word.id, ...acc] : acc, [])

export const selectedCountReducer = (wordObjArray) => wordObjArray.reduce((acc, wordObj) =>
  wordObj.selected ? ++acc : acc, 0)
