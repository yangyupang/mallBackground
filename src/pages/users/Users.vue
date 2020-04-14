<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <div class="top flex a-center">
          <div class="search">
            <el-input placeholder="请输入内容" v-model="search" clearable class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
            </el-input>
          </div>
          <div class="btn">
            <el-button type="primary" @click="showDialog">添加用户</el-button>
          </div>
        </div>
        <div class="dialog">
          <el-dialog
            title="添加用户"
            :visible.sync="dialogFormVisible"
            :show-close="false"
            width="600px"
          >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="ruleForm.username" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="ruleForm.password" clearable autocomplete="off" type="password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="ruleForm.email" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                <el-input v-model="ruleForm.mobile" clearable autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelAddUser('ruleForm')">取 消</el-button>
              <el-button type="primary" @click="add">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <el-table :data="users" border style="width: 100%">
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
                <el-switch v-model="scope.row[item.prop]" @change="changeState(scope.row)"></el-switch>
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
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delUserMes(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="showRole(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="editDialog">
          <el-dialog title="编辑用户" :visible.sync="editDialog" :show-close="false" width="600px">
            <el-form :model="userMessage" :rules="rules" ref="editForm">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="userMessage.username" disabled autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="userMessage.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                <el-input v-model="userMessage.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取 消</el-button>
              <el-button type="primary" @click="edit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="roleDialog">
          <el-dialog title="分配角色" :visible.sync="roleDialog" :show-close="false" width="600px">
            <div class="flex a-center role-box">当前用户:{{roleUsers.username}}</div>
            <div class="flex a-center role-box">当前角色:{{roleUsers.role_name}}</div>
            <el-select v-model="roles" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleName"
              ></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
              <el-button @click="roleDialog = false">取 消</el-button>
              <el-button type="primary" @click="role">确 定</el-button>
            </div>
          </el-dialog>
        </div>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userAtions, mapState: userState } = userModule;
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
      tableDesc: [
        { label: "姓名", prop: "username" },
        { label: "角色", prop: "role_name" },
        { label: "电话", prop: "mobile" },
        { label: "邮箱", prop: "email" },
        { label: "状态", prop: "mg_state" }
      ],
      page: 1,
      size: 5,
      search: "",
      dialogFormVisible: false,
      editDialog: false,
      roleDialog: false,
      roleUsers: {},
      roles: "",
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
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...userAtions([
      "getUserList",
      "addUser",
      "editUser",
      "delUser",
      "getRoleList",
      "assignRoles",
      "alterUserType",
      "getUserInfo"
    ]),
    // 每页条数切换的配置
    handleSizeChange(val) {
      this.size = val;
      // console.log(val);
      this.getUserList({ query: "", pagenum: this.page, pagesize: this.size });
    },
    handleCurrentChange(val) {
      this.page = val;
      // console.log(val);
      this.getUserList({ query: "", pagenum: this.page, pagesize: this.size });
    },
    // 打开dialog添加新用户
    showDialog() {
      this.dialogFormVisible = true;
    },
    add() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addUser(this.ruleForm);
          this.dialogFormVisible = false;
          setTimeout(() => {
            this.getUserList({
              query: "",
              pagenum: this.page,
              pagesize: this.size
            });
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //打开编辑用户
    showEdit(row) {
      this.getUserInfo(row.id);
      // console.log(this.userMessage);
      // this.editUsers = this.userMessage;
      this.editDialog = true;
    },
    //实现编辑
    edit() {
      this.editUser({
        uId: this.userMessage.id,
        email: this.userMessage.email.trim(),
        mobile: this.userMessage.mobile.trim()
      });
      this.editDialog = false;
      setTimeout(() => {
        this.getUserList({
          query: "",
          pagenum: this.page,
          pagesize: this.size
        });
      }, 1000);
    },
    //打开用户角色
    showRole(row) {
      this.roleUsers = row;
      this.getRoleList();
      this.roleDialog = true;
    },
    //修改用户角色
    role() {
      if (this.roles === "") {
        this.$message.error("权限ID不能为空");
      } else {
        this.rolesList.map(item => {
          if (item.roleName === this.roles) {
            this.assignRoles({
              uId: this.roleUsers.id,
              rid: item.id
            });
            this.getUserList({
              query: "",
              pagenum: this.page,
              pagesize: this.size
            });
            this.roleDialog = false;
          }
        });
      }
    },
    //删除用户
    delUserMes(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delUser(row.id);
          setTimeout(() => {
            this.getUserList({
              query: "",
              pagenum: this.page,
              pagesize: this.size
            });
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //改变用户转态
    changeState(row) {
      this.alterUserType({
        uId: row.id,
        type: row.mg_state
      });
      // console.log(row);
    },
    //搜索
    searchUsers() {
      this.getUserList({
        query: this.search.trim(),
        pagenum: 1,
        pagesize: this.size
      });
    },
    cancelAddUser(formname) {
      this.dialogFormVisible = false;
      this.$refs[formname].resetFields();
    }
  },
  beforeMount() {
    this.getUserList({ query: "", pagenum: 1, pagesize: 5 });
  },
  mounted() {},
  watch: {},
  computed: {
    ...userState(["users", "total", "rolesList", "userMessage"]),
    pageSizeOpts() {
      let a = [];
      let b = 50;
      if (this.total < 50) {
        b = this.total;
      }
      let i = 1;
      do {
        a.push( 5* i);
        i++;
      } while (i * 5<= b);
      return a;
    }
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
.role-box {
  height: 40px;
}
</style>