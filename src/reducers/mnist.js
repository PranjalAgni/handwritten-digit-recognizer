import { MnistAction } from '../actions/mnist';

const initialState = {
  status: MnistAction.INIT,
  retrain: MnistAction.INIT
};

const mnist = (state = initialState, action) => {
  switch (action.type) {
    case MnistAction.LOAD_PRETRAINED_MODEL_SUCCEEDED:
      return {
        ...state,
        status: MnistAction.LOAD_PRETRAINED_MODEL_SUCCEEDED
      };
    case MnistAction.PREDICT_SUCCEEDED:
      return {
        ...state,
        prediction: action.prediction
      };
    case MnistAction.LOADING_MNIST:
    case MnistAction.TRAINING_MNIST:
    case MnistAction.LOAD_AND_TRAIN_MNIST_SUCCEEDED:
      return {
        ...state,
        retrainStatus: action.type
      };
    default:
      return state;
  }
};

export default mnist;
