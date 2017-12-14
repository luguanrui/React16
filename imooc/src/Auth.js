// 认证的页面
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from "./Auth.redux";

// 两个reducers，每个reducers都有一个state，所以需要合并reducers

@connect(
    state=>state.auth,
    {login}
)

class Auth extends React.Component{
    render(){
      return(
          <div>
              {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
              <h2>你没有权限，需要登录才能看</h2>
              <button onClick={this.props.login}>登录</button>
          </div>
      )
    }
}
export default Auth