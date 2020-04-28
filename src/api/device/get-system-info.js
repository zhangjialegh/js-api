
import safeAreaInsets from "safe-area-insets";
let NAVBAR_HEIGHT = 0;
let TABBAR_HEIGHT = 0;

const ua = navigator.userAgent;
/**
 * 是否安卓设备
 */
const isAndroid = /android/i.test(ua);
/**
 * 是否iOS设备
 */
const isIOS = /iphone|ipad|ipod/i.test(ua);
const hasOwnProperty = Object.prototype.hasOwnProperty;

const platformSchema = {
  "css.var": window.CSS && window.CSS.supports && window.CSS.supports("--a", 0)
};

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key);
}
function canIUse (schema) {
  if (hasOwn(platformSchema, schema)) {
    return platformSchema[schema];
  }
  return true;
}


function getWindowOffset () {
  if (canIUse("css.var")) {
    const style = document.documentElement.style;
    return {
      top: parseInt(style.getPropertyValue("--window-top")) || 0,
      bottom: parseInt(style.getPropertyValue("--window-bottom")) || 0
    };
  }

  let top = NAVBAR_HEIGHT;
  let bottom = TABBAR_HEIGHT;
  return {
    top,
    bottom
  };
}



/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync () {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let screen = window.screen;
  let pixelRatio = window.devicePixelRatio;
  let screenWidth = screen.width;
  let screenHeight = screen.height;
  let language = navigator.language;
  let statusBarHeight = 0;
  let osname;
  let osversion;
  let model;

  if (isIOS) {
    osname = "iOS";
    let osversionFind = ua.match(/OS\s([\w_]+)\slike/);
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, ".");
    }
    let modelFind = ua.match(/\(([a-zA-Z]+);/);
    if (modelFind) {
      model = modelFind[1];
    }
  } else if (isAndroid) {
    osname = "Android";
    // eslint-disable-next-line no-useless-escape
    let osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/);
    if (osversionFind) {
      osversion = osversionFind[1];
    }
    let infoFind = ua.match(/\((.+?)\)/);
    let infos = infoFind ? infoFind[1].split(";") : ua.split(" ");
    // eslint-disable-next-line no-useless-escape
    const otherInfo = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i, /\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      if (info.indexOf("Build") > 0) {
        model = info.split("Build")[0].trim();
        break;
      }
      let other;
      for (let o = 0; o < otherInfo.length; o++) {
        if (otherInfo[o].test(info)) {
          other = true;
          break;
        }
      }
      if (!other) {
        model = info.trim();
        break;
      }
    }
  } else {
    osname = "Other";
    osversion = "0";
  }

  let system = `${osname} ${osversion}`;
  let platform = osname.toLocaleLowerCase();
  let safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeight - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom
  };

  const {
    top: windowTop,
    bottom: windowBottom
  } = getWindowOffset(false, true);

  windowHeight -= windowTop;
  windowHeight -= windowBottom;

  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio,
    screenWidth,
    screenHeight,
    language,
    statusBarHeight,
    system,
    platform,
    model,
    safeArea
  };
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo () {
  return getSystemInfoSync();
}
