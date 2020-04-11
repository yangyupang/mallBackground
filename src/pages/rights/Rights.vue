<template>
  <div>
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="权限名称" prop="authName" align="center"></el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.level==='0'"><el-tag>一级</el-tag></span>
            <span v-else-if="scope.row.level==='1'"><el-tag type="success">二级</el-tag></span>
            <span v-else><el-tag type="warning">三级</el-tag></span>
          </template>
        </el-table-column>
      </el-table>
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
    return {};
  },
  components: {},
  methods: {
    ...rightsActions(["getRightsList"])
  },
  beforeMount() {
    this.getRightsList("list");
  },
  mounted() {},
  watch: {},
  computed: {
    ...rightsState(["rightsList"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>