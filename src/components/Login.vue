<template>
    <div class="layout">
        <Row>
            <Col class="login-header" span="24">
            <div class="login_header_logo">
                <img src="http://ovfz2ppts.bkt.clouddn.com/1504148682703-logo.png" width="100%" height="100%" />
            </div>
            </Col>
        </Row>
        <div class="login_box">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 3,
                            message: '密码长度至少为6位 ',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://www.vertxjava.com/api/auth', {
                            username: this.formInline.user,
                            password: this.formInline.password
                        }).then((response) => {
                            if (response.data.status == 'success') {
                                this.$store.commit('isAuth', 'Bearer ' + response.data.token);
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                                this.$Message.success('登录成功');
                                this.$router.push({
                                    path: '/article/list'
                                })
                            } else {
                                this.formInline.user = ''
                                this.formInline.password = ''
                                this.$Message.error('用户名或密码错误');
                            }
                        }, (response) => {
                            this.$store.state.token = ''
                        });
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style>
    .layout {
        background-image: url('../assets/images/login-background.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .login-header {
        height: 60px;
        background-color: #495060;
    }
    .login_header_logo {
        width: 50px;
        height: 50px;
        margin: 5px;
    }
    .login_box {
        width: 480px;
        height: 70px;
        position: absolute;
        top: 300px;
        right: 50px;
    }
</style>
