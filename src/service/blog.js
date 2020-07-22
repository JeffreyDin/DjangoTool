// import axios from "axios";
// import {observable} from "mobx";
// import store from "store";
//
//
// class BlogService {
//     constructor(props) {
//         this.axios = axios.create({
//             baseURL: '/api/',
//         });
//     }
//
//     @observable blogMsg = '';
//
//     getToken() {
//         // TODO 验证，token 在 store 中是否拿回来过期了，如果过期，清除
//         return store.get('token')
//     }
//
//     publish(title, content) {
//
//         console.log(title, content);
//
//         this.axios.post(
//             'blog/article/create/',
//             {title, content},
//             {headers: {'Jwt': this.getToken()},}
//         )
//             .then((response) => {
//                 console.log(1, response);
//                 console.log(2, response.data);
//                 const {token, user} = response.data;
//
//                 this.blogMsg = '博客提交成功';
//             })
//             .catch(error => {
//                 console.log(2, error);
//
//                 this.blogMsg = '博客提交失败';
//             });
//     };
//
//     list() {
//
//     };
//
//
// }
//
//
// // 导出 实例，保证唯一
// const blog_service = new BlogService();
// export {blog_service};


import axios from 'axios';
import {observable} from 'mobx';
import store from 'store';

class BlogService {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api/blog/'
        });
    }

    @observable blogMsg = '';

    getJwt() {
        return store.get('token', null);
    }

    publish(title, content) {
        console.log(title);
        axios.post(
            '/api/blog/article/create/',
            {title, content},
            {headers: {'Jwt': this.getJwt()}}
        ).then(
            response => { // 此函数要注意this的问题
                console.log(response.data);
                console.log(response.status);
                this.blogMsg = '博文提交成功';
            }
        ).catch(
            error => {
                console.log(error);
                this.blogMsg = '博文提交失败'; //+ 信息显示

            })

    };

    list() {

    };


}

const blog_service = new BlogService();
export {blog_service};
