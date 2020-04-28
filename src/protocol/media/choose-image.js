const SIZE_TYPES = ["original", "compressed"];
const SOURCE_TYPES = ["album", "camera"];

export const chooseImage = {
  "count": {
    type: Number,
    required: false,
    default: 9,
    validator (count, params) {
      if (count <= 0) {
        params.count = 9;
      }
    }
  },
  "quality": {
    type: Number,
    required: false,
    default: 1,
    validator (quality, params) {
      if (quality <= 0 || quality >= 1 ) {
        params.quality = 1;
      }
    }
  },
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
