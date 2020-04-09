<template>
  <div>
    <div class="container">
      <el-card class="box-card">
        <userList :tableData="users" :tableDesc="tableDesc" @add="add"></userList>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userAtions, mapState: userState } = userModule;
import userList from "../../components/user/userList";
export default {
  data() {
    return {
      tableDesc: [
        { label: "姓名", prop: "username" },
        { label: "角色", prop: "role_name" },
        { label: "电话", prop: "mobile" },
        { label: "邮箱", prop: "email" },
        { label: "状态", prop: "mg_state" },
      ]
    };
  },
  components: {
    userList
  },
  props: {},
  methods: {
    ...userAtions(["getUserList", "addUser"]),
    add(e) {
      this.addUser(e);
    }
  },
  beforeMount() {
    this.getUserList({ query: '', pagenum: 1, pagesize: 5 });
  },
  mounted() {},
  watch: {},
  computed: {
    ...userState(["users"])
  }
};
</script>

<style scoped lang='scss'>
</style>