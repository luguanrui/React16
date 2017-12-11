## 组件间使用props传递数据

    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing></YiYing>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        render(){
            const boss='张大彪'
            return <h2>一营营长：{boss}</h2>
        }
    }
    
    export default App
    
    
#### 父组件向子组件中传递参数（子组件：类组件，函数式组件）

父组件App向子组件YiYing传递参数yyz，子组件YiYing中使用this.props.yyz来接受参数
    
    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing yyz='张大彪'></YiYing>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        render(){
            return <h2>一营营长：{this.props.yyz}</h2>
        }
    }
    
    export default App
    
    如果子组件是函数式组件的话，函数式组件中通过props参数来传递参数
    
    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing yyz='张大彪'></YiYing>
                    <QiBingLian qblz='孙连胜'></QiBingLian>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        render(){
            return <h2>一营营长：{this.props.yyz}</h2>
        }
    }
    
    function QiBingLian(props) {
        return <h2>骑兵连连长：{props.qblz}</h2>
    }
    
    export default App


## 组件内部state（只有类组件有state，函数式组件是没有state属性的）


### 组件内部通过state管理状态

jsx本质是js，所以直接数据.map渲染列表

constructor设置初始状态，记得执行super(props)

state是一个不可变的对象，使用this.state获取，this.setState()来修改state


初始化state，并渲染li，一营的士兵solders

    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing yyz='张大彪'></YiYing>
                    <QiBingLian qblz='孙连胜'></QiBingLian>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                solders:['虎子','柱子','王根生']
            }
        }
        render(){
            return (
                <div>
                    <h2>一营营长：{this.props.yyz}</h2>
                    <ul>
                        {this.state.solders.map(v=>{
                            return <li key={v}>{v}</li>
                        })}
                    </ul>
                </div>
                )
        }
    }
    
    function QiBingLian(props) {
        return <h2>骑兵连连长：{props.qblz}</h2>
    }
    
    export default App
    
    
## 事件

### onClick点击事件

在jsx中，onClick={this.函数名}来绑定

this引用的问题，需要在构造函数里用bind绑定this，或者采用箭头函数的形式

this.setState修改state之后记得返回新的state，而不是修改

点击按钮添加新的士兵

    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing yyz='张大彪'></YiYing>
                    <QiBingLian qblz='孙连胜'></QiBingLian>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                solders:['虎子','柱子','王根生']
            }
        }
         addSolder=()=>{
            console.log(this)
            this.setState({
                solders:[...this.state.solders,'新兵'+Math.random()]
            })
         }
        render(){
            return (
                <div>
                    <h2>一营营长：{this.props.yyz}</h2>
                    <button onClick={this.addSolder}>新兵入伍</button>
                    <ul>
                        {this.state.solders.map(v=>{
                            return <li key={v}>{v}</li>
                        })}
                    </ul>
                </div>
                )
        }
    }
    
    function QiBingLian(props) {
        return <h2>骑兵连连长：{props.qblz}</h2>
    }
    
    export default App
    
## React生命周期

React组件有若干个钩子函数，在组件不同的状态执行

初始化周期

    页面第一次渲染所要执行的所有的函数

组件重新渲染生命周期

    属性变化，setState数据发生变化的时候执行的函数

组件卸载声明周期  

    组件离开当前页面被卸载所执行的函数，垃圾的回收，状态的清理等
    
    
    import React from 'react';
    
    class App extends React.Component{
        render(){
            const boss = '李云龙'
            return (
                <div>
                    <h2>团长：{boss}</h2>
                    <YiYing yyz='张大彪'></YiYing>
                    <QiBingLian qblz='孙连胜'></QiBingLian>
                </div>
    
            )
        }
    }
    
    class YiYing extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                solders:['虎子','柱子','王根生']
            }
            console.log('组件初始化')
        }
        componentWillMount(){
            console.log('组件马山就要挂载了')
        }
        componentDidMount(){
            console.log('组件已经挂载')
        }
        componentWillReceiveProps(nextPros){
            console.log('组件要接受父组件的值了')
        }
        shouldComponentUpdate(){
            console.log('判断是不是要更新组件')
            return true;
        }
        componentWillUpdate(){
            console.log('马上就要更新组件了')
        }
        componentDidUpdate(){
            console.log('组件更新完毕')
        }
        componentWillUnmount(){
            console.log('组件卸载了')
        }
         addSolder=()=>{‰
            console.log(this)
            this.setState({
                solders:[...this.state.solders,'新兵'+Math.random()]
            })
         }
        render(){
            console.log('组件正在加载')
            return (
                <div>
                    <h2>一营营长：{this.props.yyz}</h2>
                    <button onClick={this.addSolder}>新兵入伍</button>
                    <ul>
                        {this.state.solders.map(v=>{
                            return <li key={v}>{v}</li>
                        })}
                    </ul>
                </div>
                )
        }
    }
    
    function QiBingLian(props) {
        return <h2>骑兵连连长：{props.qblz}</h2>
    }
    
    export default App
    
  
    

    
    

    
