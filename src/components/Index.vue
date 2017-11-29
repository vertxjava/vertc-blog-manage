<template>
    <div class="layout">
        <Row type="flex">
            <Col span="3" class="layout-menu-left">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" style="z-index:1;">
                <div class="layout-logo-left">
                    <div class="blog_logo">
                        <img src="http://ovfz2ppts.bkt.clouddn.com/1504148682703-logo.png" width="100%" height="100%">
                    </div>
                    <div class="blog_name">
                        Vertc
                    </div>
                </div>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                            博客管理
                    </template>
                        <router-link to="/article/write"><MenuItem name="1-1">写文章</MenuItem></router-link>
                        <router-link to="/article/list"><MenuItem name="1-2">博客列表</MenuItem></router-link>
                    </Submenu>
                <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-keypad">
                    </Icon>
                    分类管理
                </template>
                        <MenuItem name="2-1">新增分类</MenuItem>
                        <MenuItem name="2-2">分类列表</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="21">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb" style="text-align:left;">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Vertc</BreadcrumbItem>
                        <BreadcrumbItem>BLOG</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view/>
                    </div>
                </div>
                <div class="layout-copy">
                   晋ICP备17006073号-1 | Copyright © 2017-2017, VERTC,VERTXJAVA.COM, All Rights Reserved
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {}
</script>

<style>
    .layout {
        z-index:1;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    .layout-content {
        min-height: 400px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main {
        padding: 10px;
    }
    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left {
        background: #464c5b;
    }
    .layout-header {
        height: 60px;
        background: #5b6270;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
    .layout-logo-left {
        width: 100%;
        height: 60px;
        background: #5b6270;
    }
    .blog_name {
        width: auto;
        font-size: 22px;
        height: 50px;
        margin: 5px 5px 5px 0px;
        float: left;
        line-height: 50px;
        font-weight: bolder;
        color: #cccccc
    }
    .blog_logo {
        width: 50px;
        height: 50px;
        margin: 5px 5px 5px 5px;
        float: left;
    }
</style>
