"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = void 0;
const react_native_1 = require("react-native");
const mainStyles_1 = require("./mainStyles");
const s = (...classes) => {
    const flattenClasses = classes.reduce((pv, cv) => [...pv, mainStyles_1.mainStyles[cv]], []);
    return react_native_1.StyleSheet.flatten(flattenClasses);
};
exports.s = s;
