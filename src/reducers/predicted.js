import { PredictedAction } from '../actions/predicted';

const initialState = {
  predictedDigit: null,
  digitsArray: Array.from(Array(10), () => 0),
};

const predicted = (state = initialState, action) => {
  switch (action.type) {
    case PredictedAction.SET_PREDICTED_DIGIT:
      const { digit } = action.data;
      const predictedDigitsArray = Array.from(Array(10), (_, idx) =>
        digit === idx ? 1 : 0
      );

      return {
        ...state,
        predictedDigit: digit,
        digitsArray: predictedDigitsArray,
      };
    case PredictedAction.RESET_PREDICTED_DIGIT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default predicted;
