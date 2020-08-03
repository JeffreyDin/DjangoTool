import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {blog_service as service_blog} from "../../service/blog";
import {observer} from "mobx-react";
import {message, Card} from "antd";
import {inject} from "../../utils";

import 'antd/lib/message/style';
import 'antd/lib/card/style';


@inject({service_blog})
@observer
export default class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
        const {id = -1} = props.match.params;
        console.log(props.match.params);
        props.service_blog.detail(id);
    }
    render() {
        const {article_id, title, author, author_id,
            publish_time, content} = this.props.service_blog.blogDetail;
        if (title) {
            return (
            <div>
                {/*<Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{width: 300}}>*/}
                <Card title={title}
                    extra={<a href="#">More</a>}
                    style={{width: '100%'}}>
                    <p style={{margin:'auto', padding:'5px'}}>
                        作者：{author} 发布时间：{new Date(publish_time).toLocaleString()}</p>
                    <p>{content}</p>
                </Card>
            </div>);
        } else {
            return <div>无内容</div>
        }

    }

}