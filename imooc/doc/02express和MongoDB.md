## express

### 安装express

    npm install express --save
    
### 配置基础文件

    server/server.js
    
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
    
### 启动express

    cd server
    
    node server.js
    
    或者    
    
    nodemon server.js
        


## 安装MongoDB   

    brew update
    
    brew install mongodb
    
#### 检查是否安装成功

    mongo    

#### 启动MongoDB
       
    mongod --config /usr/local/etc/mongod.conf
     
## npm install mongoose --save 安装mongoose库 

    使用mongoose配合使用express，
    
    通过使用mongoose操作mongodb，存储的就是json，相对myql来说，更容易
    
### 基础使用

     connect连接数据库    
     
     定义文档模型，Schema和model新建模型
     
     代一个数据库文档对应一个模型，通过模型对数据库尽兴操作（增删改查）
     
### mongoose文档类型

    String，Number等数据结构     
    
    定义create,remove,update分别来增删改的操作
    
    find和findOne用来查询数据
    
    

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
    
    // 使用mongoose
    const mongoose = require('mongoose')
    
    // 连接mongoose，并且使用imooc这个集合(如果没有回自动新建)
    const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
    mongoose.connect(DB_URL)
    mongoose.connection.on('connected',function () {
        console.log('MongoDB连接成功')
    })
    
    // 类似于mysql的表，mongo里文档，字段的概念
    const User = mongoose.model('user',new mongoose.Schema({
        user:{type:String,require:true},
        age:{type:Number,require:true}
    }))
    
    // 新增数据，一条指令可以添加多个数据，保存即可增加
    // User.create({
    //     user:'李四',
    //     age:30
    // },function (err,doc) {
    //     if(!err){
    //         console.log(doc)
    //     }else {
    //         console.log(err)
    //     }
    // })
    
    // 查找数据
    // app.get('/find',function (req,res) {
    //     User.find({},function (err,doc) {
    //         res.json(doc)
    //     })
    // })
    
    // 删除数据
    // User.remove({age:30},function (err,doc) {
    //     console.log(doc)
    // })
    
    // 修改数据
    // User.update({'user':'张三'},{'$set':{age:26}},function (err,doc) {
    //     console.log(doc)
    // })
    
    // 新建一个app
    const app = express()
    
    // 访问根路径，回调函数传入参数请求和相应，req，res，返回一个html片段
    app.get('/',function (req,res) {
       res.send('<h1>hello lujing</h1>')
    })
    // 访问/data，返回一个json字符串
    app.get('/data',function (req,res) {
        // 查找的是一个数据列表
        // User.find({user:'张三'},function (err,doc) {
        //     res.json(doc)
        // })
        // 查找，只查找一条数据
        // User.findOne({user:'张三'},function (err,doc) {
        //     res.json(doc)
        // })
    })
    
    // app监听端口
    app.listen(9093,function () {
        console.log('监听端口：9093')
    })    
        
    