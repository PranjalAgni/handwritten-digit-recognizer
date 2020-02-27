import { takeLatest, call, put } from 'redux-saga/effects';
import { PipelineAction } from '../actions/pipeline';
import { requestPredict } from '../actions/mnist';
import { computeBoundingRect } from '../utils/image-processing';

function boundingBoxTask(image) {
  const canvas = document.createElement('canvas');
  canvas.height = 280;
  canvas.width = 280;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(image, 0, 0);
  const rect = computeBoundingRect(image);
  return {
    canvas,
    rect
  };
}

function croppedBoxTask(canvas, rect) {
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.height = 200;
  croppedCanvas.width = 200;
  const croppedCtx = croppedCanvas.getContext('2d');

  const rectWidth = rect.computeWidth();
  const rectHeight = rect.computeHeight();

  const scalingFactor = 200 / Math.max(rectWidth, rectHeight);
  const croppedRectSize = {
    width: rectWidth * scalingFactor,
    height: rectHeight * scalingFactor
  };

  croppedCtx.drawImage(
    canvas,
    rect.xmin,
    rect.ymin,
    rectWidth,
    rectHeight,
    0,
    0,
    croppedRectSize.width,
    croppedRectSize.height
  );

  return {
    croppedCanvas,
    croppedRectSize
  };
}

function centeredBoxTask(croppedCanvas, croppedRectSize) {
  const centeredCanvas = document.createElement('canvas');
  centeredCanvas.width = 280;
  centeredCanvas.height = 280;
  const centeredCtx = centeredCanvas.getContext('2d');

  centeredCtx.drawImage(
    croppedCanvas,
    centeredCanvas.width / 2 - croppedRectSize.width / 2,
    centeredCanvas.height / 2 - croppedRectSize.height / 2
  );

  return centeredCanvas;
}

function normalizedTask(centeredCanvas) {
  const normalizedCanvas = document.createElement('canvas');
  normalizedCanvas.width = 28;
  normalizedCanvas.height = 28;
  const normalizedCtx = normalizedCanvas.getContext('2d');

  normalizedCtx.drawImage(
    centeredCanvas,
    0,
    0,
    centeredCanvas.width,
    centeredCanvas.height,
    0,
    0,
    normalizedCanvas.width,
    normalizedCanvas.height
  );

  return normalizedCanvas;
}

function* startPrePrediction(action) {
  const { canvas, rect } = yield call(boundingBoxTask, action.image);
  const { croppedCanvas, croppedRectSize } = yield call(
    croppedBoxTask,
    canvas,
    rect
  );
  const centeredCanvas = yield call(
    centeredBoxTask,
    croppedCanvas,
    croppedRectSize
  );

  const normalizedCanvas = yield call(normalizedTask, centeredCanvas);

  const normalizedCtx = normalizedCanvas.getContext('2d');
  const normalizedImage = normalizedCtx.getImageData(
    0,
    0,
    normalizedCanvas.width,
    normalizedCanvas.height
  );

  yield put(requestPredict(normalizedImage));
}

function* watchPipeline() {
  yield takeLatest(PipelineAction.START_PREDICTION, startPrePrediction);
}

export default watchPipeline;
