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
     addSolder=()=>{
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

