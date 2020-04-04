<template>
  <div>
    <div v-for="(item, index) in menus" :key="index">{{item.authName}}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
// 传模块的名字
const homeModule = createNamespacedHelpers("home");
const {
  mapState: homeState,
  mapMutations: homeMutations,
  mapActions: homeActions
} = homeModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...homeActions(["getMenus"])
  },
  mounted() {
    this.getMenus();
  //  console.log( ); 
  },
  watch: {},
  computed: {
    ...homeState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>