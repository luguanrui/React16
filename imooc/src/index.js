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


