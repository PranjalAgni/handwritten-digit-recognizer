import React from 'react';
import { useSelector } from 'react-redux';
import MnistDrawing from '../components/MnistDrawing';
import { MnistAction } from '../actions/mnist';
const MnistDrawingContainer = () => {
  const spinning = useSelector(
    (state) => state.mnist.status === MnistAction.INIT
  );
  return <MnistDrawing spinning={spinning} />;
};

export default MnistDrawingContainer;
