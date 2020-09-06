import React from 'react';
import { useSelector } from 'react-redux';
import PredictionChart from '../components/PredictionChart';

const PredictionChartContainer = () => {
  const predictedDigit = useSelector((state) => state.predicted.digitsArray);

  return <PredictionChart digits={predictedDigit} />;
};

export default PredictionChartContainer;
