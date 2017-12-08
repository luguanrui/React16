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

