import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDrawing } from '../actions/drawing';
import { resetPrediction } from '../actions/mnist';
import { resetPredictedDigit } from '../actions/predicted';
import Clear from '../components/Clear';
const ClearContainer = () => {
  const dispatch = useDispatch();
  const drawingDispatch = {
    resetDrawing: () => {
      dispatch(resetDrawing());
      dispatch(resetPrediction());
      dispatch(resetPredictedDigit());
    },
  };
  return <Clear {...drawingDispatch} />;
};

export default ClearContainer;
