export const TestWordsLens = (props, property, index) =>
  props.savedTests[index][property]

export const TestPercentageLens = (props, property, index) =>
  (props.savedTests[index][property] / TotalWordsLens(props, index))
export const TotalWordsLens = (props, index) =>
  props.savedTests[index].correctWords +
  props.savedTests[index].incorrectWords +
  props.savedTests[index].wordsToPlay
