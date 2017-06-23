export const TestWordsLens = (props, property) => props.savedTests[props.testIndex][property]
export const TotalWordsLens = props =>
  props.savedTests[props.testIndex].correctWords +
  props.savedTests[props.testIndex].incorrectWords +
  props.savedTests[props.testIndex].wordsToPlay
