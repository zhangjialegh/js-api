/**
 * 请求任务类
 */
import {invokeCallbackHandler as invoke} from "@/helper-api";
import * as __uniConfig from "@/config";
class RequestTask {
  constructor (xhr) {
    this._xhr = xhr;
  }
  abort () {
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
}

/**
 * 解析响应头
 * @param {string} headers
 * @return {object}
 */
function parseHeaders (headers) {
  let headersObject = {};
  let headersArray = headers.split("\n");
  headersArray.forEach(header => {
    let find = header.match(/(\S+\s*):\s*(.*)/);
    if (!find || find.length !== 3) {
      return;
    }
    let key = find[1];
    let val = find[2];
    headersObject[key] = val;
  });
  return headersObject;
}
/**
 * 发起网络请求
 * @param {object} param0
 * @param {string} callbackId
 * @return {RequestTask}
 */
export function request ({
  url,
  data,
  header,
  method,
  dataType,
  responseType
}, callbackId) {
  let body = null;
  let timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.request) || 60 * 1000;
  // 根据请求类型处理数据
  let contentType;
  for (const key in header) {
    if (header.hasOwnProperty(key)) {
      if (key.toLowerCase() === "content-type") {
        contentType = header[key];
        if (contentType.indexOf("application/json") === 0) {
          contentType = "json";
        } else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) {
          contentType = "urlencoded";
        } else {
          contentType = "string";
        }
        break;
      }
    }
  }
  if (method !== "GET") {
    if (typeof data === "string" || data instanceof ArrayBuffer) {
      body = data;
    } else {
      if (contentType === "json") {
        try {
          body = JSON.stringify(data);
        } catch (error) {
          body = data.toString();
        }
      } else if (contentType === "urlencoded") {
        let bodyArray = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            bodyArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
          }
        }
        body = bodyArray.join("&");
      } else {
        body = data.toString();
      }
    }
  }
  let xhr = new XMLHttpRequest();
  let requestTask = new RequestTask(xhr);
  xhr.open(method, url);
  for (let key in header) {
    if (header.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, header[key]);
    }
  }

  let timer = setTimeout(function () {
    xhr.onload = xhr.onabort = xhr.onerror = null;
    requestTask.abort();
    invoke(callbackId, {
      errMsg: "request:fail timeout"
    });
  }, timeout);
  xhr.responseType = responseType;
  xhr.onload = function () {
    clearTimeout(timer);
    let statusCode = xhr.status;
    let res = responseType === "text" ? xhr.responseText : xhr.response;
    if (responseType === "text" && dataType === "json") {
      try {
        res = JSON.parse(res);
      } catch (error) {
        // 和微信一致解析失败不抛出错误
        // invoke(callbackId, {
        //   errMsg: 'request:fail json parse error'
        // })
        // return
      }
    }
    invoke(callbackId, {
      data: res,
      statusCode,
      header: parseHeaders(xhr.getAllResponseHeaders()),
      errMsg: "request:ok"
    });
  };
  xhr.onabort = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: "request:fail abort"
    });
  };
  xhr.onerror = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: "request:fail"
    });
  };
  xhr.send(body);
  return requestTask;
}
