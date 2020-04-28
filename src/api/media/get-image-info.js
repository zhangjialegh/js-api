function _getServiceAddress () {
  return window.location.protocol + "//" + window.location.host;
}
import {invokeCallbackHandler as invoke} from "@/helper-api";
export function getImageInfo ({
  src
}, callbackId) {
  const img = new Image();
  const realPath = src;
  img.onload = function () {
    invoke(callbackId, {
      errMsg: "getImageInfo:ok",
      width: img.naturalWidth,
      height: img.naturalHeight,
      path: realPath.indexOf("/") === 0 ? _getServiceAddress() + realPath : realPath
    });
  };
  img.onerror = function (e) {
    invoke(callbackId, {
      errMsg: "getImageInfo:fail"
    });
  };
  img.src = src;
}