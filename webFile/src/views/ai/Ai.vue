<template>
    <div class="chat">
        <div class="top">
            <span>你在和傻AI聊天</span>
            <button @click="$router.back(-1)">回到群聊</button>
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
                        <span class="aiImg"></span>
                        <span>
                            <span class="leftName">{{item.userName}}</span>
                            <span class="leftMsg">{{item.message}}</span>
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <div class="footer">
            <input autofocus type="text" id="sendMsg" @keyup.13="sendMsg()" v-model="sendMsgInfo" />
            <button @click="sendMsg()">发送</button>
        </div>
    </div>
</template>
<script>
import { Dialog, Notify } from "vant";
export default {
    data() {
        return {
            userName: "", //昵称
            userNum: 0,
            sendMsgInfo: "",
            msgList: [] //所有的消息
        };
    },
    created: function() {
        this.userName = this.$route.query.userName;
    },
    mounted: function() {},
    methods: {
        //发送消息
        sendMsg: function() {
            if (this.sendMsgInfo) {
                //仿造返回的请求消息
                let reqdata = {
                    userName: this.userName /*发送方用户名*/,
                    msgType: 1 /*信息类型：0为系统消息，1为客户端消息*/,
                    message: this.sendMsgInfo
                };
                // 如果是网页需要跨域，这里需要设置成代理链接 :this.$http.post("/sell/openapi/api/v2",{})
                this.$http
                    .post("http://openapi.tuling123.com/openapi/api/v2", {
                        // .post("/sell/openapi/api/v2", {
                        reqType: 0,
                        perception: {
                            inputText: {
                                text: this.sendMsgInfo
                            },
                            inputImage: {},
                            selfInfo: {}
                        },
                        userInfo: {
                            // 接入的是图灵机器人，apikey自行申请
                            apiKey: "这里是填入图灵机器人apikey的地方。",
                            userId: "1"
                        }
                    })
                    .then(res => {
                        //返回的AI消息
                        let resdata = {
                            userName: "傻AI" /*发送方用户名*/,
                            msgType: 1 /*信息类型：0为系统消息，1为客户端消息*/,
                            message: res.data.results[0].values.text
                        };
                        this.msgList.push(reqdata);
                        this.msgList.push(resdata);
                    });
                this.sendMsgInfo = "";
            } else {
                Notify({ type: "warning", message: "你不说话怎么聊天呀~" });
            }
        }
    }
};
</script>

