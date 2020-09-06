import React from 'react';
import { Button } from 'antd';

const Clear = ({ resetDrawing }) => {
  return (
    <Button type="primary" onClick={resetDrawing}>
      Clear
    </Button>
  );
};

export default Clear;
