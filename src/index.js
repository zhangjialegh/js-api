import {
  wrapper
} from "@/helper-api";


const baseApi = Object.create(null);
const modules = require.context("@/api", true, /\.js$/);
modules.keys().forEach(function (key) {
  Object.assign(baseApi, modules(key));
});

const jsa = Object.create(null);

/* eslint-disable no-undef */
jsa.version = "0.0.1";

Object.keys(baseApi).forEach(name => {
  jsa[name] = wrapper(name, baseApi[name]);
});

export {
  jsa
};

// ;(function () {
//   "use strict";

//   const WIN = typeof window === "object";
//   if (!WIN) throw Error("window is not defined.");
//   const COMMON_JS = typeof module === "object" && module.exports;
//   const AMD = typeof define === "function" && define.amd;

//   if (COMMON_JS) {
//     module.exports = jsa;
//   } else {
//     this.JsApi = jsa;
//     if (AMD) {
//       define(function () {
//         return jsa;
//       });
//     }
//   }
// }).call(this || (typeof window !== "undefined" ? window : global));