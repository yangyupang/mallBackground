<template>
  <div>
    <el-card>
      <div class="btn">
        <el-button type="primary" @click="openAdd">添加角色</el-button>
      </div>
      <div class="addDialog">
        <el-dialog
          title="添加角色"
          :visible.sync="addDialog"
          :show-close="false"
          margin-top="15vh"
          width="30%"
        >
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="角色名" prop="roleName">
                <el-input v-model="ruleForm.roleName" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="ruleForm.roleDesc" clearable autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="addRoles">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="roles" border @expand-change="unfold">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.children.length >0">
              <div class="level" v-for="item in  props.row.children" :key="item.id">
                <div class="levelone">
                  <el-tag closable type @close="closeTag(item)">{{item.authName}}</el-tag>
                  <span class="right-icon">
                    <i class="el-icon-caret-right"></i>
                  </span>
                </div>
                <div class="leveltwo">
                  <div class="two-tag" v-for="item1 in item.children" :key="item1.id">
                    <el-tag closable type="success" @close="closeTag(item1)">{{item1.authName}}</el-tag>
                    <span class="right-icon">
                      <i class="el-icon-caret-right"></i>
                    </span>
                    <div class="leveltwo levelthree">
                      <div class="two-tag" v-for="item2 in item1.children" :key="item2.id">
                        <el-tag
                          closable
                          type="warning"
                          style="margin-left: 20px;"
                          @close="closeTag(item2)"
                        >{{item2.authName}}</el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>暂无权限</div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="职位" prop="roleName" align="center"></el-table-column>
        <el-table-column label="描述" prop="roleDesc" align="center"></el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编译角色" placement="top">
              <el-button type="primary" size="mini" @click="showEdit(scope.row)">编辑</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
              <el-button type="danger" size="mini" @click="delUser(scope.row)">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
              <el-button type="warning" size="mini" @click="showRole(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="editDialog">
        <el-dialog
          title="添加编译"
          :visible.sync="editDialog"
          margin-top="15vh"
          width="30%"
          :show-close="false"
        >
          <div>
            <el-form :model="userMessage" :rules="rules" ref="editForm">
              <el-form-item label="角色名" prop="roleName">
                <el-input v-model="userMessage.roleName" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="userMessage.roleDesc" clearable autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editRoles">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="allotDialog">
        <el-dialog
          title="权限分配"
          :visible.sync="allotDialog"
          :show-close="false"
          margin-top="15vh"
          width="50%"
        >
          <el-tree
            :data="rightsList"
            :default-checked-keys="defCheck"
            node-key="id"
            show-checkbox
            default-expand-all
            :props="defaultProps"
            @check-change="handleCheckChange"
            ref="tree"
          ></el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="allotDialog = false">取 消</el-button>
            <el-button type="primary" @click="allotPermissions">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
// 传模块的名字
const rightsModule = createNamespacedHelpers("rights");
const {
  mapState: rightsState,
  mapMutations: rightsMutations,
  mapActions: rightsActions
} = rightsModule;
export default {
  data() {
    return {
      addDialog: false,
      editDialog: false,
      allotDialog: false,
      allotUser: "",
      isRepeat: -1,
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "authName"
      },
      //展示用户的权限
      defCheck: [],
      //分配权限
      distributionList: []
    };
  },
  components: {},
  methods: {
    ...rightsActions([
      "getRoleList",
      "addRole",
      "editRole",
      "delRole",
      "getRightsList",
      "roleAuthorization",
      "delRoleAuthorization",
      "getRole"
    ]),
    openAdd() {
      this.addDialog = true;
    },
    //添加新角色
    addRoles() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addRole(this.ruleForm);
          this.addDialog = false;
          setTimeout(() => {
            this.getRoleList();
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showEdit(row) {
      this.getRole(row.id);
      this.editDialog = true;
    },
    editRoles() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editRole({
            rid: this.userMessage.roleId,
            roleName: this.userMessage.roleName.trim(),
            roleDesc: this.userMessage.roleDesc.trim()
          });
          this.editDialog = false;
          setTimeout(() => {
            this.getRoleList();
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除角色
    delUser(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delRole(row.id);
          setTimeout(() => {
            this.getRoleList();
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showRole(row) {
      this.defCheck = [];
      this.allotDialog = true;
      this.getRightsList("tree");
      this.allotUser = row.id;
      // console.log(row);
      if (row.children.length > 0) {
        row.children.map(item => {
          if (item.children.length > 0) {
            item.children.map(item1 => {
              if (item1.children.length > 0) {
                item1.children.map(item2 => {
                  this.defCheck.push(item2.id);
                });
              } else {
                this.defCheck.push(item1.id);
              }
            });
          } else {
            this.defCheck.push(item.id);
          }
        });
      }
      // console.log(this.defCheck);
    },
    handleCheckChange() {
      // let res = this.$refs.tree.getCheckedNodes();
      let res = this.$refs.tree
        .getCheckedNodes()
        .concat(this.$refs.tree.getHalfCheckedNodes());
      let arr = [];
      res.forEach(item => {
        arr.push(item.id);
      });
      this.distributionList = arr;
      // console.log(this.distributionList);
    },
    //分配用户权限
    allotPermissions() {
      let src = this.distributionList.toString();
      // console.log(src);
      this.roleAuthorization({
        rid: this.allotUser,
        rids: src
      });
      this.allotDialog = false;
      setTimeout(() => {
        this.getRoleList();
      }, 200);
    },
    unfold(row) {
      this.allotUser = row.id;
    },
    closeTag(tag) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delRoleAuthorization({
            rid: this.allotUser,
            rightId: tag.id
          });
          setTimeout(() => {
            this.getRoleList();
          }, 200);
          // console.log(tag.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancelAdd(formname) {
      this.addDialog = false;
      this.$refs[formname].resetFields();
    }
  },
  beforeMount() {},
  mounted() {
    this.getRoleList();
    // console.log(this.roles);
  },
  watch: {},
  computed: {
    ...rightsState(["roles", "rightsList", "userMessage"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.btn {
  margin-bottom: 20px;
}
.level {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.levelone {
  padding: 10px 0;
  margin: 2px 0;
  flex: 1;
}
.right-icon {
  margin-left: 10px;
}
.leveltwo {
  flex: 4;
}
.two-tag {
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.levelthree {
  margin-left: 60px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>