"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var BlobWorker_1 = require("../models/BlobWorker");
// Creates and configures an ExpressJS web server.
var LogController = (function () {
    //Run configuration methods on the Express instance.
    function LogController() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    LogController.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    // Configure API endpoints.
    LogController.prototype.routes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logs, router;
            return __generator(this, function (_a) {
                logs = new BlobWorker_1.BlobWorker();
                router = express.Router();
                // placeholder route handler
                router.get('/blob', function (req, res, next) {
                    console.log("1");
                    // let logPromise = logs.getLogs();
                    logs.getLogs("slashmsublob", "Vcp8kH/DGSmrbcZGW4+tX7gGZ+lf6O+g1OBr7Yzupa9mDncxLjs273maIh4hBgXDo/FLDAZ6ArAOVt8QJ6vwoQ==").then(function (logs) {
                        console.log("!");
                        res.json(logs);
                        console.log("5");
                    });
                    // console.log(logPromise);
                    //
                    //
                    // Promise.all([logPromise]);
                    // res.json(logPromise);
                });
                router.get('/blob-entry-type-collection', function (req, res, next) {
                    // let logPromise = logs.getLogs();
                    logs.getCommandsCollection("slashmsublob", "Vcp8kH/DGSmrbcZGW4+tX7gGZ+lf6O+g1OBr7Yzupa9mDncxLjs273maIh4hBgXDo/FLDAZ6ArAOVt8QJ6vwoQ==").then(function (entryTypeCollection) {
                        res.json(entryTypeCollection);
                        console.log("5");
                    });
                    // console.log(logPromise);
                    //
                    //
                    // Promise.all([logPromise]);
                    // res.json(logPromise);
                });
                this.express.use('/', router);
                return [2 /*return*/];
            });
        });
    };
    return LogController;
}());
exports.default = new LogController().express;
