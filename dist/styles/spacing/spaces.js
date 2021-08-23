"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSpaces = exports.spaces = void 0;
exports.spaces = {
    0: 0,
    0.25: 1,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
};
const mergeSpaces = (customSpaces) => {
    return Object.assign(Object.assign({}, exports.spaces), customSpaces);
};
exports.mergeSpaces = mergeSpaces;