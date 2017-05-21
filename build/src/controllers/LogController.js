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
var socketIo = require("socket.io");
var UserSocket_1 = require("./model/UserSocket");
var io = socketIo();
var Controller = (function () {
    function Controller() {
        var _this = this;
        this.usersSockets = [];
        this.express = express();
        this.middleware();
        this.routes();
        io.listen(3333);
        io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // General chat
                socket.on('event~connection_test', function (data) {
                    console.log("Connection test complete!");
                    socket.emit('event~connection_test', { hello: 'Socket IO Connected with backend' });
                });
                socket.on('event~log_in', function (data) {
                    if (_this.usersSockets.find(function (userSocket) { return userSocket.nickname === data.nickname; }) === undefined) {
                        var userSocket = new UserSocket_1.UserSocket();
                        userSocket.nickname = data.nickname;
                        userSocket.socket = socket;
                        userSocket.token = (Math.floor(Math.random() * 999999999999999) + 1111111111111).toString();
                        _this.usersSockets.push(userSocket);
                        socket.emit('event~log_in_status', { notification: 'Success', nickname: userSocket.nickname, token: userSocket.token });
                        io.sockets.emit('event~new_message', { message: { text: "New with nickname !!!" + userSocket.nickname + "!!! connected", author: "admin-ggg-max-nax" } });
                    }
                    else {
                        socket.emit('event~log_in_status', { notification: 'User exist please change nickname' });
                    }
                });
                socket.on('event~log_out', function (data) {
                    _this.usersSockets = _this.usersSockets.filter(function (userSocket) {
                        return userSocket.nickname !== data.nickname;
                    });
                    var userList = _this.usersSockets.map(function (userSocket) {
                        return userSocket.nickname;
                    });
                    io.sockets.emit('event~get_chat_list', { userList: userList });
                    io.sockets.emit('event~new_message', { message: { text: "User with nickname !!!" + data.nickname + "!!! disconnected", author: "admin-ggg-max-nax" } });
                });
                socket.on('event~new_message', function (data) {
                    console.log(data.message);
                    io.sockets.emit('event~new_message', { message: data.message });
                });
                socket.on('event~get_chat_list', function (data) {
                    var userList = _this.usersSockets.map(function (userSocket) {
                        return userSocket.nickname;
                    });
                    io.sockets.emit('event~get_chat_list', { userList: userList });
                });
                // Private chat
                socket.on('event~new_private_message', function (data) {
                    var partner = _this.usersSockets.find(function (userSocket) { return userSocket.nickname === data.message.receiver; });
                    socket.emit('event~new_private_message', data.message);
                    io.to(partner.socket.id).emit('event~new_private_message', data.message);
                    console.log(partner);
                    console.log(data);
                });
                return [2 /*return*/];
            });
        }); });
    }
    Controller.prototype.middleware = function () {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    Controller.prototype.routes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var router;
            return __generator(this, function (_a) {
                router = express.Router();
                this.express.use('/', router);
                return [2 /*return*/];
            });
        });
    };
    return Controller;
}());
exports.default = new Controller().express;
