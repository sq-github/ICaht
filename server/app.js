const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const moment = require('moment')
const PORT = 3333;
var users = []; //所有的用户


io.on("connection", (socket) => {
    console.log("用户已链接");
    socket.on('disconnect', data => {
        console.log(data);
    });
    //是否是新用户
    var isNewPerson = false;
    //当前登录用户
    var userName = null;

    socket.on("login", (data) => {

        if (users.indexOf(data) > -1) {
            /*昵称重复登录失败*/
            socket.emit("loginFail", "你就不能取个不相同的名字？？！！");
        } else {
            userName = data;
            users.push(data);
            let resdata = {
                msgType: 0 /*信息类型：0为系统消息，1为客户端消息*/,
                msgDate: moment().format("YYYY-MM-DD HH:mm:ss") /*植入服务器时间*/,
                message: "系统消息：" + data + "已加入群聊"
            };
            /*登录成功*/
            socket.emit("loginSuccess", { userName: data });
            /*向所有连接的客户端广播add事件*/
            io.emit("receiveMessage", resdata);
            /*人数变更，广播给所有连接用户*/
            socket.emit("amountChange", users.length);
            io.emit("amountChange", users.length);

            console.log("登录成功:", resdata);
            console.log("当前连接的用户为：", users);
        }
    });

    /*监听发送消息*/
    socket.on("sendMsg", (data) => {
        let resdata = {
            userName: data.userName /*发送方用户名*/,
            msgType: 1 /*信息类型：0为系统消息，1为客户端消息*/,
            msgDate: moment().format("YYYY-MM-DD HH:mm:ss") /*植入服务器时间*/,
            message: data.message
        };

        io.emit("receiveMessage", resdata);
        console.log("接受到信息======:", resdata);
    });

    /*监听请求总人数*/
    socket.on("allUser", () => {
        socket.emit("amountChange", users.length);
    });
});

http.listen(PORT, function () {
    console.log("监听端口：3333");
});
