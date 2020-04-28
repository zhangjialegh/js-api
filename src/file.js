/**
 * 暂存的文件对象
 */
const files = {};
/**
 * 从url读取File
 * @param {string} url
 * @param {Promise}
 */
export function urlToFile (url) {
  let file = files[url];
  if (file) {
    return Promise.resolve(file);
  }
  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(urls)) {
    return Promise.resolve(base64ToFile(url));
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
/**
 * base64转File
 * @param {string} base64
 * @return {File}
 */
export function base64ToFile (base64) {
  base64 = base64.split(",");
  let type = base64[0].match(/:(.*?);/)[1];
  let str = atob(base64[1]);
  let n = str.length;
  let array = new Uint8Array(n);
  while (n--) {
    array[n] = str.charCodeAt(n);
  }
  let filename = `${Date.now()}.${type.split("/")[1]}`;
  return new File([array], filename, { type: type });
}
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} file
 * @return {string}
 */
export function fileToUrl (file) {
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const oldFile = files[key];
      if (oldFile === file) {
        return key;
      }
    }
  }
  let url = (window.URL || window.webkitURL).createObjectURL(file);
  files[url] = file;
  return url;
}

export function getTransform(image, orientation) {
  let { width, height } = image;

  switch (orientation) {
    case 1:
      // default
      return {
          width, height,
          matrix: [1, 0, 0, 1, 0, 0]
      };
    case 2:
      // horizontal flip
      return {
          width, height,
          matrix: [-1, 0, 0, 1, width, 0]
      };
    case 3:
      // 180° rotated
      return {
          width, height,
          matrix: [-1, 0, 0, -1, width, height]
      };
    case 4:
      // vertical flip
      return {
          width, height,
          matrix: [1, 0, 0, -1, 0, height]
      };
    case 5:
      // vertical flip + -90° rotated
      return {
        width: height,
        height: width,
        matrix: [0, 1, 1, 0, 0, 0]
      };
    case 6:
      // -90° rotated
      return {
          width: height,
          height: width,
          matrix: [0, 1, -1, 0, height, 0]
        };
    case 7:
      // horizontal flip + -90° rotate
      return {
          width: height,
          height: width,
          matrix: [0, -1, -1, 0, height, width]
      };
    case 8:
      // 90° rotated
      return {
          width: height,
          height: width,
          matrix: [0, -1, 1, 0, 0, width]
        };
  }
}
