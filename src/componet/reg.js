import React from 'react';
import '../css/login.css';
import {Link, Redirect} from "react-router-dom";
import {user_service as service_user} from "../service/user";
import {observer} from "mobx-react";


// const service_user = new UserService();


export default class Reg extends React.Component {
    render() {
        return <_Reg service_user={service_user} />;
    }
};


@observer
class _Reg extends React.Component {
    // 工具类，对表单中的数据进行验证后，再进行提交
    validate_pwd(pwd1, pwd2){
        return pwd1.value === pwd2.value;
    };

    handleClick(event){
        event.preventDefault();
        const [name, email, password, confirm] = event.target.form;

        // TODO && name 长度、字符验证； email 正则； password 强度验证；
        if (this.validate_pwd(password, confirm) )
            this.props.service_user.reg(name.value, email.value, password.value);
        else{
            console.log("error ~~~~~~~~~~~~~~~~~~~~~~~")
        }
    };

    render() {
        console.log('_Reg', this.props.service_user.loggedin);
        if (this.props.service_user.loggedin){
            // 已经注册成功且登录的用户不允许注册
            return <Redirect to={"/"} />;
        }

        return(
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="用户名"/>
                        <input type="text" placeholder="邮箱"/>
                        <input type="password" placeholder="密码"/>
                        <input type="password" placeholder="确认密码"/>
                        <button onClick={this.handleClick.bind(this)}>注册</button>
                        <p className="message">已经注册？<Link to="/login">请登录</Link></p>
                    </form>
                </div>
            </div>
        );

    }
}