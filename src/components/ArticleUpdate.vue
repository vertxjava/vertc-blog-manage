<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="文章分类" style="text-align:left">
            <Select v-model="formItem.category">
                <Option v-for="category in categorys" v-bind:value="category.name">{{category.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="文章标题">
            <Input v-model="formItem.title" placeholder="请输入文章标题"></Input>
        </FormItem>
        <FormItem label="文章摘要">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入文章摘要"></Input>
        </FormItem>
        <FormItem label="文章内容">
            <div id="editormd" style="z-index:9999;margin:0px;">
                <textarea style="display:none;"></textarea>
            </div>
            <!-- <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 10,maxRows: 100}" placeholder="请输入文章内容"></Input>-->
        </FormItem>
        <FormItem style="text-align:left">
            <Button type="primary" @click="handleSubmit('formInline')">修改</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
</template>

<script>
var Editor;
export default {
  data() {
    return {
      formItem: {},
      categorys: []
    };
  },
  mounted: function() {
    var _this = this;
    this.$nextTick(function() {
      this.$http.get("http://www.vertxjava.com/api/manage/category/all").then(
        response => {
          _this.categorys = response.data;
        },
        error => {
          if (error.status == 401) {
            // 授权过期
            this.$store.state.token = "";
            this.$router.push({
              path: "/login"
            });
          }
        }
      );
    });
    this.$nextTick(function() {
      this.$http
        .get(
          "http://www.vertxjava.com/api/manage/article/findByid?id=" +
            this.$route.query.id
        )
        .then(
          response => {
            this.formItem = response.data;
            Editor = editormd("editormd", {
              markdown: response.data.content,
              width: "100%",
              height: 170,
              syncScrolling: "single",
              path: "http://ovfz2ppts.bkt.clouddn.com/editormd/dev/lib/"
            });
          },
          error => {
            if (error.status == 401) {
              // 授权过期
              this.$store.state.token = "";
              this.$router.push({
                path: "/login"
              });
            }
          }
        );
    });
  },
  methods: {
    handleSubmit(name) {
      this.formItem.content = Editor.getMarkdown();
      if (this.formItem.title == "") {
        this.$Message.error("请输入文章标题");
        return;
      }
      if (this.formItem.category == "") {
        this.$Message.error("请选择文章分类");
        return;
      }
      if (this.formItem.description == "") {
        this.$Message.error("请输入文章摘要");
        return;
      }
      if (this.formItem.content == "") {
        this.$Message.error("请输入文章内容");
        return;
      }
      this.$http
        .post(
          "http://www.vertxjava.com/api/manage/article/update",
          this.formItem
        )
        .then(
          response => {
            this.$Message.success("修改成功");
          },
          error => {
            if (error.status == 401) {
              // 授权过期
              this.$store.state.token = "";
              this.$Message.success("授权过期");
              //this.$router.push({
              // path: '/login'
              //})
            } else {
              this.$Message.error("请求失败，状态码：" + error.status);
            }
          }
        );
    }
  }
};
</script>

<style>

</style>
