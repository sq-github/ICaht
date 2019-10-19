module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/sell': {
                target: 'http://openapi.tuling123.com', // 需要跨域请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/sell': '/' // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            }
        } // 配置多个代理
    }
}