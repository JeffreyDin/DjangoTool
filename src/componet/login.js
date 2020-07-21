import React from 'react';
import '../css/login.css';
import {Link} from "react-router-dom";
import UserService from "../service/user";

const service = new UserService();


export default class Login extends React.Component {
    handleClick(event) {
        // 阻止同步提交
        event.preventDefault();
        const[email, password] = event.target.form;
        // 这样不好，应该通过外部的方式，将service 注入
        service.login(email.value, password.value);

    };

    render() {
        return(
            <div className="login-page">
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