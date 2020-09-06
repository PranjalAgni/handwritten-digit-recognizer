export const PredictedAction = {
  SET_PREDICTED_DIGIT: 'SET_PREDICTED_DIGIT',
  RESET_PREDICTED_DIGIT: 'RESET_PREDICTED_DIGIT',
};

export const setPredictedDigit = (digit) => ({
  type: PredictedAction.SET_PREDICTED_DIGIT,
  data: { digit },
});

export const resetPredictedDigit = () => ({
  type: PredictedAction.RESET_PREDICTED_DIGIT,
});
