import React from 'react';
import '../css/login.css';
import {Link, Redirect} from "react-router-dom";
import {user_service as service_user} from "../service/user";
import {observer} from "mobx-react";
import {message} from "antd";
import 'antd/lib/message/style';
import {inject} from "../utils";

// const service_user = new UserService();


// export default class Reg extends React.Component {
//     render() {
//         return <_Reg service_user={service_user} />;
//     }
// };

@inject({service_user})  // {service_user} => service_user=service_user
@observer
export default class Reg extends React.Component {
    // 工具类，对表单中的数据进行验证后，再进行提交
    validate_pwd(pwd1, pwd2){
        return pwd1.value === pwd2.value;
    };

    handleClick(event){
        event.preventDefault();
        const [name, email, password, confirm] = event.target.form;

        // TODO && name 长度、字符验证； email 正则； password 强度验证；
        if (this.validate_pwd(password, confirm))
            this.props.service_user.reg(name.value, email.value, password.value);
        else {
            message.info(
                this.props.service_user.errMsg = '注册失败',
                5,
                () => this.props.service_user.errMsg = '');
        }
    };

    render() {
        // console.log('_Reg', this.props.service_user.jumpMsg);
        if (this.props.service_user.jumpMsg){
            // 已经注册成功且登录的用户不允许注册
            return <Redirect to={"/"} />;
        }
        // let err = this.props.service_user.errMsg;

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

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.service_user.errMsg) {
    //         message.info(prevProps.service_user.errMsg,
    //             5,
    //             () => prevProps.service_user.errMsg = '');
    //     }
    // };
}