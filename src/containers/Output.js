import React from 'react';
import { useSelector } from 'react-redux';
import Output from '../components/Output';

const OutputContainer = () => {
  const prediction = useSelector((state) => state.mnist.prediction);
  return <Output prediction={prediction} />;
};

export default OutputContainer;
