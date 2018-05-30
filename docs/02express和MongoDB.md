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
        


## MongoDB   

    brew update
    
    brew install mongodb
    
#### 检查是否安装成功

    mongo    

#### 启动MongoDB
       
    mongod --config /usr/local/etc/mongod.conf
     
## mongoose

    安装:npm install mongoose --save

使用mongoose配合使用express，
    
通过使用mongoose操作mongodb，存储的就是json，相对myql来说，更容易

### mongoose是什么

Mongoose是在node.js环境下对mongodb进行便捷操作的对象模型工具

因此，要使用mongoose，则必须安装node.js环境以及mongodb数据库
    
### 基础使用

connect连接数据库    
     
定义文档模型，Schema和model新建模型
     
代一个数据库文档对应一个模型，通过模型对数据库尽兴操作（增删改查）
     
#### connect

##### 用于创建数据库连接

    mongoose.connect(url(s), [options], [callback])

参数：
   * url(s):数据库地址,可以是多个,以`,`隔开
   * options:可选,配置参数
   * callback:可选,回调

    mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称')  
    
##### 指定用户连接

    mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
    
##### 连接多个数据库

如果你的app中要连接多个数据库，只需要设置多个url以,隔开，同时设置mongos为true

    mongoose.connect('urlA,urlB,...', {
       mongos : true 
    })    

#### schema 和 model    

Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力。

schema可以理解为mongoose对表结构的定义(不仅仅可以定义文档的结构和属性，

还可以定义文档的实例方法、静态模型方法、复合索引等)，

每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力 

##### 字段类型

schema中支持以下字段类型

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array

schema中不仅仅可以设置字段类型，同时还可以设置

默认值（default），关联文档（ref），required等。

一旦设置了字段类型，如果出现错误，比如某字段类型为Boolean，

而输入了一个其他类型，mongoose将会抛出类型错误的提示   
     
### mongoose文档类型

    String，Number等数据结构     
    
    定义create,remove,update分别来增删改的操作
    
    find和findOne用来查询数据
    
    
### 简单案例

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
    
    
### 测试

http://localhost:9093/test     
        
    