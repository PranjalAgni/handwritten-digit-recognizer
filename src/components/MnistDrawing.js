import React from 'react';
import { Spin } from 'antd';
import CenterCol from './shared/CenterCol';
import DrawingContainer from '../containers/Drawing';
import OutputContainer from '../containers/Output';
import ClearContainer from '../containers/Clear';
export default function MnistDrawing({ spinning }) {
  return (
    <Spin spinning={spinning}>
      <CenterCol xs={24}>
        <DrawingContainer />
      </CenterCol>
      <CenterCol xs={24}>
        <OutputContainer />
      </CenterCol>
      <CenterCol xs={24}>
        <ClearContainer />
      </CenterCol>
    </Spin>
  );
}
