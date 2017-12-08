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