import React from 'react';
import '../css/login.css';
import {Link, Redirect} from "react-router-dom";
import UserService from "../service/user";
import {observer} from "mobx-react";

const service_user = new UserService();


export default class Login extends React.Component {
    render() {
        return <_Login service_user={service_user} />;
    }
};

// 观察者
@observer
class _Login extends React.Component {
    constructor(props){
        super(props);
        this.state={ret: 0}
    }

    handleClick(event){
        // 阻止同步提交
        event.preventDefault();
        const[email, password] = event.target.form;
        // async 异步
        this.props.service_user.login(email.value, password.value, this);
    };


    render() {
        // 使用 this.props.service_user.loggedin
        // + 跳转
        if (this.props.service_user.loggedin) return <Redirect to={"/"} />;
        return(
            <div className="login-page">
                <span style={{color:'red'}}>ret={this.state.ret}</span>
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="邮箱"  value="dddddd@gmail.com"/>
                        <input type="password" placeholder="密码" value={"adbdedc"}/>
                        <button onClick={this.handleClick.bind(this)}>登录</button>
                        <p className="message">未注册? <Link to="/reg">立即注册</Link></p>
                    </form>
                </div>
            </div>
        );

    }
}