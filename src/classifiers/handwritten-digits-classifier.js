import * as tf from '@tensorflow/tfjs';
export default class HWDigitsClassifier {
  static TRAIN_BATCHES = 150;
  static BATCH_SIZE = 64;
  static TEST_ITERATION_FREQUENCY = 5;
  static TEST_BATCH_SIZE = 1000;
  static LEARNING_RATE = 0.15;
  static CLASSIFIER_FOLDER = 'classifiers';
  static CLASSIFIER_NAME = 'model';

  initializeModel(data) {
    this.data = data;
    this.model = tf.sequential();

    // defining model architecture
    /**
     * inputShape -- shape of the data that will flow into the first layer of the model
     *
     * kernelSize --  size of the sliding convolutional filter windows to be applied to the input data.
     *
     * filters -- The number of filter windows of size kernelSize to apply to the input data
     *
     * strides -- The "step size" of the sliding window
     *
     * activation -- The activation function to apply to the data after the convolution is complete
     *
     * kernelInitializer --  The method to use for randomly initializing the model weights
     */
    this.model.add(
      tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      })
    );

    this.model.add(
      tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] })
    );

    this.model.add(
      tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      })
    );

    this.model.add(
      tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] })
    );

    this.model.add(tf.layers.flatten());

    this.model.add(
      tf.layers.dense({
        units: 10,
        kernelInitializer: 'varianceScaling',
        activation: 'softmax'
      })
    );

    this.compile();
  }

  compile() {
    const optimizer = tf.train.sgd(HWDigitsClassifier.LEARNING_RATE);

    this.model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  getTrainBatch(i) {
    const batch = this.data.nextTrainBatch(HWDigitsClassifier.BATCH_SIZE);
    batch.xs = batch.xs.reshape([HWDigitsClassifier.BATCH_SIZE, 28, 28, 1]);

    let validationData;
    if (i % HWDigitsClassifier.TEST_ITERATION_FREQUENCY === 0) {
      const testBatch = this.data.nextTrainBatch(
        HWDigitsClassifier.TEST_BATCH_SIZE
      );

      validationData = [
        testBatch.xs.reshape([HWDigitsClassifier.TEST_BATCH_SIZE, 28, 28, 1]),
        testBatch.labels
      ];
    }

    return [batch, validationData];
  }

  *loadModel() {
    const { host, protocol } = window.location;
    this.model = yield tf.loadLayersModel(
      `${protocol}//${host}/${HWDigitsClassifier.CLASSIFIER_FOLDER}/${HWDigitsClassifier.CLASSIFIER_NAME}.json`
    );

    this.compile();
  }

  *train(save = false) {
    for (let i = 0; i < HWDigitsClassifier.TRAIN_BATCHES; i += 1) {
      const [batch, validationData] = tf.tidy(() => this.getTrainBatch(i));

      yield this.model.fit(batch.xs, batch.labels, {
        batchSize: HWDigitsClassifier.BATCH_SIZE,
        validationData,
        epochs: 1
      });

      tf.dispose([batch, validationData]);

      yield tf.nextFrame();
    }

    if (save) {
      yield this.model.save(
        `downloads://${HWDigitsClassifier.CLASSIFIER_NAME}`
      );
    }
  }

  predict(dataTensor) {
    return tf.tidy(() => {
      const output = this.model.predict(dataTensor);
      const axis = 1;
      const predictions = Array.from(output.argMax(axis).dataSync());
      return predictions[0];
    });
  }
}
