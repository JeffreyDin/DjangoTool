import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {blog_service as service_blog} from "../../service/blog";
import {observer} from "mobx-react";
import {message, List} from "antd";
import {inject} from "../../utils";

import 'antd/lib/message/style';
import 'antd/lib/list/style';


@inject({service_blog})
@observer
export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        // 不处理查询字符串，传到后台服务提取处理
        props.service_blog.list(props.location.search);  // ?page=2&size=4
    }

    handleChange(page, pageSize) {
        // 不管以前查询字符串是什么，重新拼接 查询字符串 向后传
        // page 未来的当前页；pageSize 每页条数
        this.props.service_blog.list(`?page=${page}&size=${pageSize}`);
    }

    render() {
        const data = this.props.service_blog.blogArticles;
        // this.props.service_blog.pagination;
        if (data.length) {
            const {page: current = 1, size: pageSize = 20, count: total = 0} = this.props.service_blog.blogPagination;
            return (
                <List
                    header={<div>博客列表</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    // renderItem={item => (<List.Item>{item.title}</List.Item>)}
                    renderItem={item => (
                        <List.Item>
                            <Link to={'/article/detail/' + item.article_id}>{item.title}</Link>
                        </List.Item>
                    )}
                    pagination={{
                        current: current,   // 当前页数
                        pageSize: pageSize,  // 每页条数
                        total: total,   // 数据总数
                        onChange: this.handleChange.bind(this)
                    }}

                />);
        } else {
            return <div>无数据</div>
        }

    };

}

