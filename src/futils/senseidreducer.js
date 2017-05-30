export default (wordObjArray) => wordObjArray.reduce((acc, wordObj) =>
  wordObj.selected ? [wordObj.word.id, ...acc] : acc, [])
