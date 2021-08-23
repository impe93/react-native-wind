"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHeights = void 0;
const sizes_1 = require("./sizes");
const buildHeights = () => {
    const heights = {};
    Object.keys(sizes_1.sizes).forEach((s) => {
        heights[`h-${s}`] = {
            height: sizes_1.sizes[s],
        };
    });
    return heights;
};
exports.buildHeights = buildHeights;
