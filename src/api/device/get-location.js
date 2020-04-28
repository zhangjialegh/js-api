import {
  getJSONP
} from "@/get-jsonp";
import * as __uniConfig from "@/config";
import {invokeCallbackHandler as invoke} from "@/helper-api";
/**
 * wgs84坐标转Gcj02坐标
 * @param {object} coords
 * @param {Function} success
 * @param {Function} error
 */
function wgs84ToGcj02 (coords, success, error) {
  /**
   * uniapp 内置key
   */
  let key = __uniConfig.qqMapKey;
  let url =
    `https://apis.map.qq.com/ws/coord/v1/translate?locations=${coords.latitude},${coords.longitude}&type=1&key=${key}&output=jsonp`;
  getJSONP(url, {}, (res) => {
    if ("locations" in res && res.locations.length) {
      success({
        longitude: res.locations[0].lng,
        latitude: res.locations[0].lat
      });
    } else {
      error(res);
    }
  }, error);
}
/**
 * 获取定位信息
 * @param {*} param0
 * @param {*} callbackId
 */
export function getLocation ({
  type,
  altitude
}, callbackId) {

  function callback (coords) {
    invoke(callbackId, Object.assign(coords, {
      errMsg: "getLocation:ok",
      verticalAccuracy: coords.altitudeAccuracy || 0,
      // 无专门水平精度，使用位置精度替代
      horizontalAccuracy: coords.accuracy
    }));
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;
      if (type === "WGS84") {
        callback(coords);
      } else {
        wgs84ToGcj02(coords, callback, (err) => {
          invoke(callbackId, {
            errMsg: "getLocation:fail " + JSON.stringify(err)
          });
        });
      }
    }, () => {
      invoke(callbackId, {
        errMsg: "getLocation:fail"
      });
    }, {
      enableHighAccuracy: altitude,
      timeout: 1000 * 60 * 5
    });
  } else {
    invoke(callbackId, {
      errMsg: "getLocation:fail device nonsupport geolocation"
    });
  }
}
