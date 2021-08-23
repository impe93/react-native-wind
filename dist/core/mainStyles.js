"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainStyles = void 0;
const heights_1 = require("../styles/sizing/heights");
const widths_1 = require("../styles/sizing/widths");
const margins_1 = require("../styles/spacing/margins");
const paddings_1 = require("../styles/spacing/paddings");
const composeStyles = (...styles) => {
    const composedStyles = styles.reduce((pv, cv) => (Object.assign(Object.assign({}, pv), cv)), {});
    return composedStyles;
};
exports.mainStyles = composeStyles(margins_1.buildMargins(), paddings_1.buildPaddings(), heights_1.buildHeights(), widths_1.buildWidths());
