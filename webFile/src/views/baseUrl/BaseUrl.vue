<template>
    <div class="login">
        <input
            autofocus
            type="text"
            placeholder="请输入IP"
            id="loginName"
            @keyup.13="login()"
            v-model="baseUrl"
        />
        <br />
        <button @click="login()">确认</button>
        <div class="methodText">
            <p>IP格式：http://192.168.100.155</p>
            <p>IP查询方法：win+r => 输入cmd回车 => 输入ipconfig回车</p>
            <p class="attention">IP要确保正确哦~</p>
        </div>
        <img class="logo" src="../../../static/imgs/sq.png" alt />
    </div>
</template>
<script>
import { Dialog } from "vant";
export default {
    data() {
        return {
            baseUrl: ""
        };
    },
    methods: {
        login: function() {
            if (this.baseUrl) {
                localStorage.setItem("baseUrl", this.baseUrl);
                this.$router.push("./login");
            } else {
                Dialog({ message: "没有IP是不行的哦~" });
            }
        }
    }
};
</script>

