<template>
    <div class="login">
        <!-- <input
            autofocus
            type="text"
            placeholder="请输入昵称"
            id="loginName"
            @keyup.13="login()"
            v-model="userName"
        />
        <br />
        <button @click="login()">登录</button>-->
        <img class="logo" src="../../../static/imgs/sq.png" alt />
    </div>
</template>
<script>
let baseUrl = localStorage.getItem("baseUrl");
const socket = io.connect(baseUrl + ":3333");
import { Dialog } from "vant";
export default {
    data() {
        return {
            show: false,
            userName: "",
            socketNew: socket
        };
    },
    beforeCreate() {},
    mounted: function() {
        //监听登陆失败
        this.socketNew.on("loginFail", data => {
            alert(data);
        });
        //登录成功
        this.socketNew.on("loginSuccess", data => {
            if (data.userName === this.userName) {
                this.$router.push({
                    path: "/chat",
                    query: { userName: this.userName }
                });
            } else {
                Dialog({ message: "用户名不匹配，请重试" });
            }
        });
    },
    methods: {
        login: function() {
            if (this.userName) {
                this.socketNew.emit("login", this.userName);
            } else {
                Dialog({ message: "少侠尊姓大名？" });
            }
        }
    }
};
</script>

