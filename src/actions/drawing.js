export const StrokeAction = {
  ADD_STORKE: 'ADD_STORKE',
  ADD_STORKE_POS: 'ADD_STORKE_POS',
  END_STROKE: 'END_STROKE',
  RESET_DRAWING: 'RESET_DRAWING'
};

export const addStroke = pos => ({
  type: StrokeAction.ADD_STORKE,
  pos
});

export const addStrokePos = pos => ({
  type: StrokeAction.ADD_STORKE_POS,
  pos
});

export const endStroke = () => ({
  type: StrokeAction.END_STROKE
});

export const resetDrawing = () => ({
  type: StrokeAction.RESET_DRAWING
});
