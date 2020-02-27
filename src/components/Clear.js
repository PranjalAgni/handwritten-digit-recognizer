import React from 'react';
import { Button } from 'antd';

export default function Clear({ resetDrawing }) {
  return <Button onClick={resetDrawing}>Clear</Button>;
}
