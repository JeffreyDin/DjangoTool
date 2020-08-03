import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./componet/login";
import Reg from "./componet/reg";
import Publish from "./componet/blog/publish";
import ArticleList from "./componet/blog/list";
import ArticleDetail from "./componet/blog/detail";
import {Menu, Icon, Layout} from "antd";

const {Header, Content, Footer} = Layout;

import "antd/lib/menu/style";
import "antd/lib/icon/style";



function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}


class Root extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        {/*<div className="logo" />*/}
                        {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}

                        <Menu mode="horizontal" theme="dark">
                            <Menu.Item key="home"><Link to="/"><Icon type={"home"}/>主页</Link></Menu.Item>
                            <Menu.Item key="login"><Link to="/login"><Icon type={"login"}/>登录</Link></Menu.Item>
                            <Menu.Item key="reg"><Link to="/reg">注册</Link></Menu.Item>
                            <Menu.Item key="article-list"><Link to="/article/list"><Icon type="bars"/>文章列表</Link></Menu.Item>
                            <Menu.Item key="article-publish"><Link to="/article/create">文章发布</Link></Menu.Item>

                            <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
                        </Menu>

                    </Header>
                    <Content style={{ padding: '8px 50px' }}>
                        <div style={{ width:'80%', margin:'auto', padding:'5px'}}>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/reg" component={Reg}/>
                            <Route path="/article/list" component={ArticleList}/>
                            <Route path="/article/detail" component={ArticleDetail}/>
                            <Route path="/article/create" component={Publish}/>
                            <Route path="/about" component={About}/>
                        </div>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        jeffrey.com ©2018 Created by jeffrey
                    </Footer>


                </Layout>
            </Router>);
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
