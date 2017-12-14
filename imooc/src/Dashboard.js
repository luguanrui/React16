// 路由
/**
 * 导航，子路由
 */
import React from 'react'
import { Link,Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import App from './App'
import {logout} from "./Auth.redux";

function Erying() {
    return <h1>二营</h1>
}
function Qibinglian() {
    return <h1>骑兵连</h1>
}
@connect(
   state=>state.auth,
    { logout }
)
class Dashboard extends React.Component{
    render(){
        const match = this.props.match;
        console.log(match.url)
        const redirectToLogin = <Redirect to='/login'></Redirect>;
        const app = (
            <div>
                <h1>独立团</h1>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.url}`} exact component={App}></Route>
                <Route path={`${match.url}/erying`} component={Erying}></Route>
                <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
            </div>
        )
        // 判断用户是否登录，如果登录的话显示dashboard组件
        return this.props.isAuth ? app : redirectToLogin;
    }
}
export default Dashboard