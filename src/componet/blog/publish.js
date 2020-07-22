import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {blog_service as service_blog} from "../../service/blog";
import {observer} from "mobx-react";
import {message} from "antd";
import {inject} from "../../utils";

import {Form, Input, Button} from "antd";

import 'antd/lib/message/style';
import 'antd/lib/form/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';


const FormItem = Form.Item;
const {TextArea} = Input;

@inject({service_blog})
@observer
export default class Publish extends React.Component {
    handleSubmit(event){
        event.preventDefault();
        const [title, content] = event.target;
        // async 异步
        this.props.service_blog.publish(title.value, content.value);
    }

    render() {

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        let blog = this.props.service_blog.blogMsg;
        return (
            <Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="标题" {...formItemLayout} >
                    <Input placeholder={"标题"}/>
                </FormItem>
                <FormItem label="内容" labelCol={{span: 4}} wrapperCol={{span: 14}}>
                    <TextArea placeholder={"内容"} rows={10}/>
                </FormItem>
                <FormItem wrapperCol={{span: 14, offset: 10}}>
                    <Button type="primary" htmlType="submit">发布</Button>
                </FormItem>
            </Form>
        );
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service_blog.blogMsg) {
            message.info(prevProps.service_blog.blogMsg,
                5,
                () => prevProps.service_blog.blogMsg = '');
        }
    };
}