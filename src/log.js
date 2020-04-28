function getInt (method) {
  return function (value, params) {
    if (value) {
      params[method] = Math.round(value);
    }
  };
}

export const canvasGetImageData = {
  canvasId: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true,
    validator: getInt("x")
  },
  y: {
    type: Number,
    required: true,
    validator: getInt("y")
  },
  width: {
    type: Number,
    required: true,
    validator: getInt("width")
  },
  height: {
    type: Number,
    required: true,
    validator: getInt("height")
  }
};

export const base64ToArrayBuffer = [{
  name: "base64",
  type: String,
  required: true
}];

export const arrayBufferToBase64 = [{
  name: "arrayBuffer",
  type: [ArrayBuffer, Uint8Array],
  required: true
}];

const SOURCE_TYPES = ["album", "camera"];

export const chooseVideo = {
  "sourceType": {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator (sourceType, params) {
      const length = sourceType.length;
      if (!length) {
        params.sourceType = SOURCE_TYPES;
      } else {
        for (let i = 0; i < length; i++) {
          if (typeof sourceType[i] !== "string" || !~SOURCE_TYPES.indexOf(sourceType[i])) {
            params.sourceType = SOURCE_TYPES;
            break;
          }
        }
      }
    }
  }
};
