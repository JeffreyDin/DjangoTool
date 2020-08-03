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

    @observable blogMsg = '';
    @observable blogArticles = [];
    @observable blogPagination = {page:1, size:20, count:0, pages:1};

    // TODO 验证，token 在 store 中是否拿回来过期了，如果过期，清除
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

    };

    list(search) {
        // 访问流程：
        // /article?page=2&size=4 => constructor ?page=2&size=4 =>
        // service_blog list(?page=2&size=4) => /api/blog/article/?page=2&size=20
        axios.get('/api/blog/article/'+search,
        )
            .then(response => {
                console.log(1, response);
                console.log(2, response.data); // articles, pagination
                const {articles=[], pagination={}} = response.data;
                // const {articles, pagination} = response.data;

                this.blogArticles = articles;
                this.blogPagination = pagination;
            })
            .catch(error => {
                console.log(2, error);

                this.blogMsg = '博客列表获取失败';
            });
    };

}


// 导出 实例，保证唯一
const blog_service = new BlogService();
export {blog_service};




