const eventList = {};

export function on (eventName, cb) {
  if (!eventList[eventName]) {
    eventList[eventName] = [];
  }
  eventList[eventName].push(cb);
}


export function emit(eventName, param) {
  if (!eventList[eventName]) {
    return;
  } else {
    eventList[eventName].map((cb) => {
      cb(param);
    });
  }
}


export function off(eventName, cb) {
  if (cb) {
    eventList[evntName].filter((callback) => {
      if (callback == cb) {
        return false;
      }
      return true;
    });
  } else {
    eventList[eventName] = [];
  }
}


export function subscribe (event, callback) {
  return on("jsa." + event, callback);
}

export function unsubscribe (event, callback) {
  return off("jsa." + event, callback);
}

export function subscribeHandler (event, args) {
  return emit("jsa." + event, args);
}