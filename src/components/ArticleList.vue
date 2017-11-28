<template>
    <Table border :columns="columns" :data="data">
    </Table>
</template>
<script>
    export default {
        data() {
            return {
                columns: [{
                         title: 'ID',
                        key: 'id',
                        width: 130
                    },
                    {
                        title: '标题',
                        key: 'title',
                    },
                    
                     {
                        title: '分类',
                        key: 'category',
                        width: 80
                    },
                    {
                        title: '作者',
                        key: 'author',
                        width: 80
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                        width: 140
                    },
                    {
                        title: '阅读数',
                        key: 'reads',
                        width: 80
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 190,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改文章'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除文章')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.$http.get('http://www.vertxjava.com/api/manage/article/listByPage?page=1').then(response => {
                    _this.data = response.data;
                }, error => {
                    this.$Message.success('获取文章信息失败');
                });
            })
        },
        methods: {
            show(index) {
                var id = `${this.data[index].id}`;
                this.$router.push({path:'/article/update',query:{id:id}});
            },
            remove(index) {
                this.data.splice(index, 1);
            }
        }
    }
</script>

<style>

</style>
