import React from 'react';
import styled from 'styled-components';

const H2 = styled.h2`
  text-align: center;
`;

const Output = ({ prediction }) => {
  return (
    <H2>
      {prediction != null
        ? `Prediction: ${prediction}`
        : 'Draw a number (0-9) in the black box above'}
    </H2>
  );
};

export default Output;
