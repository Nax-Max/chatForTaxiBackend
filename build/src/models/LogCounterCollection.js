"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogCounterCollection = (function () {
    function LogCounterCollection() {
        this.connected = 0;
        this.disconnected = 0;
        this.reconnected = 0;
        this.uploadSucceded = 0;
        this.uploadFailed = 0;
        this.create = 0;
        this.update = 0;
        this.delete = 0;
        this.add = 0;
        this.remove = 0;
        this.copy = 0;
        this.max = 0;
    }
    return LogCounterCollection;
}());
exports.LogCounterCollection = LogCounterCollection;
var UserDataCollection = (function () {
    function UserDataCollection() {
        this.userDatas = [];
        this.count = 0;
    }
    return UserDataCollection;
}());
exports.UserDataCollection = UserDataCollection;
var UserData = (function () {
    function UserData() {
    }
    return UserData;
}());
exports.UserData = UserData;
