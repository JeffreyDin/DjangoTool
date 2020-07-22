import axios from "axios";
import {observable} from "mobx";
import store from "store";

// + 过期插件
store.addPlugin(require('store/plugins/expire'));


class UserService {
    // + 被观察对象,关注此数据的变化
    @observable loggedin = false;


    login(email, password, obj) {
        // 从view 层发来的邮箱和密码，转发给后台服务器
        console.log(email, password);

        axios.post('/api/user/login/', {
            email: email,
            password: password
        })
            /* dev server会代理 */
            .then((response) => {  // 此函数要注意this的问题
                console.log(1, response);
                console.log(2, response.data);
                const {token, user} = response.data;
                // + 存储token,注意需要重开一次chrome的调试窗口才能看到,8小时过期
                store.set('token', token, new Date().getTime() + 8*3600*1000);
                this.loggedin = true;
            })
            .catch(error => {
                console.log(2,error);
                this.loggedin = false;
            });

    };


    reg(name, email, password) {
        // 从view 层发来的邮箱和密码，转发给后台服务器
        console.log(name, email, password);

        axios.post('/api/user/reg/', {
            name, email, password
        })
            .then(response => {  // 此函数要注意this的问题
                console.log(1, response);
                console.log(2, response.data);
                const {token, user} = response.data;
                // + 存储token,注意需要重开一次chrome的调试窗口才能看到,8小时过期
                store.set('token', token, new Date().getTime() + 8*3600*1000);
                this.loggedin = true;
            })
            .catch(error => {
                console.log(2,error);
                this.loggedin = false;
            });

    };
}


// 导出 实例，保证唯一
const user_service = new UserService();
export {user_service};