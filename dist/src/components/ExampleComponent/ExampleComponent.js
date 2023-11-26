"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleComponent = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var core_components_1 = require("@backstage/core-components");
var ExampleFetchComponent_1 = require("../ExampleFetchComponent");
var ExampleComponent = function () { return (react_1.default.createElement(core_components_1.Page, { themeId: "tool" },
    react_1.default.createElement(core_components_1.Header, { title: "Welcome to ansible-awx!", subtitle: "Optional subtitle" },
        react_1.default.createElement(core_components_1.HeaderLabel, { label: "Owner", value: "Team X" }),
        react_1.default.createElement(core_components_1.HeaderLabel, { label: "Lifecycle", value: "Alpha" })),
    react_1.default.createElement(core_components_1.Content, null,
        react_1.default.createElement(core_components_1.ContentHeader, { title: "Plugin title" },
            react_1.default.createElement(core_components_1.SupportButton, null, "A description of your plugin goes here.")),
        react_1.default.createElement(core_1.Grid, { container: true, spacing: 3, direction: "column" },
            react_1.default.createElement(core_1.Grid, { item: true },
                react_1.default.createElement(core_components_1.InfoCard, { title: "Information card" },
                    react_1.default.createElement(core_1.Typography, { variant: "body1" }, "All content should be wrapped in a card like this."))),
            react_1.default.createElement(core_1.Grid, { item: true },
                react_1.default.createElement(ExampleFetchComponent_1.ExampleFetchComponent, null)))))); };
exports.ExampleComponent = ExampleComponent;
