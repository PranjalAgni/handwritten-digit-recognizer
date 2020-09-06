import React from 'react';
import { Spin } from 'antd';
import CenterCol from './shared/CenterCol';
import DrawingContainer from '../containers/Drawing';
import OutputContainer from '../containers/Output';
import ClearContainer from '../containers/Clear';
const MnistDrawing = ({ spinning }) => {
  return (
    <Spin spinning={spinning}>
      <CenterCol xs={24}>
        <DrawingContainer />
        <OutputContainer />
        <ClearContainer />
      </CenterCol>
    </Spin>
  );
};

export default MnistDrawing;
