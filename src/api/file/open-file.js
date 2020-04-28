/**
 * 打开文档
 * @param {*} param0
 * @param {*} callbackId
 */
import {invokeCallbackHandler as invoke} from "@/helper-api";
export function openDocument ({
  filePath
}, callbackId) {
  window.open(filePath);
  invoke(callbackId, {
    errMsg: "openDocument:ok"
  });
}
