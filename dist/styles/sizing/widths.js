"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWidths = void 0;
const sizes_1 = require("./sizes");
const buildWidths = () => {
    const widths = {};
    Object.keys(sizes_1.sizes).forEach((s) => {
        widths[`w-${s}`] = {
            width: sizes_1.sizes[s],
        };
    });
    return widths;
};
exports.buildWidths = buildWidths;
