import {Socket} from "net";

export class UserSocket {
    nickname: string;
    socket: Socket;
    token: string;
}