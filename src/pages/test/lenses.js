export const TestWordsLens = (props, property) => props.savedTests[props.testIndex][property]
export const TestPercentageLens = (props, property) =>
  (props.savedTests[props.testIndex][property] / TotalWordsLens(props))
export const TotalWordsLens = props =>
  props.savedTests[props.testIndex].correctWords +
  props.savedTests[props.testIndex].incorrectWords +
  props.savedTests[props.testIndex].wordsToPlay
