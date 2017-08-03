export const TestPercentageLens = (state, property) =>
  (state[property] / TotalWordsLens(state))
export const TotalWordsLens = (state) =>
  state.correctCount +
  state.incorrectCount +
  state.totalWords
