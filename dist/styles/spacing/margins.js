"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMargins = void 0;
const positions_1 = require("./positions");
const spaces_1 = require("./spaces");
const marginPositionsPair = {
    '': 'margin',
    b: 'marginBottom',
    t: 'marginTop',
    l: 'marginLeft',
    r: 'marginRight',
    x: 'marginHorizontal',
    y: 'marginVertical',
};
const buildMargins = () => {
    const margins = {};
    positions_1.positions.forEach((p) => {
        Object.keys(spaces_1.spaces).forEach((s) => {
            margins[`m${p}-${s}`] = {
                [marginPositionsPair[p]]: spaces_1.spaces[s],
            };
        });
    });
    return margins;
};
exports.buildMargins = buildMargins;
