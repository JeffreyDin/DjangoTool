import React from 'react';
import '../css/login.css';
import {Link, Redirect} from "react-router-dom";
import {user_service as service_user} from "../service/user";
import {observer} from "mobx-react";
import {message} from "antd";
import 'antd/lib/message/style';
import {inject} from "../utils";

// const service_user = new UserService();

// export default class Login extends React.Component {
//     render() {
//         return <_Login service_user={service_user}/>;
//     }
// };


// 10，柯里化，替换为箭头函数  *** 整体
// 无状态组件
// const inject = obj => Comp => props => <Comp {...obj} {...props} />;
// // 调用
// inject(a)(b);

@inject({service_user})  // {service_user} => service_user=service_user
@observer
// class _Login extends React.Component {
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ret: 0}
    };

    handleClick(event) {
        // 阻止同步提交
        event.preventDefault();
        const [email, password] = event.target.form;
        // async 异步
        this.props.service_user.login(email.value, password.value, this);
    };


    render() {
        // 使用 this.props.service_user.loggedin
        // + 跳转
        console.log('_Login', this.props.service_user.loggedin);
        if (this.props.service_user.loggedin) return <Redirect to={"/"}/>;
        let err = this.props.service_user.errMsg;
        return (
            <div className="login-page">
                <span style={{color: 'red'}}>ret={this.state.ret}</span>
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="邮箱" defaultValue="dddddd@gmail.com"/>
                        {/*value={"adbdedc"}*/}
                        <input type="password" placeholder="密码"/>
                        <button onClick={this.handleClick.bind(this)}>登录</button>
                        <p className="message">未注册? <Link to="/reg">立即注册</Link></p>
                    </form>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service_user.errMsg) {
            message.info(prevProps.service_user.errMsg,
                5,
                () => prevProps.service_user.errMsg = '');
        }
    };
}