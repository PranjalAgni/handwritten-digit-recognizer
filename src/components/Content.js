import React from 'react';
import { Layout, Row, Col } from 'antd';
import styled from 'styled-components';
import MnistDrawingContainer from '../containers/MnistDrawing';
import PredictionChartContainer from '../containers/PredictionChart';

const ContentContainer = styled(Layout.Content)`
  max-width: 880px;
  margin: 0 auto;
`;

const Content = () => {
  return (
    <ContentContainer>
      <Row>
        <Col span={24}>
          <MnistDrawingContainer />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PredictionChartContainer />
        </Col>
      </Row>
      {/* <ContentContainer>
        <MnistDrawingContainer />
        <MnistDrawingContainer />
      </ContentContainer> */}
    </ContentContainer>
  );
};

export default Content;
