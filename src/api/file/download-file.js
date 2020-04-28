import { fileToUrl } from "@/file";
import {invokeCallbackHandler as invoke} from "@/helper-api";
import * as __uniConfig from "@/config";

/**
 * 下载任务
 */
class DownloadTask {
  constructor (xhr) {
    this._xhr = xhr;
    this._callbacks = [];
  }
  /**
   * 监听下载进度
   * @param {Function} callback 回调
   */
  onProgressUpdate (callback) {
    if (typeof callback !== "function") {
      return;
    }
    this._callbacks.push(callback);
  }
  offProgressUpdate (callback) {
    const index = this._callbacks.indexOf(callback);
    if (index >= 0) {
      this._callbacks.splice(index, 1);
    }
  }
  /**
   * 停止任务
   */
  abort () {
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
}

/**
 * 下载文件
 * @param {*} param0
 * @param {string} callbackId
 * @return {DownloadTask}
 */
export function downloadFile ({
  url,
  header
}, callbackId) {
  let timeout = (__uniConfig.networkTimeout && __uniConfig.networkTimeout.downloadFile) || 60 * 1000;
  let timer;
  let xhr = new XMLHttpRequest();
  let downloadTask = new DownloadTask(xhr);
  xhr.open("GET", url, true);
  Object.keys(header).forEach(key => {
    xhr.setRequestHeader(key, header[key]);
  });
  xhr.responseType = "blob";
  xhr.onload = function () {
    clearTimeout(timer);
    let statusCode = xhr.status;
    let blob = this.response;
    invoke(callbackId, {
      errMsg: "downloadFile:ok",
      statusCode,
      tempFilePath: fileToUrl(blob)
    });
  };
  xhr.onabort = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: "downloadFile:fail abort"
    });
  };
  xhr.onerror = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: "downloadFile:fail"
    });
  };
  xhr.onprogress = function (event) {
    downloadTask._callbacks.forEach(callback => {
      let totalBytesWritten = event.loaded;
      let totalBytesExpectedToWrite = event.total;
      let progress = Math.round(totalBytesWritten / totalBytesExpectedToWrite * 100);
      callback({
        progress,
        totalBytesWritten,
        totalBytesExpectedToWrite
      });
    });
  };
  xhr.send();
  timer = setTimeout(function () {
    xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
    downloadTask.abort();
    invoke(callbackId, {
      errMsg: "downloadFile:fail timeout"
    });
  }, timeout);
  return downloadTask;
}
