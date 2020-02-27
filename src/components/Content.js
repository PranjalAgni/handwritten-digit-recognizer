import React from 'react';
import { Layout, Row } from 'antd';
import styled from 'styled-components';
import MnistDrawingContainer from '../containers/MnistDrawing';

const ContentContainer = styled(Layout.Content)`
  max-width: 880px;
  margin: 0 auto;
`;

export default function Content() {
  return (
    <Row>
      <ContentContainer>
        <MnistDrawingContainer />
      </ContentContainer>
    </Row>
  );
}
