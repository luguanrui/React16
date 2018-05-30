##  redux
    
redux：

* 	createStore(reducers,compose(applyMiddleware(thunk), reduxDevTools))
*  applyMiddleware(thunk)
*  compose()
*  combineReducer({...})
*  store.dispatch(action)
*  store.subscribe(fun)
*  store.getState()
*  reducers(state,action)

react-redux：

* \<Provider store={store}>\<APP/>\</Provider>,忘掉subscribe，不需要再将action作为props来传入
* connect，将外部获取组件需要的信息，将actions作为props来传递
* connect的修饰符，npm install babel-plugin-transform-decorators-legacy --save-dev插件，需要配置package.json文件，@connect(state=>{state:num},{actions函数})


redux-thunk:

异步数据流，redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装

	  export function addGunAsync() {
	      return dispatch=>{
	          setTimeout(()=>{
	              dispatch(addGun())
	          },2000)
	      }
	  }

redux-devtools-extension：

* 新建store的时候判断window.devToolsExtension

* 使用compose结合thunk和window.devToolsExtension

* 调试窗的redux选项卡实时看到state
    
### redux是什么

* 专注于状态管理的库，和react解耦

* 单一状态，单项数据流

* 核心概念：(state，action)=>reducer=>store

* 方法：
	
	    store.subscribe(listen)
	    
	    store.dispatch(action)
	    
	    combineReducers({...})
	    
	        
	    创建store:
	    
	    import {createStore，applyMiddleware,compose，combineReducers} from 'redux'
	    
	    import thunk from 'redux-thunk'
	    
	    const reduxDevTools = window.devToolsExtension?window.devToolsExtension():()=>{};
	    
	    // 创建store并引用中间件thunk，实现store的异步处理，同时引入插件reduxDevTools，方便检测state的数据流向
	    
	    const store = createStore(reducers,compose(
	    	applyMiddleware（thunk),
	    	reduxDevTools
	    ));
	    
	    合并reducers:
	    
	    combineReducers({reducer1,reducer2,...})

#### 独立团逐渐发展，老李发现管不过来了

* 人少的时候，无论是兵器和人员的变更，都是setState

* 发展为千人大团后，老李决定，军事生活分开

* 所有状态归赵政委（redux）管理，自己只打仗（view显示）

#### 赵政委的主要功能

* 老赵有一个保险箱（store），所有人的状态，在那里都有记录（state）

* 需要改变的时候，需要告诉专员（dispatch）要干什么（action）

* 处理变化的人（reducer）拿到state和action，生成新的state

#### 老赵的正确使用方法

* 首先通过reducer新建store，随时通过store.getState获取状态

* 需要状态更改，store.dispatch(action)来修改状态

* Reducer函数接受state和action，返回新的state，可以用store.subscribe监听每次修改

#### 基础案例

    安装redux：npm install redux --save
    
src/index.js

    import {createStore} from 'redux'
    
    // 1、新建reducer
    // 通过reducer来建立store
    // reducer是根据老的state和action，生成新的状态
    function counter(state=0,action) {
        switch (action.type){
            case '加机关枪':
                return state+1;
            case '减机关枪':
                return state-1;
            default:
                return 10
        }
    }
    // 2、新建store
    const store = createStore(counter);
    
    // 获取state的初始值
    const init = store.getState();
    console.log(init);
    
    // 3、派发事件，传递action
    store.dispatch({type:'加机关枪'});
    console.log(store.getState())
    store.dispatch({type:'加机关枪'});
    console.log(store.getState())
    store.dispatch({type:'减机关枪'});
    console.log(store.getState())

> 观察控制台的打印情况，10，11，12，11

问题：上面的打印存在代码冗余的问题，那就是派发一次action就要console一下，因此可以监听一下派发事件：

    import {createStore} from 'redux'
    
    // 1、新建reducer
    // 通过reducer来建立store
    // reducer是根据老的state和action，生成新的状态
    function counter(state=0,action) {
        switch (action.type){
            case '加机关枪':
                return state+1;
            case '减机关枪':
                return state-1;
            default:
                return 10
        }
    }
    // 2、新建store
    const store = createStore(counter);
    
    // 获取state的初始值
    const init = store.getState();
    console.log(init);
    
    // 定义订阅一个事件
    function listener() {
        const current = store.getState();
        console.log(`现在有机枪${current}把`);
    }
    
    // 订阅事件
    store.subscribe(listener);
    
    // 4、派发事件，传递action
    store.dispatch({type:'加机关枪'});
    store.dispatch({type:'加机关枪'});
    store.dispatch({type:'减机关枪'});

> subscribe()订阅监听事件，监听state的变化，监听不到state的初始值，使用store.getState()来获取state  
    



### redux如何和react一起使用

把store.dispatch()方法传递给子组件，内部可以调用修改状态

subscribe订阅render函数，每次修改都要重新渲染

redux的reducer和action相关内容，移到单独的文件index.redux.js单独管理


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
    

### 处理异步redux-thunk，调试工具redux-devtools-extension，更优雅的和react结合

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
    

    
* 使用redux的compose，结合react-thunk和devToolsExtension，以方便调试和观察state

        安装：npm install redux-devtools-extension --save

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
    

### react-redux，只有两个api，Provider，connect  

    import {Provider,connect} from 'react-redux' 

* 使用react-redux插件优雅的连接react和redux

    忘记subscribe，记住reducer，action和dispatch即可
    
        安装：npm install react-redux --save
    
    react-redux具体的使用
    
    provider组件在应用最外层，传入store即可，只用一次，不需要再写subscribe()
    
     src/index.js
    
        import React from 'react'
        import ReactDOM from 'react-dom'
        import {createStore,applyMiddleware,compose} from 'redux'
        import thunk from 'redux-thunk'
        import {Provider} from 'react-redux'
        
        import App from './App'
        
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
    
    使用装饰器优化connect代码@connect()
    
    * npm run eject弹出个性化设置
    * npm install babel-plugin-transform-decorators-legacy --save-dev插件
    * package.json里babel加上plugins配置
    
    package.json配置
    
        "babel": {
            "presets": ["react-app"],
            "plugins": ["transform-decorators-legacy"]
        },
    
    src/App.js
   
        import React from 'react'
        import {connect} from 'react-redux'
        import {addGun, removeGun, addGunAsync} from './index.redux'
        
        
        // 将state放置到num中,给到props
        // const mapStateProps = (state) => {
        //     return {num: state}
        // };
        
        // actions函数
        // const actionCreators = {addGun, removeGun, addGunAsync};
        
        
        // 传入state，和actions函数，返回将actions设置到App的props上
        // App = connect(mapStateProps, actionCreators)(App);
        
        // 对以上的方法做简写
        @connect(
            // 第一个属性：你要什么属性，放到props里
            state=>({num:state}),
            // 第二个属性：你要什么方法，放到props里面，会自动dispatch
            {addGun, removeGun, addGunAsync})
        
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
        export default App;
        
    React后续
     
    * 什么数据应该放在react里
    
    * redux管理数据
    
    * redux管理聊天数据   
    
    
## redux相关插件的使用  

### redux

import {createStore,applyMiddleware,compose,combineReducer} from 'redux'

const store = createStore(reducers,compose(applyMiddleware(thunk), reduxDevTools))

##### action是一个对象，或者是函数返回的对象

	store.dispatch(action)

> action是store数据的唯一来源
> 
> 通过store.dispatch(action)将action传递到store
> 
> action本质上是JavaScript的对象，action内必须通过一个字符串类型的typ字段来表示要执行的动作，除了type字段，其他的字段可自行定义

> 注意：尽量减少在action中传递数据，action只是定义行为

action的定义：

	// simple
	const ADD_TODO = 'ADD_TODO'
	
	{
	  type: ADD_TODO,
	  text: 'Build my first Redux app'
	}
	
	// action比较多的时候，使用单独的模块
	
	import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
	
**action创建函数**，只是简单的返回一个 action，好处是：更容易被移植和测试：

	function addTodo(text) {
	  return {
	    type: ADD_TODO,
	    text
	  }
	}
	
	调用：Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程 
	
	store.dispatch(addTodo(text))
	
或者创建一个 **被绑定的action创建函数** 来自动action：
	
	function addTodo(text) {
	  return {
	    type: ADD_TODO,
	    text
	  }
	}
	
	const boundAddTodo = text => dispatch(addTodo(text))
	
	直接调用：boundAddTodo(text)
	
简化：使用react-redux中的提供的**connect()**帮助器来调用，**bindActionCreators()** 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上


##### reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state

设计state的结构

reducer是**纯函数**，因此在reducer中允许如下操作：

* 修改传入参数
* 执行有副作用的操作，如 API 请求和路由跳转
* 调用非纯函数，如 Date.now() 或 Math.random()

redux首次执行的时候，state为undefined，所以需要初始化state


action.js：

	/*
	 * action 类型
	 */
	
	export const ADD_TODO = 'ADD_TODO';
	export const TOGGLE_TODO = 'TOGGLE_TODO'
	export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
	
	/*
	 * 其它的常量
	 */
	
	export const VisibilityFilters = {
	  SHOW_ALL: 'SHOW_ALL',
	  SHOW_COMPLETED: 'SHOW_COMPLETED',
	  SHOW_ACTIVE: 'SHOW_ACTIVE'
	}
	
	/*
	 * action 创建函数
	 */
	
	export function addTodo(text) {
	  return { type: ADD_TODO, text }
	}
	
	export function toggleTodo(index) {
	  return { type: TOGGLE_TODO, index }
	}
	
	export function setVisibilityFilter(filter) {
	  return { type: SET_VISIBILITY_FILTER, filter }
	}  
	
初始化state：

	import { VisibilityFilters } from './actions'
	
	const initialState = {
	  visibilityFilter: VisibilityFilters.SHOW_ALL,
	  todos: []
	};
	
	function todoApp(state, action) {
	  if (typeof state === 'undefined') {
	    return initialState
	  }
	
	  // 这里暂不处理任何 action，
	  // 仅返回传入的 state。
	  return state
	}
	
或者使用ES6语法中的设置初始值的方法：
	
	import { VisibilityFilters } from './actions'
	
	const initialState = {
	  visibilityFilter: VisibilityFilters.SHOW_ALL,
	  todos: []
	};
	
	function todoApp(state = initialState, action) {
	  // 这里暂不处理任何 action，
	  // 仅返回传入的 state。
	  return state
	}
	
下面开始处理action：

	
	import { VisibilityFilters } from './actions'
	
	const initialState = {
	  visibilityFilter: VisibilityFilters.SHOW_ALL,
	  todos: []
	};
	
	function todoApp(state = initialState, action) {
	  switch (action.type) {
	    case SET_VISIBILITY_FILTER:
	      return Object.assign({}, state, {
	        visibilityFilter: action.filter
	      })
	    default:
	      return state
	  }
	}
	
注意：

1. 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你**必须把第一个参数设置为空对象**。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。


2. 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state

##### 处理多个actions时:

	import {
	  ADD_TODO,
	  TOGGLE_TODO,
	  SET_VISIBILITY_FILTER,
	  VisibilityFilters
	} from './actions'
	
	function todoApp(state = initialState, action) {
	  switch (action.type) {
	  
	    case SET_VISIBILITY_FILTER:
	      return Object.assign({}, state, {
	        visibilityFilter: action.filter
	      })
	      
	    case ADD_TODO:
	      return Object.assign({}, state, {
	        todos: [
	          ...state.todos,
	          {
	            text: action.text,
	            completed: false
	          }
	        ]
	      })
	      
	    case TOGGLE_TODO:
	      return Object.assign({}, state, {
	        todos: state.todos.map((todo, index) => {
	          if (index === action.index) {
	            return Object.assign({}, todo, {
	              completed: !todo.completed
	            })
	          }
	          return todo
	        })
	      })
	      
	    default:
	      return state
	      
	  }
	}


根据上面的拆分reducers，提取todos函数，传入state为数组

	function todos(state = [], action) {
	  switch (action.type) {
	    case ADD_TODO:
	      return [
	        ...state,
	        {
	          text: action.text,
	          completed: false
	        }
	      ]
	    case TOGGLE_TODO:
	      return state.map((todo, index) => {
	        if (index === action.index) {
	          return Object.assign({}, todo, {
	            completed: !todo.completed
	          })
	        }
	        return todo
	      })
	    default:
	      return state
	  }
	}
	
	function todoApp(state = initialState, action) {
	  switch (action.type) {
	    case SET_VISIBILITY_FILTER:
	      return Object.assign({}, state, {
	        visibilityFilter: action.filter
	      })
	    case ADD_TODO:
	      return Object.assign({}, state, {
	        todos: todos(state.todos, action)
	      })
	    case TOGGLE_TODO:
	      return Object.assign({}, state, {
	        todos: todos(state.todos, action)
	      })
	    default:
	      return state
	  }
	}
	
使用combineReducers合并reducers	

	import { combineReducers } from 'redux'
	import {
	  ADD_TODO,
	  TOGGLE_TODO,
	  SET_VISIBILITY_FILTER,
	  VisibilityFilters
	} from './actions'
	const { SHOW_ALL } = VisibilityFilters
	
	function visibilityFilter(state = SHOW_ALL, action) {
	  switch (action.type) {
	    case SET_VISIBILITY_FILTER:
	      return action.filter
	    default:
	      return state
	  }
	}
	
	function todos(state = [], action) {
	  switch (action.type) {
	    case ADD_TODO:
	      return [
	        ...state,
	        {
	          text: action.text,
	          completed: false
	        }
	      ]
	    case TOGGLE_TODO:
	      return state.map((todo, index) => {
	        if (index === action.index) {
	          return Object.assign({}, todo, {
	            completed: !todo.completed
	          })
	        }
	        return todo
	      })
	    default:
	      return state
	  }
	}
	
	const todoApp = combineReducers({
	  visibilityFilter,
	  todos
	})
	
	export default todoApp	


使用redux中的combineReducers() 	来合成reducers

##### store

* 维持应用的 state
* 提供 **getState()** 方法获取 state
* 提供 **dispatch(action)** 方法更新 state
* 通过 **subscribe(listener)** 注册监听器
* 通过 **subscribe(listener)** 返回的函数注销监听器
	
	

### react-redux

	import {Provider,connect} from 'react-redux'
	
react-redux仅有两个api，Provider和connect
	
### redux-thunk

	import thunk from 'redux-thunk'	

> 默认情况下，createStore() 所创建的 Redux store 没有使用 middleware，所以只支持 同步数据流。

> 你可以使用 applyMiddleware() 来增强 createStore()。虽然这不是必须的，但是它可以帮助你用简便的方式来描述异步的 action。

> 像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，以此来让你 dispatch 一些除了 action 以外的其他内容，例如：函数或者 Promise。你所使用的任何 middleware 都可以以自己的方式解析你 dispatch 的任何内容，并继续传递 actions 给下一个 middleware。比如，支持 Promise 的 middleware 能够拦截 Promise，然后为每个 Promise 异步地 dispatch 一对 begin/end actions。

> 当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象。这是 同步式的 Redux 数据流 开始的地方（译注：这里应该是指，你可以使用任意多异步的 middleware 去做你想做的事情，但是需要使用普通对象作为最后一个被 dispatch 的 action ，来将处理流程带回同步方式）。












	
