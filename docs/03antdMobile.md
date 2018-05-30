## antd-moible

### 安装
    
    npm install antd-mobile@next --save
    
    
### 使用两种方式

按需加载组件：

    import {Button} from 'antd-mobile'
    
引入整个文件    
    
    import 'antd-mobile/dist/antd-mobile.css'
        
### 根据提示安装插件(按需加载)

    npm install babel-plugin-import --save  
    
    使用 babel-plugin-import, babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）      
    
    配置babel-plugin-import
    
    package.json
    
      "babel": {
        "presets": [
          "react-app"
        ],
        "plugins":[
          ["import", { "libraryName": "antd-mobile", "style": "css" }]
        ]
      },
      
    好处：按需加载，不再需要import 'antd-mobile/dist/antd-mobile.css'