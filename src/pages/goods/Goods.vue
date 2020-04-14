<template>
  <div class="container">
    <div class="top flex a-center">
      <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
      </div>
    </div>
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goods_name">
            <el-input v-model="ruleForm.goods_name" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth" prop="goods_price">
            <el-input-number v-model="ruleForm.goods_price" :min="1" label="商品价格"></el-input-number>
          </el-form-item>
          <el-form-item label="商品数量" :label-width="formLabelWidth" prop="goods_number">
            <el-input-number v-model="ruleForm.goods_number" :min="0" label="商品数量"></el-input-number>
          </el-form-item>
          <el-form-item label="商品重量" :label-width="formLabelWidth" prop="goods_weight">
            <el-input-number
              v-model="ruleForm.goods_weight"
              :precision="2"
              :step="0.1"
              :min="0.1"
              label="商品重量"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="goods" style="width: 100%">
      <el-table-column type="index" :index="indexMethod" width="50" label="#"></el-table-column>
      <el-table-column
        align="center"
        :label="item.label"
        v-for="(item,index) in tableDesc"
        :key="index"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150">
        <template slot="header" slot-scope="scope">操作</template>
        <template slot-scope="scope">
          <el-tooltip content="编辑商品" placement="top">
            <el-button
              style="margin-right:10px"
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除商品" placement="top">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" style="marginTop:25px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizeOpts"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const goodModule = createNamespacedHelpers("goods");
const { mapActions: goodAtions, mapState: goodState } = goodModule;
export default {
  data() {
    return {
      tableDesc: [
        { label: "商品名称", prop: "goods_name" },
        { label: "商品价格（元）", prop: "goods_price", width: 140 },
        { label: "商品重量", prop: "goods_weight", width: 100 },
        { label: "创建时间", prop: "add_time", width: 180 }
      ],
      selectRole: null,
      page: 1,
      size: 10,
      pageSize: 10,
      search: "",
      tableIdx: -1,
      dialogTitle: "编辑商品",
      dialogFormVisible: false,
      ruleForm: {
        goods_name: null,
        goods_price: null,
        goods_number: null,
        goods_weight: null
      },
      formLabelWidth: "120px",
      rules: {
        goods_name: [
          { required: true, message: "商品名名称不能为空", trigger: "blur" },
          { min: 2, message: "长度最少为2个字符", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...goodAtions(["getGoods", "editGoods", "delGoods"]),
    // 每页条数切换的配置
    handleSizeChange(val) {
      this.size = val;
      this.getGoods({
        query: null,
        pagenum: this.page,
        pagesize: this.size
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getGoods({
        query: null,
        pagenum: this.page,
        pagesize: this.size
      });
    },
    //跳转到新增商品
    addGoods() {
      this.$bus.$emit("send", {
        id: 1,
        url: "/goods/addGoods",
        authName: "添加商品"
      });
      this.$router.push("/goods/addGoods");
    },
    //删除商品
    del(item) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  delUser
          let flage = this.delGoods(item.goods_id);
          if (flage) {
            if (this.total % this.size === 1 && this.page > 1) {
              this.page--;
            }
            setTimeout(() => {
              this.getGoods({
                query: null,
                pagenum: this.page,
                pagesize: this.size
              });
            }, 200);
            // this.dialogFormVisible = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //打开编辑商品
    handleEdit(index, item) {
      this.dialogTitle = "编辑商品";
      // console.log(item);
      this.ruleForm = JSON.parse(JSON.stringify(item));
      this.showDialog();
    },
    indexMethod(index) {
      return index + (this.page - 1) * this.size + 1;
    },

    // 打开dialog
    showDialog() {
      this.dialogFormVisible = true;
    },
    // 编辑商品
    async add() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let flage = await this.editGoods({
            id: this.ruleForm.goods_id,
            from: {
              goods_name: this.ruleForm.goods_name,
              goods_price: this.ruleForm.goods_price,
              goods_number: this.ruleForm.goods_number,
              goods_weight: this.ruleForm.goods_weight
            }
          });
          if (flage) {
            this.getUserList({
              query: null,
              pagenum: this.page,
              pagesize: this.size
            });
            this.dialogFormVisible = false;
          }
        } else {
          this.$message({
            message: "请填写完整",
            type: "warning"
          });
          return false;
        }
      });
    },
    searchGoods() {
      console.log(this.search);
      this.getGoods({
        query: this.search.trim(),
        pagenum: 1,
        pagesize: this.size
      });
    }
  },
  beforeMount() {
    this.getGoods({
      query: null,
      pagenum: this.page,
      pagesize: this.size
    });
  },
  mounted() {},
  watch: {},
  computed: {
    ...goodState(["total", "goods"]),
    pageSizeOpts() {
      let a = [];
      let b = 50;
      if (this.total < 50) {
        b = this.total;
      }
      let i = 1;
      do {
        a.push(this.pageSize * i);
        i++;
      } while (i * this.pageSize <= b);
      return a;
    }
  }
};
</script>

<style scoped lang='scss'>
// ::v-deep .el-input__inner {
//   width: 200px;
// }
.dialog-item {
  height: 40px;
}
.top {
  width: 100%;
  margin-bottom: 20px;
  .search {
    width: 30%;
    margin-right: 20px;
  }
}
.container {
  margin-bottom: 20px;
}
</style>