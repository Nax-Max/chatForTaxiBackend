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
var azurestorage = require("azure-storage");
var fs = require("fs");
var LogCounterCollection_1 = require("./LogCounterCollection");
var BlobWorker = (function () {
    function BlobWorker() {
        this.storageAccount = "jpistorage";
        this.storageAccessKey = "kH+MYtr3Tx5RCCQOkmleGmjrnudUh2suVaPnsLQgsVnE+My0PaKWVSPK1pse/V4MQxG2WBUF/cRkdW+GPWf1sw==";
        this.blobService = azurestorage.createBlobService(this.storageAccount, this.storageAccessKey);
    }
    BlobWorker.prototype.getCommandsCollection = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var userDataCollection, promises;
                            return __generator(this, function (_a) {
                                userDataCollection = new LogCounterCollection_1.UserDataCollection();
                                promises = [];
                                this.blobService.listContainersSegmented(null, function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                    var i, _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                if (!err) return [3 /*break*/, 1];
                                                console.log("Couldn't list containers");
                                                console.error(err);
                                                return [3 /*break*/, 7];
                                            case 1:
                                                if (!(startDate <= endDate)) return [3 /*break*/, 6];
                                                i = 0;
                                                _d.label = 2;
                                            case 2:
                                                if (!(i <= result.entries.length)) return [3 /*break*/, 5];
                                                if (!result.entries[i]) return [3 /*break*/, 4];
                                                // console.log(result.entries[i]);
                                                _b = (_a = promises).push;
                                                return [4 /*yield*/, this.getContainerCommandsCollection(userDataCollection, result.entries[i].name, startDate, endDate)];
                                            case 3:
                                                // console.log(result.entries[i]);
                                                _b.apply(_a, [_d.sent()]);
                                                _d.label = 4;
                                            case 4:
                                                i++;
                                                return [3 /*break*/, 2];
                                            case 5:
                                                startDate.setDate(startDate.getDate() + 1);
                                                return [3 /*break*/, 1];
                                            case 6:
                                                Promise.all(promises)
                                                    .then(function (values) {
                                                    console.log("Promises: " + values.length);
                                                    resolve(userDataCollection);
                                                });
                                                _d.label = 7;
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); }).catch(function (error) {
                            console.log(error);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlobWorker.prototype.getContainerCommandsCollection = function (userDataCollection, containerName, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var lzString = eval(fs.readFileSync('libs/lz-string.min.js') + '');
                            _this.blobService.getBlobToText(containerName, 'Log/' + _this.parseDateToString(startDate), function (error, serverBlob) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!serverBlob) return [3 /*break*/, 2];
                                            return [4 /*yield*/, serverBlob.split("TRENNMICHHIER").filter(function (blob) {
                                                    return blob !== "";
                                                }).forEach(function (blob) { return __awaiter(_this, void 0, void 0, function () {
                                                    var userData;
                                                    return __generator(this, function (_a) {
                                                        userData = new LogCounterCollection_1.UserData();
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
    BlobWorker.prototype.parseDateToString = function (date) {
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
    return BlobWorker;
}());
exports.BlobWorker = BlobWorker;
