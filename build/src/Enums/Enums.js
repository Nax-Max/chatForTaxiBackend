"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CUDARType;
(function (CUDARType) {
    CUDARType[CUDARType["Create"] = 0] = "Create";
    CUDARType[CUDARType["Update"] = 1] = "Update";
    CUDARType[CUDARType["Delete"] = 2] = "Delete";
    CUDARType[CUDARType["Add"] = 3] = "Add";
    CUDARType[CUDARType["Remove"] = 4] = "Remove";
    CUDARType[CUDARType["Copy"] = 5] = "Copy";
    CUDARType[CUDARType["None"] = 6] = "None";
})(CUDARType = exports.CUDARType || (exports.CUDARType = {}));
var SchedulerModelObjectType;
(function (SchedulerModelObjectType) {
    SchedulerModelObjectType[SchedulerModelObjectType["SchedulingModel"] = 0] = "SchedulingModel";
    SchedulerModelObjectType[SchedulerModelObjectType["ResourceCalendar"] = 1] = "ResourceCalendar";
    SchedulerModelObjectType[SchedulerModelObjectType["DayPattern"] = 2] = "DayPattern";
    SchedulerModelObjectType[SchedulerModelObjectType["Resource"] = 3] = "Resource";
    SchedulerModelObjectType[SchedulerModelObjectType["ResourceGroup"] = 4] = "ResourceGroup";
    SchedulerModelObjectType[SchedulerModelObjectType["Job"] = 5] = "Job";
    SchedulerModelObjectType[SchedulerModelObjectType["Operation"] = 6] = "Operation";
    SchedulerModelObjectType[SchedulerModelObjectType["None"] = 7] = "None";
})(SchedulerModelObjectType = exports.SchedulerModelObjectType || (exports.SchedulerModelObjectType = {}));
var UserType;
(function (UserType) {
    UserType[UserType["Planner"] = 0] = "Planner";
    UserType[UserType["Viewer"] = 1] = "Viewer";
    UserType[UserType["Admin"] = 2] = "Admin";
    UserType[UserType["Data"] = 3] = "Data";
})(UserType = exports.UserType || (exports.UserType = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["User"] = 0] = "User";
    UserRole[UserRole["Admin"] = 1] = "Admin";
    UserRole[UserRole["SuperAdmin"] = 2] = "SuperAdmin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserRights;
(function (UserRights) {
    UserRights[UserRights["User"] = 0] = "User";
    UserRights[UserRights["Admin"] = 1] = "Admin";
    UserRights[UserRights["SuperAdmin"] = 2] = "SuperAdmin";
})(UserRights = exports.UserRights || (exports.UserRights = {}));
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType[SubscriptionType["Basic"] = 0] = "Basic";
    SubscriptionType[SubscriptionType["Pro"] = 1] = "Pro";
    SubscriptionType[SubscriptionType["Enterprise"] = 2] = "Enterprise";
    SubscriptionType[SubscriptionType["Playground"] = 3] = "Playground";
    SubscriptionType[SubscriptionType["Trial"] = 4] = "Trial";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Quoted"] = 0] = "Quoted";
    OrderStatus[OrderStatus["Ordered"] = 1] = "Ordered";
    OrderStatus[OrderStatus["Released"] = 2] = "Released";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var DayPatternType;
(function (DayPatternType) {
    DayPatternType[DayPatternType["Monday"] = 0] = "Monday";
    DayPatternType[DayPatternType["Tuesday"] = 1] = "Tuesday";
    DayPatternType[DayPatternType["Wednesday"] = 2] = "Wednesday";
    DayPatternType[DayPatternType["Thursday"] = 3] = "Thursday";
    DayPatternType[DayPatternType["Friday"] = 4] = "Friday";
    DayPatternType[DayPatternType["Saturday"] = 5] = "Saturday";
    DayPatternType[DayPatternType["Sunday"] = 6] = "Sunday";
    DayPatternType[DayPatternType["DayListDates"] = 7] = "DayListDates";
    DayPatternType[DayPatternType["None"] = 8] = "None";
    DayPatternType[DayPatternType["EveryWeekday"] = 9] = "EveryWeekday";
})(DayPatternType = exports.DayPatternType || (exports.DayPatternType = {}));
var UserMode;
(function (UserMode) {
    UserMode[UserMode["Planner"] = 0] = "Planner";
    UserMode[UserMode["Viewer"] = 1] = "Viewer";
})(UserMode = exports.UserMode || (exports.UserMode = {}));
var OperationProcessingState;
(function (OperationProcessingState) {
    OperationProcessingState[OperationProcessingState["Waiting"] = 0] = "Waiting";
    OperationProcessingState[OperationProcessingState["Running"] = 1] = "Running";
    OperationProcessingState[OperationProcessingState["Finished"] = 2] = "Finished";
})(OperationProcessingState = exports.OperationProcessingState || (exports.OperationProcessingState = {}));
var JobStrategy;
(function (JobStrategy) {
    JobStrategy[JobStrategy["ASAP"] = 0] = "ASAP";
    JobStrategy[JobStrategy["JIT"] = 1] = "JIT";
})(JobStrategy = exports.JobStrategy || (exports.JobStrategy = {}));
var PlanningUnit;
(function (PlanningUnit) {
    PlanningUnit[PlanningUnit["Minutes"] = 1] = "Minutes";
    PlanningUnit[PlanningUnit["Hours"] = 60] = "Hours";
})(PlanningUnit = exports.PlanningUnit || (exports.PlanningUnit = {}));
var DisplayedTextField;
(function (DisplayedTextField) {
    DisplayedTextField[DisplayedTextField["None"] = 0] = "None";
    DisplayedTextField[DisplayedTextField["JobName"] = 1] = "JobName";
    DisplayedTextField[DisplayedTextField["Strategy"] = 2] = "Strategy";
    DisplayedTextField[DisplayedTextField["ReleaseDate"] = 3] = "ReleaseDate";
    DisplayedTextField[DisplayedTextField["DueDate"] = 4] = "DueDate";
    DisplayedTextField[DisplayedTextField["JobStatus"] = 5] = "JobStatus";
    DisplayedTextField[DisplayedTextField["Customer"] = 6] = "Customer";
    DisplayedTextField[DisplayedTextField["AdditionalJobText"] = 7] = "AdditionalJobText";
    DisplayedTextField[DisplayedTextField["TaskNo"] = 8] = "TaskNo";
    DisplayedTextField[DisplayedTextField["TaskName"] = 9] = "TaskName";
    DisplayedTextField[DisplayedTextField["RunTime"] = 10] = "RunTime";
    DisplayedTextField[DisplayedTextField["Resource"] = 11] = "Resource";
    DisplayedTextField[DisplayedTextField["ResourceGroup"] = 12] = "ResourceGroup";
    DisplayedTextField[DisplayedTextField["TimeConstraint"] = 13] = "TimeConstraint";
    DisplayedTextField[DisplayedTextField["Predecessors"] = 14] = "Predecessors";
    DisplayedTextField[DisplayedTextField["AdditionalTaskText"] = 15] = "AdditionalTaskText";
    DisplayedTextField[DisplayedTextField["GlobalSetting"] = 16] = "GlobalSetting";
})(DisplayedTextField = exports.DisplayedTextField || (exports.DisplayedTextField = {}));
var LogEntryType;
(function (LogEntryType) {
    LogEntryType[LogEntryType["Connected"] = 0] = "Connected";
    LogEntryType[LogEntryType["Disconnected"] = 1] = "Disconnected";
    LogEntryType[LogEntryType["ReConnected"] = 2] = "ReConnected";
    LogEntryType[LogEntryType["UploadSucceded"] = 3] = "UploadSucceded";
    LogEntryType[LogEntryType["UploadFailed"] = 4] = "UploadFailed";
    LogEntryType[LogEntryType["Command"] = 5] = "Command";
})(LogEntryType = exports.LogEntryType || (exports.LogEntryType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Planned"] = 0] = "Planned";
    TaskStatus[TaskStatus["Started"] = 1] = "Started";
    TaskStatus[TaskStatus["Finished"] = 2] = "Finished";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
