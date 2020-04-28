export const getImageInfo = {
  "src": {
    type: String,
    required: true,
    validator (src, params) {
      params.src = src;
    }
  }
};
