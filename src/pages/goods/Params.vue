<template>
  <div>
    <el-card class="box-card">
      <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
      <div class="select flex a-center">
        <div class="desc">选择商品分类:</div>
        <el-cascader ref="cascader" v-model="selectValue" :options="categories" :props="props"></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数"></el-tab-pane>
        <el-tab-pane label="静态属性"></el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="small" :disabled="attributes.length===0" @click="add">添加属性</el-button>

      <el-table
        :data="attributes"
        :expand-row-keys="expandArr"
        row-key="attr_id"
        style="width: 100%"
        @expand-change="unfold"
      >
        <el-table-column type="index" label="#" width="80" align="center"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <template v-if="props.row.attr_vals !== ''">
              <el-tag
                closable
                class="tag"
                v-for="item in props.row.attr_vals.split(' ')"
                :key="item"
                @close="handleClose(item)"
              >{{item}}</el-tag>
            </template>
            <template>
              <el-input
                style="width: 300px"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="attr_name" label="参数名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.attr_write==='list'">
              <el-tooltip content="编辑动态参数" placement="top">
                <el-button
                  style="margin-right:10px"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="editDynamic(scope.row)"
                >编辑</el-button>
              </el-tooltip>
              <el-tooltip content="删除动态参数" placement="top">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                >删除</el-button>
              </el-tooltip>
            </span>
            <span v-else>
              <el-tooltip content="编辑静态属性" placement="top">
                <el-button
                  style="margin-right:10px"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="editStatic(scope.row)"
                >编辑</el-button>
              </el-tooltip>
              <el-tooltip content="删除静态属性" placement="top">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                >删除</el-button>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 动态参数 -->
    <div class="dialog">
      <el-dialog title="修改动态参数" :visible.sync="dialogDynamic" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="动态参数" prop="attr_name">
            <el-input v-model="ruleForm.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDynamic = false;cancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="editDynamic">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 静态属性 -->
    <div class="dialog">
      <el-dialog title="修改静态属性" :visible.sync="dialogStatic" width="30%">
        <el-form :model="staticForm" :rules="rules" ref="staticForm">
          <el-form-item label="动态参数" prop="attr_name">
            <el-input v-model="staticForm.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatic = false;cancel('staticForm')">取 消</el-button>
          <el-button type="primary" @click="editStatic">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 添加属性 -->
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogAdd" width="30%">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item :label="dialogLabel" prop="attr_name">
            <el-input v-model="addForm.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAdd = false;cancel('addForm')">取 消</el-button>
          <el-button type="primary" @click="toAdd('addForm')">确 定</el-button>
        </div>
      </el-dialog>
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
      selectValue: [],
      props: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
        expandTrigger: "hover"
      },
      activeName: "0",
      activeLabel: "动态参数",
      dialogDynamic: false,
      dialogStatic: false,
      dialogAdd: false,
      ruleForm: {
        attr_name: ""
      },
      staticForm: {
        attr_name: ""
      },
      addForm: {
        attr_name: ""
      },
      rules: {
        attr_name: [
          { required: true, message: "参数名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "参数名在2-10位之间", trigger: "blur" }
        ]
      },
      nowValue: [],
      nowSel: "",
      dialogTitle: "添加动态参数",
      dialogLabel: "动态参数",
      inputVisible: false,
      inputValue: "",
      expandArr: [],
      tagForm: {}
    };
  },
  components: {},
  props: {},
  methods: {
    ...goodAtions([
      "getCategories",
      "getAttributes",
      "editAttributes",
      "delAttributes",
      "addAttributes"
    ]),
    handleClick(e) {
      this.activeLabel = e.label;
      if (this.selectValue.length > 0) {
        if (e.label === "静态属性") {
          this.getAttributes({ id: this.selectValue[2], sel: "only" });
          this.nowSel = "only";
        } else {
          this.getAttributes({ id: this.selectValue[2], sel: "many" });
          this.nowSel = "many";
        }
      }
    },
    editDynamic(row) {
      // this.dialogTitle = "修改动态参数";
      this.dialogDynamic = true;
      this.ruleForm = row;
    },
    del(row) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delAttributes({
            id: row.cat_id,
            attrid: row.attr_id
          });
          setTimeout(() => {
            this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editStatic(row) {
      // this.dialogTitle = "修改静态属性";
      this.dialogStatic = true;
      this.staticForm = row;
    },
    editDynamic() {
      // console.log(this.ruleForm);
      this.editAttributes({
        id: this.ruleForm.cat_id,
        attrid: this.ruleForm.attr_id,
        attr_name: this.ruleForm.attr_name,
        attr_sel: this.ruleForm.attr_sel,
        attr_vals: this.ruleForm.attr_vals
      });
      this.selectValue = this.nowValue;
      setTimeout(() => {
        this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
      }, 200);
      this.dialogDynamic = false;
    },
    editStatic() {
      this.editAttributes({
        id: this.staticForm.cat_id,
        attrid: this.staticForm.attr_id,
        attr_name: this.staticForm.attr_name,
        attr_sel: this.staticForm.attr_sel,
        attr_vals: this.staticForm.attr_vals
      });
      this.selectValue = this.nowValue;
      setTimeout(() => {
        this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
      }, 200);
      this.dialogStatic = false;
    },
    cancel(formname) {
      this.dialogDynamic = false;
      this.dialogStatic = false;
      this.dialogAdd = false;
      this.$refs[formname].resetFields();
    },
    add() {
      this.dialogAdd = true;
      if (this.activeLabel === "动态参数") {
        this.dialogTitle = "添加动态参数";
        this.dialogLabel = "动态参数";
      } else {
        this.dialogTitle = "添加静态属性";
        this.dialogLabel = "静态属性";
      }
      // this.dialogLabel = ""
    },
    toAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addAttributes({
            id: this.nowValue[2],
            attr_name: this.addForm.attr_name,
            attr_sel: this.nowSel,
            attr_vals: ""
          });
          this.selectValue = this.nowValue;
          setTimeout(() => {
            this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
          }, 200);
          this.dialogAdd = false;
          // console.log(this.nowValue[2]);
          // console.log(this.nowSel);
          // console.log(this.addForm.attr_name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(item) {
      let index = -1;
      let arr = [];
      let vals = "";
      arr = this.tagForm.attr_vals.split(" ");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          index = i;
        }
      }
      if (index > -1) {
        arr.splice(index, 1);
      }
      // console.log(this.tagForm);
      vals = arr.join(" ");
      // console.log(vals);
      this.editAttributes({
        id: this.tagForm.cat_id,
        attrid: this.tagForm.attr_id,
        attr_name: this.tagForm.attr_name,
        attr_sel: this.tagForm.attr_sel,
        attr_vals: vals
      });
      this.selectValue = this.nowValue;
      setTimeout(() => {
        this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
      }, 200);
      setTimeout(() => {
        this.attributes.map(item => {
          if (item.attr_id === this.expandArr[0]) {
            this.tagForm = item;
          }
        });
      }, 1100);
    },
    unfold(row) {
      let index = -1;
      if (this.expandArr.length > 0) {
        for (let i = 0; i < this.expandArr.length; i++) {
          if (this.expandArr[i] === row.attr_id) {
            index = i;
          }
        }
        if (index > -1) {
          this.expandArr.splice(index, 1);
        } else {
          this.expandArr.unshift(row.attr_id);
        }
      } else {
        this.expandArr.push(row.attr_id);
      }
      this.tagForm = row;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let arr = [];
        let vals = "";
        if (this.tagForm.attr_vals !== "") {
          arr = this.tagForm.attr_vals.split(" ");
        }
        arr.push(inputValue);
        vals = arr.join(" ");
        this.editAttributes({
          id: this.tagForm.cat_id,
          attrid: this.tagForm.attr_id,
          attr_name: this.tagForm.attr_name,
          attr_sel: this.tagForm.attr_sel,
          attr_vals: vals
        });
        this.selectValue = this.nowValue;
        setTimeout(() => {
          this.getAttributes({ id: this.nowValue[2], sel: this.nowSel });
        }, 200);
        setTimeout(() => {
          this.attributes.map(item => {
            if (item.attr_id === this.expandArr[0]) {
              this.tagForm = item;
            }
          });
        }, 1100);
        // console.log(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  mounted() {},
  beforeMount() {
    this.getCategories({
      type: 3,
      pagenum: null,
      pagesize: null
    });
  },
  beforeDestroy() {},
  watch: {
    selectValue(val) {
      this.nowValue = val;
      if (val.length > 0) {
        if (this.activeLabel === "静态属性") {
          this.getAttributes({ id: val[2], sel: "only" });
          this.nowSel = "only";
        } else {
          this.getAttributes({ id: val[2], sel: "many" });
          this.nowSel = "many";
        }
      }
    }
  },
  computed: {
    ...goodState(["categories", "attributes"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.select {
  margin: 20px 0;
  .desc {
    margin-right: 20px;
    font-size: 18px;
  }
}
.tag {
  margin-right: 15px;
}
</style>