import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDrawing } from '../actions/drawing';
import { resetPrediction } from '../actions/mnist';
import Clear from '../components/Clear';
export default function ClearContainer() {
  const dispatch = useDispatch();
  const drawingDispatch = {
    resetDrawing: () => {
      dispatch(resetDrawing());
      dispatch(resetPrediction());
    },
  };
  return <Clear {...drawingDispatch} />;
}
