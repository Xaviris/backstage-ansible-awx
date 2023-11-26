"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAWXContent = exports.DenseTable = void 0;
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var core_components_1 = require("@backstage/core-components");
var plugin_catalog_react_1 = require("@backstage/plugin-catalog-react");
var CheckCircleOutline_1 = __importDefault(require("@mui/icons-material/CheckCircleOutline"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var ErrorOutline_1 = __importDefault(require("@mui/icons-material/ErrorOutline"));
var RocketLaunch_1 = __importDefault(require("@mui/icons-material/RocketLaunch"));
var useStyles = (0, styles_1.makeStyles)({
    avatar: {
        height: 32,
        width: 32,
        borderRadius: '50%',
    },
});
var DenseTable = function (_a) {
    var _b;
    var templates = _a.templates, onRunJob = _a.onRunJob;
    var classes = useStyles();
    var entity = (0, plugin_catalog_react_1.useEntity)().entity;
    var annotationKey = 'ansible/template-labels';
    var annotationValue = (_b = entity.metadata.annotations) === null || _b === void 0 ? void 0 : _b[annotationKey];
    if (!annotationValue) {
        // Handle the case where the annotation doesn't exist
        return react_1.default.createElement("div", null, "No specific annotation found for this entity.");
    }
    var selectedLabelsArray = annotationValue.split(',').map(function (label) { return label.trim(); });
    var columns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Last Run', field: 'lastRun' },
        { title: 'Status', field: 'status' },
        { title: 'Label', field: 'label' },
        { title: '', field: 'run' },
    ];
    var data = templates
        .filter(function (template) {
        var labelsArray = template["summary_fields"]["labels"]["results"];
        // Check if the labelsArray includes a label that matches selectedLabel
        return labelsArray.some(function (label) { return selectedLabelsArray.includes(label.name); });
    })
        .map(function (template) {
        var labelsArray = template["summary_fields"]["labels"]["results"];
        var labelsString = labelsArray.map(function (label) { return label.name; }).join(', ');
        var statusComponent;
        var date = new Date(template.last_job_run);
        var humanReadableDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        switch (template.status) {
            case 'successful':
                statusComponent = react_1.default.createElement(CheckCircleOutline_1.default, { style: { fontSize: 24 } });
                break;
            case 'error':
                statusComponent = react_1.default.createElement(ErrorOutline_1.default, { style: { fontSize: 24 } });
                break;
            case 'running':
                statusComponent = react_1.default.createElement(CircularProgress_1.default, { size: 24 });
                break;
            default:
                statusComponent = react_1.default.createElement("div", null, template.status);
        }
        return {
            id: template.id,
            description: template.description,
            lastRun: humanReadableDate,
            name: template.name,
            status: statusComponent,
            label: labelsString,
            run: (react_1.default.createElement(RocketLaunch_1.default, { onClick: function () { return onRunJob(String(template.id)); } }))
            // url: (
            //     <a
            //         href={`http://devops.ascentapi.com/#/templates${template.url.replace('/api/v2/job_templates', '/job_template')}details`}
            //         target="_blank"
            //         rel="noopener noreferrer">
            //         Open
            //     </a>
            // )
        };
    });
    return (react_1.default.createElement(core_components_1.Table, { title: "Ansible Job Templates", options: { search: false, paging: false }, columns: columns, data: data }));
};
exports.DenseTable = DenseTable;
var EntityAWXContent = function () {
    var _a = (0, react_1.useState)([]), templates = _a[0], setTemplates = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)({}), intervals = _d[0], setIntervals = _d[1];
    var _e = (0, react_1.useState)({}), runningJobs = _e[0], setRunningJobs = _e[1];
    var templatesRef = (0, react_1.useRef)(templates);
    (0, react_1.useEffect)(function () {
        templatesRef.current = templates;
    }, [templates]);
    function fetchTemplates() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/organizations/2/job_templates/')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log("API Response: ", data);
                        // Assuming data.results contains the array of job templates
                        setTemplates(data.results || []);
                        return [2 /*return*/];
                }
            });
        });
    }
    var handleRunJob = function (id) {
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("Start job", id);
        fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/job_templates/' + id + '/launch/', requestOptions)
            .then(function () {
            fetchTemplates();
            setRunningJobs(function (prevJobs) {
                var _a;
                return (__assign(__assign({}, prevJobs), (_a = {}, _a[id] = true, _a)));
            });
        })
            .catch(function (error) { return console.error("Error launching job", error); });
    };
    // poll for running jobs
    (0, react_1.useEffect)(function () {
        var intervalId = setInterval(function () {
            Object.keys(runningJobs).forEach(function (jobId) { return __awaiter(void 0, void 0, void 0, function () {
                var updatedJobTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!runningJobs[jobId])
                                return [2 /*return*/]; // Skip if the job is no longer running
                            return [4 /*yield*/, fetchTemplates()];
                        case 1:
                            _a.sent();
                            updatedJobTemplate = templatesRef.current.find(function (template) { return template.id.toString() === jobId; });
                            if (updatedJobTemplate && updatedJobTemplate.status === "successful") {
                                console.log("End Loop");
                                setRunningJobs(function (prevJobs) {
                                    var updatedJobs = __assign({}, prevJobs);
                                    delete updatedJobs[jobId];
                                    return updatedJobs;
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }, 500);
        return function () { return clearInterval(intervalId); };
    }, [runningJobs]);
    // const handleRunJob = (id: string) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //     };
    //     console.log("Start job", id);
    //     fetch('http://devops.ascentapi.com:7007/api/proxy/ansible-awx/api/v2/job_templates/' + id + '/launch/', requestOptions)
    //         .then(() => {
    //             const intervalId = setInterval(() => {
    //                 fetchTemplates().then(() => {
    //                     const updatedJobTemplate = templatesRef.current.find(template => template.id.toString() === id);
    //                     if (updatedJobTemplate && updatedJobTemplate.status === "successful") {
    //                         console.log("Stop Interval", updatedJobTemplate);
    //                         clearInterval(intervals[id]);
    //                         setIntervals(prevIntervals => {
    //                             const newIntervals = { ...prevIntervals };
    //                             delete newIntervals[id];
    //                             return newIntervals;
    //                         });
    //                     }
    //                 });
    //             }, 500); // Runs every 500 ms (0.5 seconds)
    //             setIntervals(prevIntervals => ({ ...prevIntervals, [id]: intervalId }));
    //         })
    //         .catch(error => console.error("Error launching job", error));
    // };
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchTemplates()];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Fetching error:', err_1);
                        setError(err_1);
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    // useEffect(() => {
    //     return () => {
    //         Object.values(intervals).forEach(clearInterval);
    //     };
    // }, [intervals]);
    if (loading) {
        return react_1.default.createElement(core_components_1.Progress, null);
    }
    else if (error) {
        return react_1.default.createElement(core_components_1.ResponseErrorPanel, { error: error });
    }
    return react_1.default.createElement(exports.DenseTable, { templates: templates, onRunJob: handleRunJob });
};
exports.EntityAWXContent = EntityAWXContent;
