import React from 'react';
import { PageHeader } from 'antd';
import styled from 'styled-components';

const WhitePageHeader = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  background: dodgerblue;
  margin-bottom: 20px;
`;

const Header = () => {
  return (
    <WhitePageHeader title="Handwritten digit recognition using Tensorflow.JS" />
  );
};

export default Header;
