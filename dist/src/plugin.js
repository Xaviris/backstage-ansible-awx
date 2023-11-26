"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAWXPage = exports.ansibleAwxPlugin = void 0;
var core_plugin_api_1 = require("@backstage/core-plugin-api");
var routes_1 = require("./routes");
exports.ansibleAwxPlugin = (0, core_plugin_api_1.createPlugin)({
    id: 'ansible-awx',
    routes: {
        root: routes_1.rootRouteRef,
    },
});
exports.EntityAWXPage = exports.ansibleAwxPlugin.provide((0, core_plugin_api_1.createRoutableExtension)({
    name: 'EntityAWXPage',
    component: function () {
        return Promise.resolve().then(function () { return __importStar(require('./components/AnsibleAWXComponent')); }).then(function (m) { return m.EntityAWXContent; });
    },
    mountPoint: routes_1.rootRouteRef,
}));
