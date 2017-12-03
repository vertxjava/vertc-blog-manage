<template>
    <div>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="paging.total" :current="paging.page" :page-size="paging.pageSize" @on-change="pageChange" style="margin-top:10px;text-align:left;"></Page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      stripe:true,
      columns: [
        {
          title: "ID",
          key: "id",
          width: 130
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "创建时间",
          key: "createDate",
          width: 150
          
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "修改分类"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除分类"
              )
              
            ]);
          }
        }
      ],
      data: [],
      paging: {
        page: 1,
        total: 0,
        pageSize: 10
      },
      
    };
  },
  mounted: function() {
    var _this = this;
    this.$nextTick(function() {
      this.$http
        .get(this.getRequestUrl())
        .then(
          response => {
            _this.data = response.data;
          },
          error => {
            if (error.status == 401) {
              this.$Message.error("授权过期，请重新登录");
              // 授权过期
              this.$store.state.token = "";
              this.$router.push({
                path: "/login"
              });
            }
          }
        );

        this.$http.get("http://www.vertxjava.com/api/manage/category/count").then(
        response => {
          _this.paging.total = response.data.count;
          this.$Loading.finish();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        },
        error => {
          this.$Loading.error();
        }
      );
    });

    
  },
  methods: {
    getRequestUrl() {
      return (
        "http://www.vertxjava.com/api/manage/category/listByPage?page=" +
        this.paging.page +
        "&pageSize=" +
        this.paging.pageSize
      );
    },
    pageChange(page) {
      this.paging.page = page;
      var _this = this;
      this.$http.get(this.getRequestUrl()).then(
        response => {
          _this.data = response.data;
        },
        error => {
          this.$Loading.error();
        }
      );
    },
    show(index) {
      var id = `${this.data[index].id}`;
      this.$router.push({
        path: "/category/update",
        query: {
          id: id
        }
      });
    },
    remove(index) {
      var id = `${this.data[index].id}`;
      this.$http.get("http://www.vertxjava.com/api/manage/category/delete?id="+id).then(
          response => {
            this.$Message.success("删除成功");
            this.data.splice(index, 1);
          },error => {
            this.$Message.error("删除失败");
          }
        );
    }
  }
};
</script>

<style>

</style>
