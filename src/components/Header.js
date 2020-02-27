import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const H1 = styled.h1`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WhiteHeader = styled(Layout.Header)`
  background: dodgerblue;
  margin-bottom: 20px;
`;

export default function Header() {
  return (
    <WhiteHeader>
      <H1>Handwritten digit recognition using Tensorflow.JS</H1>
    </WhiteHeader>
  );
}
