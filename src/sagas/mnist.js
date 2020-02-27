import * as tf from '@tensorflow/tfjs';
import { apply, call, put, take } from 'redux-saga/effects';
import { resetDrawing } from '../actions/drawing';
import {
  loadAndTrainMnistSucceeded,
  loadingMnist,
  loadPretrainedModelSucceeded,
  MnistAction,
  predictSucceeded,
  trainingMnist
} from '../actions/mnist';
import HWDigitsClassifier from '../classifiers/handwritten-digits-classifier';
import MnistData from '../data/mnist-data';
import { convertToGrayscale } from '../utils/image-processing';

function* loadPretrainedModel() {
  const pretrainedHWClassifier = new HWDigitsClassifier();
  yield apply(pretrainedHWClassifier, pretrainedHWClassifier.loadModel);

  yield put(loadPretrainedModelSucceeded());
  return pretrainedHWClassifier;
}

function* predict(pretrainedHWClassifier, image) {
  const dataGrayscale = convertToGrayscale(image);
  const dataTensor = tf.tensor(dataGrayscale, [1, 28, 28, 1]);
  const prediction = pretrainedHWClassifier.predict(dataTensor);
  yield put(predictSucceeded(prediction));
}

function* loadAndTrainMnist() {
  yield put(loadingMnist());
  const mnistData = new MnistData();
  yield call(mnistData.load);
  const handwritingDigitsClassifier = yield call(trainMnist, mnistData);
  return handwritingDigitsClassifier;
}

function* trainMnist(mnistData) {
  yield put(trainingMnist());
  const handwritingDigitsClassifier = new HWDigitsClassifier();
  handwritingDigitsClassifier.initializeModel(mnistData);
  yield apply(handwritingDigitsClassifier, handwritingDigitsClassifier.train);
  return handwritingDigitsClassifier;
}

function* request(pretrainedHWClassifier) {
  while (true) {
    const action = yield take([
      MnistAction.PREDICT_REQUESTED,
      MnistAction.LOAD_AND_TRAIN_MNIST_REQUESTED
    ]);

    switch (action.type) {
      case MnistAction.PREDICT_REQUESTED:
        yield call(predict, pretrainedHWClassifier, action.image);
        break;
      case MnistAction.LOAD_AND_TRAIN_MNIST_REQUESTED:
        yield put(resetDrawing());
        if (pretrainedHWClassifier.data) {
          pretrainedHWClassifier = yield call(
            trainMnist,
            pretrainedHWClassifier.data
          );
        } else {
          pretrainedHWClassifier = yield call(loadAndTrainMnist);
        }
        yield put(loadAndTrainMnistSucceeded());
        break;
      default:
        break;
    }
  }
}

function* watchMnist() {
  const pretrainedHWClassifier = yield call(loadPretrainedModel);
  yield call(request, pretrainedHWClassifier);
}

export default watchMnist;
