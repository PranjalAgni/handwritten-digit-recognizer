import React from 'react';
import { Button } from 'antd';

export default function Clear({ resetDrawing }) {
  return (
    <Button type="primary" onClick={resetDrawing}>
      Clear
    </Button>
  );
}
