"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFlex = void 0;
const align_content_1 = require("./align-content");
const align_items_1 = require("./align-items");
const align_self_1 = require("./align-self");
const flex_1 = require("./flex");
const flex_direction_1 = require("./flex-direction");
const flex_grow_1 = require("./flex-grow");
const flex_shrink_1 = require("./flex-shrink");
const flex_wrap_1 = require("./flex-wrap");
const justify_content_1 = require("./justify-content");
const buildFlex = () => {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, align_items_1.alignItems), align_content_1.alignContent), align_self_1.alignSelf), flex_1.flex), flex_direction_1.flexDirections), flex_grow_1.flexGrow), flex_shrink_1.flexShrink), flex_wrap_1.flexWrap), justify_content_1.justifyContent);
};
exports.buildFlex = buildFlex;
