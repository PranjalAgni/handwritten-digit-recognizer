export const PipelineAction = {
  START_PREDICTION: 'START_PREDICTION'
};

export const startPrediction = (image) => ({
  type: PipelineAction.START_PREDICTION,
  image
});
