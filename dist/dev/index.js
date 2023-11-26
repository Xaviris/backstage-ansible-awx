"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var dev_utils_1 = require("@backstage/dev-utils");
var plugin_1 = require("../src/plugin");
(0, dev_utils_1.createDevApp)()
    .registerPlugin(plugin_1.ansibleAwxPlugin)
    .addPage({
    element: react_1.default.createElement(plugin_1.EntityAWXPage, null),
    title: 'Root Page',
    path: '/ansible-awx'
})
    .render();
