"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("./plugin");
describe('ansible-awx', function () {
    it('should export plugin', function () {
        expect(plugin_1.ansibleAwxPlugin).toBeDefined();
    });
});
