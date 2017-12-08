# redux and react-router

##  redux

### redux如何和react一起使用

把store.dispatch()方法传递给组件，内部可以调用修改状态

subscribe订阅render函数，每次修改懂重新渲染

redux相关内容，移到单独的文件index.redux.js单独管理


### 手动连接使用redux

#### 定义redux,包括reducer，actions

src/index.redux.js

    const ADD_GUN = '加机关枪'
    const REMOVE_GUN = '减机关枪'
    
    // reducer
    export function counter(state = 0, action) {
        switch (action.type) {
            case ADD_GUN:
                return state + 1
            case REMOVE_GUN:
                return state - 1
            default:
                return 10
        }
    }
    
    // action creator
    export function addGun() {
        return {type: ADD_GUN}
    }
    
    export function removeGun() {
        return {type: REMOVE_GUN}
    }
    
#### 引用redux

src/index.js

    import React from 'react'
    import ReactDOM from 'react-dom'
    import {createStore} from 'redux'
    
    import App from './App'
    import {counter,addGun,removeGun} from './index.redux'
    
    // 创建store
    const store = createStore(counter);
    
    function render() {
        ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun}/>, document.getElementById('root'))
    }
    
    render();
    
    // 订阅render函数，如果组件的状态有变化，组件会重新执行
    store.subscribe(render);
    
src/App.js

    import React from 'react'
    
    // import {addGun} from "./index.redux";
    
    class App extends React.Component{
        constructor(props){
            super(props)
        }
        render(){
            const store = this.props.store;
            const num = store.getState();
            const addGun = this.props.addGun;
            const removeGun = this.props.removeGun;
            return(
                <div>
                    <h1>现在有机枪{num}挺</h1>
                    <button onClick={()=>{store.dispatch(addGun())}}>申请武器</button>
                    <button onClick={()=>{store.dispatch(removeGun())}}>上交武器</button>
                </div>
            )
        }
    }
    
    export default App;
    

### 处理异步，调试工具，更优雅的和react结合

* redux处理异步，需要redux-thunk插件

    redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装

    安装： npm install redux-thunk --save

    使用：使用applyMiddleware开启thunk中间件，action返回函数，使用dispatch提交action
    
    src/index.js
    
        import React from 'react'
        import ReactDOM from 'react-dom'
        import {createStore,applyMiddleware} from 'redux'
        import thunk from 'redux-thunk'
        
        import App from './App'
        import {counter,addGun,removeGun,addGunAsync} from './index.redux'
        
        // 创建store
        const store = createStore(counter,applyMiddleware(thunk));
        
        function render() {
            ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync}/>, document.getElementById('root'))
        }
        
        render();
        
        // 订阅render函数，如果组件的状态有变化，组件会重新执行
        store.subscribe(render);
        
        scr/index.redux.js
        
        const ADD_GUN = '加机关枪'
        const REMOVE_GUN = '减机关枪'
        
        // reducer
        export function counter(state = 0, action) {
            switch (action.type) {
                case ADD_GUN:
                    return state + 1
                case REMOVE_GUN:
                    return state - 1
                default:
                    return 10
            }
        }
        
        // action creator
        export function addGun() {
            return {type: ADD_GUN}
        }
        
        export function removeGun() {
            return {type: REMOVE_GUN}
        }
        
        // 异步，延迟2s
        export function addGunAsync() {
            return dispatch=>{
                setTimeout(()=>{
                    dispatch(addGun())
                },2000)
            }
        }
    

    
* npm install redux-devtools-extension 并开启

    新建store的时候判断window.devToolsExtension
    
    使用compose结合thunk和window.devToolsExtension
    
    调试窗的redux选项卡实时看到state
    
    src/index.js
        
        import React from 'react'
        import ReactDOM from 'react-dom'
        import {createStore,applyMiddleware,compose} from 'redux'
        import thunk from 'redux-thunk'
        
        import App from './App'
        import {counter,addGun,removeGun,addGunAsync} from './index.redux'
        
        const reduxDevTools = window.devToolsExtension?window.devToolsExtension():()=>{};
        // 创建store
        const store = createStore(counter,compose(
            applyMiddleware(thunk),
            reduxDevTools
        ));
        
        function render() {
            ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync}/>, document.getElementById('root'))
        }
        
        render();
        
        // 订阅render函数，如果组件的状态有变化，组件会重新执行
        store.subscribe(render);
    

    

* 使用react-redux优雅的连接react和redux

    忘记subscribe，记住reducer，action和dispatch即可
    
    安装：npm install react-redux --save
    
    react-redux具体的使用
    
    provider组件在应用最外层，传入store即可，只用一次
    
     src/index.js
    
        import React from 'react'
        import ReactDOM from 'react-dom'
        import {createStore,applyMiddleware,compose} from 'redux'
        import thunk from 'redux-thunk'
        import {Provider} from 'react-redux'
        
        import App from './App'
        import {counter,addGun,removeGun,addGunAsync} from './index.redux'
        
        const reduxDevTools = window.devToolsExtension?window.devToolsExtension():()=>{};
        // 创建store
        const store = createStore(counter,compose(
            applyMiddleware(thunk),
            reduxDevTools
        ));
        
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>
            , document.getElementById('root')
         )
   
    connect负责从外部获取组件需要的参数
    
     src/App.js
    
        import React from 'react'
        import {connect} from 'react-redux'
        import {addGun, removeGun, addGunAsync} from './index.redux'
        
        class App extends React.Component {
            render() {
                return (
                    <div>
                        <h1>现在有机枪{this.props.num}挺</h1>
                        {/*不再使用store.dispatch(addGun()),因为addGun已经有了dispatch的功能*/}
                        <button onClick={this.props.addGun}>申请武器</button>
                        <button onClick={this.props.removeGun}>上交武器</button>
                        <button onClick={this.props.addGunAsync}>拖两天上交武器</button>
                    </div>
                )
            }
        }
        
        // 将state放置到num中,给到props
        const mapStateProps = (state) => {
            return {num: state}
        };
        
        // actions函数
        const actionCreators = {addGun, removeGun, addGunAsync};
        
        // 传入state，和actions函数，返回将actions设置到App的props上
        App = connect(mapStateProps, actionCreators)(App);
        
        export default App;
    
    connect可以用装饰器的方式来写



## react-router
 
