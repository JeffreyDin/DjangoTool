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
        props.service_blog.list();
    }

    render() {
        const data = this.props.service_blog.blogArticles;
        if (data.length) {
            return (
                <List
                    header={<div>博客列表</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item.title}</List.Item>)}
                />);
        } else {
            return <div>无数据</div>
        }

    };

}

