import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import socketIo = require('socket.io');
import {UserSocket} from "./model/UserSocket";
let io = socketIo();

class Controller {

    public express: express.Application;
    private usersSockets: UserSocket[] = [];

    constructor() {

        this.express = express();
        this.middleware();
        this.routes();

        io.listen(3333);
        io.on('connection', async (socket) => {

            // General chat
            socket.on('event~connection_test', (data) => {
                console.log("Connection test complete!");
                socket.emit('event~connection_test', { hello: 'Socket IO Connected with backend' });
            });

            socket.on('event~log_in', (data) => {

                if ( this.usersSockets.find(userSocket => userSocket.nickname === data.nickname) === undefined) {

                    const userSocket = new UserSocket();
                    userSocket.nickname = data.nickname;
                    userSocket.socket = socket;
                    userSocket.token = (Math.floor(Math.random() * 999999999999999) + 1111111111111).toString();

                    this.usersSockets.push(userSocket);

                    socket.emit('event~log_in_status', { notification: 'Success', nickname: userSocket.nickname, token: userSocket.token });
                    io.sockets.emit('event~new_message', { message: {text: "New with nickname !!!" + userSocket.nickname + "!!! connected", author: "admin-ggg-max-nax"} });

                } else {
                    socket.emit('event~log_in_status', { notification: 'User exist please change nickname'});
                }

            });

            socket.on('event~log_out', (data) => {

                this.usersSockets = this.usersSockets.filter(( userSocket ) => {
                    return userSocket.nickname !== data.nickname;
                });

                const userList = this.usersSockets.map( userSocket => {
                    return userSocket.nickname;
                });

                io.sockets.emit('event~get_chat_list', { userList: userList });
                io.sockets.emit('event~new_message', { message: {text: "User with nickname !!!" + data.nickname + "!!! disconnected", author: "admin-ggg-max-nax"} });

            });

            socket.on('event~new_message', (data) => {
                console.log(data.message);
                io.sockets.emit('event~new_message', { message: data.message });
            });

            socket.on('event~get_chat_list', (data) => {
                const userList = this.usersSockets.map( userSocket => {
                    return userSocket.nickname;
                });
                io.sockets.emit('event~get_chat_list', { userList: userList });
            });

            // Private chat

            socket.on('event~new_private_message', (data) => {
                const partner = this.usersSockets.find(userSocket => userSocket.nickname === data.message.receiver);
                socket.emit('event~new_private_message', data.message);
                io.to(partner.socket.id).emit('event~new_private_message', data.message);
                console.log(partner);
                console.log(data);
            });

        });
    }

    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private async routes() {
        let router = express.Router();

        this.express.use('/', router);
    }

}

export default new Controller().express;