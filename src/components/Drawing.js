import React, { useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 300px;
  height: 300px;
  border-color: dodgerblue;
  border-width: 5px;
  border-style: solid;
  display: block;
  touch-action: none;

  /* &:hover: {
    border-color: deepskyblue;
  } */
`;

const Drawing = (props) => {
  let canvas = null;
  let ctx = null;

  useEffect(() => {
    initContext();
    drawStrokes();

    const { isEndStroke, startPrediction } = props;

    if (isEndStroke) {
      startPrediction(ctx.getImageData(0, 0, 280, 280));
    }
  });

  const onMouseDown = (e) => {
    const { addStroke } = props;
    addStroke(computeMousePos(e));
  };

  const onMouseMove = (e) => {
    const { isDrawing, addStrokePos } = props;
    if (!isDrawing) {
      return;
    }

    addStrokePos(computeMousePos(e));
  };

  const onStrokeEnd = () => {
    const { isDrawing, endStroke } = props;

    if (isDrawing) {
      endStroke();
    }
  };

  const setCanvasRef = (elt) => {
    console.debug('Setting..... canvas!!');
    canvas = elt;
  };

  const initContext = () => {
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'dark';

    clearCanvas();
  };

  const clearCanvas = () => {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const computeMousePos = (e) => ({
    x: computeMousePosX(e),
    y: computeMousePosY(e),
  });

  const computeMousePosX = (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;

    return (e.clientX - rect.left) * scaleX;
  };

  const computeMousePosY = (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleY = canvas.height / rect.height;

    return (e.clientY - rect.top) * scaleY;
  };

  const drawStrokes = () => {
    const { strokes } = props;

    for (let i = 0; i < strokes.length; i++) {
      const points = strokes[i];

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let j = 1; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y);
      }

      ctx.stroke();
    }
  };
  return (
    <div touch-action="none">
      <Canvas
        ref={setCanvasRef}
        onPointerDown={onMouseDown}
        onPointerMove={onMouseMove}
        onPointerUp={onStrokeEnd}
        onMouseLeave={onStrokeEnd}
        width="480"
        height="480"
      />
    </div>
  );
};

export default Drawing;
