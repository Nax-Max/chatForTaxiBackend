"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../Enums/Enums");
var LogEntry = (function () {
    function LogEntry() {
        this.changedObjectID = " ";
        this.changedObjectName = " ";
        this.userID = " ";
        this.userName = " ";
        this.parentID = " ";
        this.parentName = " ";
        this.smoType = Enums_1.SchedulerModelObjectType.None;
        this.fieldName = " ";
        this.newValue = " ";
        this.oldValue = " ";
        this.cudarType = Enums_1.CUDARType.None;
        this.timeStamp = null;
        this.entryType = Enums_1.LogEntryType.Connected;
    }
    LogEntry.prototype.LogEntry = function (userID, userName, type) {
        this.userID = userID;
        this.userName = userName;
        this.entryType = type;
        this.timeStamp = Date.now();
    };
    return LogEntry;
}());
exports.LogEntry = LogEntry;
