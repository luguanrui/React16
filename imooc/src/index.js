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

