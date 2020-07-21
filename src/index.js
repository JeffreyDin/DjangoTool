import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./componet/login";
import Reg from "./componet/reg";  // 在函数 Root 中添加时登录组件，自动补存


function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}


class Root extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <ul>
                            <li><Link to="/">主页</Link></li>
                            <li><Link to="/login">登录</Link></li>
                            <li><Link to="/reg">注册</Link></li>
                            <li><Link to="/about">关于</Link></li>
                        </ul>
                    </div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reg" component={Reg}/>
                    <Route path="/about" component={About}/>
                </div>
            </Router>);
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));


