"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainStyles = void 0;
const margins_1 = require("../styles/spacing/margins");
const composeStyles = (...styles) => {
    const composedStyles = styles.reduce((pv, cv) => (Object.assign(Object.assign({}, pv), cv)), {});
    return composedStyles;
};
exports.mainStyles = composeStyles(margins_1.buildMargins());
