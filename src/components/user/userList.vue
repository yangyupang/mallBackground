<template>
  <div>
    <div class="top flex a-center">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="showDialog">添加用户</el-button>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="ruleForm.username" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="ruleForm.password" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="ruleForm.email" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="ruleForm.mobile" clearable autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="tableDatas" border style="width: 100%">
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column
        :label="item.label"
        width="180"
        v-for="(item,index) in tableDesc"
        :key="index"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row[item.prop]===true || scope.row[item.prop]===false">
            <el-switch v-model="scope.row[item.prop]"></el-switch>
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编译角色" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEdit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" style="marginTop:25px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,15,20,30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDatass.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!a.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      size: 5,
      search: "",
      tableDatass: [],
      dialogFormVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: null
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableDesc: {
      type: Array,
      default: () => []
    },
    pageNum: {
      type: Number,
      default: 5
    }
  },
  methods: {
    // 每页条数切换的配置
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 打开dialog
    showDialog() {
      this.dialogFormVisible = true;
    },
    add() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit("add", this.ruleForm);
          // this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  beforeMount() {
    this.size = this.pageNum;
  },
  mounted() {
    setTimeout(() => {
      this.tableDatass = this.tableData;
    }, 1000);
  },
  watch: {
    search(val) {
      this.tableDatass = this.tableData.filter(item => {
        return JSON.stringify(item).includes(val);
      });
    },
    "$store.state.flage"(val) {
      if (val) {
        this.dialogFormVisible = false;
      }
    }
  },
  computed: {
    tableDatas() {
      return this.tableDatass.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
    },
    // pageSizeOpts() {
    //   let a = [];
    //   let b = 50;
    //   if (this.tableDatass.length < 50) {
    //     b = this.tableDatass.length;
    //   }
    //   let i = 1;
    //   do {
    //     a.push(this.pageNum * i);
    //     i++;
    //   } while (i * this.pageNum <= b);
    //   return a;
    // }
  }
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  margin-bottom: 20px;
  .search {
    width: 30%;
    margin-right: 20px;
  }
}
</style>