import axios from "axios";
import {observable} from "mobx";
import store from "store";

store.addPlugin(require('store/plugins/expire'));


class BlogService {
    constructor(props) {
        this.axios = axios.create({
            baseURL: '/api/',
        });
    }

    // TODO 验证，token 在 store 中是否拿回来过期了，如果过期，清除
    @observable blogMsg = '';

    getToken() {
        return store.get('token','');
    }

    publish(title, content) {

        console.log(title, content);

        this.axios.post(
            'blog/article/create/',
            {title, content},
            {headers: {'Jwt': this.getToken()},}
        )
            .then((response) => {
                console.log(1, response);
                console.log(2, response.data);
                const {article_id} = response.data;

                this.blogMsg = '博客提交成功';
            })
            .catch(error => {
                console.log(2, error);
                console.log(33, !store.getExpiration('token'));
                console.log(44, !store.get('token'));

                if (!store.getExpiration('token') && !store.get('token')) {

                    this.blogMsg = '登录过期，请重新登录';
                }
                this.blogMsg = '博客提交失败';
            });

        // this.axios.get(
        //     'blog/article/create/',
        //     {headers: {'Jwt': this.getToken()},}
        // )
        //     .then((response) => {
        //         console.log(1, response);
        //         console.log(2, response.data);
        //         const {article_id} = response.data;
        //         this.jumpMsg = false;
        //         this.blogMsg = '博客提交成功';
        //     })
        //     .catch(error => {
        //         console.log(2, error);
        //         this.jumpMsg = false;
        //         this.blogMsg = '博客提交失败';
        //     });
    };

    list() {

    };


}


// 导出 实例，保证唯一
const blog_service = new BlogService();
export {blog_service};




