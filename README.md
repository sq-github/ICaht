# ICaht
一个简单的群聊软件，技术栈：vue+vant+Socket.IO+APICloud

灵感来源：因为之前调试项目经常需要在不同的客户端调试，中间有时候需要发送信息、图片之类的特别麻烦，一个微信号完全不够用，所以尝试弄了一个简易的群聊，后面有空的话是希望能加上发送图片和文件的功能。

1. 文件介绍：apicloudApp：这个文件是将vue文件build之后，放在apicloud项目后的文件，可以通过apicloud直接云编译成app。server:服务器文件，采用express框架。node app可直接启动。webFile:web端文件，vue-cli框架。
2. 其他说明：服务器需要在自己的计算机上启动，需要安装nodejs。监听端口默认：3333。AI机器人需要自己去图灵申请账号，接口放在Ai.vue文件中，需要填入图灵机器人的apikey。
3. 项目预览图：
![Image text](https://github.com/sq-github/IChat/raw/master/readmeImgs/login.png)
![Image text](https://github.com/sq-github/IChat/raw/master/readmeImgs/chat.png)
![Image text](https://github.com/sq-github/IChat/raw/master/readmeImgs/ai.png)
