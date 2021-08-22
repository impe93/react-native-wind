"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaddings = void 0;
const positions_1 = require("./positions");
const spaces_1 = require("./spaces");
const paddingPositionsPair = {
    '': 'padding',
    b: 'paddingBottom',
    t: 'paddingTop',
    l: 'paddingLeft',
    r: 'paddingRight',
    x: 'paddingHorizontal',
    y: 'paddingVertical',
};
const buildPaddings = () => {
    const paddings = {};
    positions_1.positions.forEach((p) => {
        Object.keys(spaces_1.spaces).forEach((s) => {
            paddings[`p${p}-${s}`] = {
                [paddingPositionsPair[p]]: spaces_1.spaces[s],
            };
        });
    });
    return paddings;
};
exports.buildPaddings = buildPaddings;
