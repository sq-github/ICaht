<template>
    <div class="chat">
        <div class="top">
            <span>当前在线人数 {{userNum}}</span>
            <button @click="$router.push('/ai')">去找AI</button>
        </div>
        <div class="mainMsg">
            <div v-for="(item,index) in msgList" :key="index">
                <template v-if="item.msgType==0">
                    <div class="tip">
                        <span class="tipMsg">{{item.message}}</span>
                    </div>
                </template>
                <template v-if="item.msgType==1">
                    <div v-if="item.userName === userName" class="rightText">
                        <span class="img"></span>
                        <span class="rightMsg">{{item.message}}</span>
                    </div>
                    <div v-else class="leftText">
                        <span class="img"></span>
                        <span>
                            <span class="leftName">{{item.userName}} ( {{item.msgDate}} )</span>
                            <span class="leftMsg">{{item.message}}</span>
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <div class="footer">
            <input type="text" placeholder id="sendMsg" @keyup.13="sendMsg()" v-model="sendMsgInfo" />
            <button @click="sendMsg()">发送</button>
        </div>
    </div>
</template>
<script>
let baseUrl = localStorage.getItem("baseUrl");
const socket = io.connect(baseUrl + ":3333");
import { Dialog, Notify } from "vant";
export default {
    data() {
        return {
            socketNew: socket,
            userName: "", //昵称
            userNum: 0,
            sendMsgInfo: "",
            msgList: [], //所有的消息
            testMsg: {
                reqType: 0,
                perception: {
                    inputText: {
                        text: "附近的酒店"
                    }
                },
                userInfo: {
                    apiKey: "f7a970932af9475bb4926349803493f8",
                    userId: "111"
                }
            }
        };
    },
    created: function() {
        this.userName = this.$route.query.userName;
    },

    mounted: function() {
        //监听消息
        this.socketNew.on("receiveMessage", data => {
            if (data.msgType === 0) {
            }
        });
        //监听总人数
        this.socketNew.on("amountChange", data => {
            console.log(data);
            this.userNum = data;
        });
        //监听接收消息
        this.socketNew.on("receiveMessage", data => {
            console.log("接收到服务端返回：", data);
            this.msgList.push(data);
        });
        //请求获取总人数
        this.socketNew.emit("allUser");
    },
    methods: {
        //发送消息
        sendMsg: function() {
            if (this.sendMsgInfo) {
                this.socketNew.emit("sendMsg", {
                    userName: this.userName,
                    message: this.sendMsgInfo
                });
                this.sendMsgInfo = "";
            } else {
                Notify({ type: "warning", message: "你不说话怎么聊天呀~" });
            }
        }
    }
};
</script>
