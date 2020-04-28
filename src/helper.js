
export function invokeCallbackHandler (invokeCallbackId, res) {
  if (typeof invokeCallbackId === "number") {
    const invokeCallback = invokeCallbacks[invokeCallbackId];
    if (invokeCallback) {
      if (!invokeCallback.keepAlive) {
        delete invokeCallbacks[invokeCallbackId];
      }
      return invokeCallback.callback(res);
    }
  }
  return res;
}