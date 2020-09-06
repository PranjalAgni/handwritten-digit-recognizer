import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addStroke, addStrokePos, endStroke } from '../actions/drawing';
import { startPrediction } from '../actions/pipeline';
import Drawing from '../components/Drawing';
const DrawingContainer = () => {
  const drawingState = useSelector(
    (state) => ({
      isDrawing: state.drawing.isDrawing,
      isEndStroke: state.drawing.isEndStroke,
      strokes: state.drawing.strokes,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const drawingDispatch = {
    addStroke: (pos) => dispatch(addStroke(pos)),
    addStrokePos: (pos) => dispatch(addStrokePos(pos)),
    endStroke: () => dispatch(endStroke()),
    startPrediction: (img) => dispatch(startPrediction(img)),
  };

  return <Drawing {...drawingState} {...drawingDispatch} />;
};

export default DrawingContainer;
