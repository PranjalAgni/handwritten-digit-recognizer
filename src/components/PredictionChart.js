import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { Column } from '@ant-design/charts';
import styled from 'styled-components';

const CenteredDiv = styled.div`
  align-items: center;
`;

const PredictionChart = (props) => {
  const { digits } = props;
  const xLabels = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];

  const data = [];
  digits.forEach((digit, idx) => {
    data.push({
      pv: digit * 100,
      digits: xLabels[idx],
    });
  });

  console.log(data);
  const config = {
    title: {
      visible: true,
      text: 'Predicted digit bar chart 📊',
    },
    data,
    padding: 'auto',
    xField: 'digits',
    yField: 'pv',
  };
  return (
    <CenteredDiv>
      <Col>
        <Column {...config}></Column>
      </Col>
    </CenteredDiv>
  );
};

PredictionChart.propTypes = {
  digits: PropTypes.array,
};

export default PredictionChart;
