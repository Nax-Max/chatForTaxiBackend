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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var azurestorage = require("azure-storage");
var fs = require("fs");
var LogCounterCollection_1 = require("../models/LogCounterCollection");
var _ = require("underscore");
var UserLogData_1 = require("../models/UserLogData");
var BlobManager = (function () {
    function BlobManager() {
        this.storageAccount = "jpistorage";
        this.storageAccessKey = "kH+MYtr3Tx5RCCQOkmleGmjrnudUh2suVaPnsLQgsVnE+My0PaKWVSPK1pse/V4MQxG2WBUF/cRkdW+GPWf1sw==";
        this.blobService = azurestorage.createBlobService(this.storageAccount, this.storageAccessKey);
    }
    BlobManager.prototype.getCommandsCollection = function (startDate, endDate, customersCollection) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var userDataCollection, promises, i, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        userDataCollection = new LogCounterCollection_1.UserDataCollection();
                                        promises = [];
                                        _c.label = 1;
                                    case 1:
                                        if (!(startDate <= endDate)) return [3 /*break*/, 6];
                                        i = 0;
                                        _c.label = 2;
                                    case 2:
                                        if (!(i <= customersCollection.customers.length)) return [3 /*break*/, 5];
                                        if (!(customersCollection && customersCollection.customers[i] && customersCollection.customers[i].partitionKey)) return [3 /*break*/, 4];
                                        _b = (_a = promises).push;
                                        return [4 /*yield*/, this.getContainerCommandsCollection(userDataCollection, customersCollection.customers[i], startDate, endDate)];
                                    case 3:
                                        _b.apply(_a, [_c.sent()]);
                                        _c.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        startDate.setDate(startDate.getDate() + 1);
                                        return [3 /*break*/, 1];
                                    case 6:
                                        Promise.all(promises).then(function (values) {
                                            var groupedByCustomer = _.groupBy(userDataCollection.userDatas, function (userLog) {
                                                return userLog.customer;
                                            });
                                            var userLogDatas = [];
                                            Object.keys(groupedByCustomer).forEach(function (key) {
                                                var groupedUser = _.groupBy(groupedByCustomer[key], function (userLog) {
                                                    return userLog.userName;
                                                });
                                                Object.keys(groupedUser).forEach(function (userKey) {
                                                    var userLogData = new UserLogData_1.UserLogData();
                                                    userLogData.customerName = key;
                                                    userLogData.userName = userKey;
                                                    groupedUser[userKey].forEach(function (logDatas) {
                                                        userLogData.logDatas.push(logDatas);
                                                    });
                                                    userLogDatas.push(userLogData);
                                                });
                                            });
                                            console.log("Promises: " + values.length);
                                            resolve(userLogDatas);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (error) {
                            console.log(error);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlobManager.prototype.getContainerCommandsCollection = function (userDataCollection, customer, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var lzString = eval(fs.readFileSync('libs/lz-string.min.js') + '');
                            _this.blobService.getBlobToText(customer.partitionKey, 'Log/' + _this.parseDateToString(startDate), function (error, serverBlob) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!serverBlob) return [3 /*break*/, 2];
                                            console.log(customer.name);
                                            console.log(customer.partitionKey);
                                            return [4 /*yield*/, serverBlob.split("TRENNMICHHIER").filter(function (blob) {
                                                    return blob !== "";
                                                }).forEach(function (blob) { return __awaiter(_this, void 0, void 0, function () {
                                                    var userData;
                                                    return __generator(this, function (_a) {
                                                        userData = new LogCounterCollection_1.UserData();
                                                        //console.log(JSON.parse(lzString.decompressFromUTF16(blob)));
                                                        userData.changedObjectID = JSON.parse(lzString.decompressFromUTF16(blob)).changedObjectID;
                                                        userData.entryType = JSON.parse(lzString.decompressFromUTF16(blob)).entryType;
                                                        userData.timeStamp = JSON.parse(lzString.decompressFromUTF16(blob)).timeStamp;
                                                        userData.cudarType = JSON.parse(lzString.decompressFromUTF16(blob)).cudarType;
                                                        userData.oldValue = JSON.parse(lzString.decompressFromUTF16(blob)).oldValue;
                                                        userData.newValue = JSON.parse(lzString.decompressFromUTF16(blob)).newValue;
                                                        userData.fieldName = JSON.parse(lzString.decompressFromUTF16(blob)).fieldName;
                                                        userData.smoType = JSON.parse(lzString.decompressFromUTF16(blob)).smoType;
                                                        userData.parentName = JSON.parse(lzString.decompressFromUTF16(blob)).parentName;
                                                        userData.userName = JSON.parse(lzString.decompressFromUTF16(blob)).userName;
                                                        userData.userID = JSON.parse(lzString.decompressFromUTF16(blob)).userID;
                                                        userData.changedObjectName = JSON.parse(lzString.decompressFromUTF16(blob)).changedObjectName;
                                                        userData.customer = customer.name;
                                                        userDataCollection.userDatas.push(userData);
                                                        userDataCollection.count++;
                                                        return [2 /*return*/];
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            resolve(userDataCollection);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            reject(error);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }).catch(function (error) {
                            //console.log(error);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlobManager.prototype.parseDateToString = function (date) {
        var result = date.getFullYear() + "-";
        if (date.getMonth() < 10)
            result += "0" + date.getMonth() + "-";
        else
            result += date.getMonth() + "-";
        if (date.getDay() < 10)
            result += "0" + date.getDay();
        else
            result += date.getDay();
        return result;
    };
    return BlobManager;
}());
exports.BlobManager = BlobManager;
// this.blobService.listContainersSegmented(null, async (err, result) => {
//     if (err) {
//         console.log("Couldn't list containers");
//         console.error(err);
//     } else {
//         for (; startDate <= endDate; startDate.setDate(startDate.getDate() + 1)) {
//             for (let i = 0; i <= result.entries.length; i++) {
//                 if (result.entries[i]) {
//                     // console.log(result.entries[i]);
//                     promises.push(await this.getContainerCommandsCollection(userDataCollection, result.entries[i].name, startDate, endDate));
//                 }
//             }
//         }
//
//         Promise.all(promises).then(values => {
//             console.log("Promises: " + values.length);
//             resolve(userDataCollection);
//         });
//     }
//
// }); 
