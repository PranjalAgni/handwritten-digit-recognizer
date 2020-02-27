import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDrawing } from '../actions/drawing';
import Clear from '../components/Clear';
export default function ClearContainer() {
  const dispatch = useDispatch();
  const drawingDispatch = {
    resetDrawing: () => dispatch(resetDrawing())
  };
  return <Clear {...drawingDispatch} />;
}
