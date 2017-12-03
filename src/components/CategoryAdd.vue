<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="分类名称">
            <Input v-model="formItem.name" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem style="text-align:left">
            <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
</template>

<script>
var Editor;
    export default {
        data() {
            return {
                formItem: {
                    name: ''
                }
            }
        },
        methods: {
            handleSubmit(name) {
                if (this.formItem.name == '') {
                    this.$Message.error('请填写分类名称');
                    return;
                }
                alert(this.formItem);
                this.$http.post('http://www.vertxjava.com/api/manage/category/add', this.formItem).then(response => {
                    this.$Message.success('创建成功');
                }, error => {
                    if (error.status == 401) { // 授权过期
                        this.$store.state.token = '';
                        this.$Message.success('授权过期');
                        //this.$router.push({
                           // path: '/login'
                        //})
                    }else{
                         this.$Message.error('请求失败，状态码：'+error.status);
                    }
                });
            }
        }
    }
</script>

<style>

</style>
