import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'

// import {counter} from './index.redux'
import reducers from './reducer'
import Auth from './Auth'
import Dashboard from './Dashboard'

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():()=>{};
// 创建store
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevTools
));

console.log(store.getState())

/**
 * 登录
 * 没有登录信息，同意跳转到login
 *
 * 页面 导航+显示+注销
 * yiying
 * erying
 * qibinglian
 */

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
)


