/*
    后台代码express
    npm install express --save
    npm install nodemon -g(不用一改动server.js文件就要重新启动node server.js)
    nodemon server.js

    app.get()获取,app.post()提交
    app.use使用模块，一旦项目复杂，可以把数据写在不同的文件中去，使用app.use来引用
    res.send():返回文本
    res.json()：返回json字符串
    res.sendfile()：返回文件
 */

// 引入express，nodejs的语法，暂不支持es6的import语法
const express = require('express')

// 新建一个app
const app = express()

// 访问根路径，回调函数传入参数请求和相应，req，res，返回一个html片段
app.get('/',function (req,res) {
   res.send('<h1>hello lujing</h1>')
})
// 访问/data，返回一个json字符串
app.get('/data',function (req,res) {
    res.json({name:'imooc',type:'IT'})
})

// app监听端口
app.listen(9093,function () {
    console.log(1)
})