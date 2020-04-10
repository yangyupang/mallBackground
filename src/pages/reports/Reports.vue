<template>
  <div>
    <el-card>
      <div id="main" style="width: 750px; height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { createNamespacedHelpers } from "vuex";
// 传模块的名字
const reportsModule = createNamespacedHelpers("reports");
const {
  mapState: reportsState,
  mapMutations: reportsMutations,
  mapActions: reportsActions
} = reportsModule;
export default {
  data() {
    return {
      charts: ""
    };
  },
  components: {},
  methods: {
    ...reportsActions(["getChart"]),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据报表"
        },
        legend: this.option.legend,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: this.option.xAxis,
        yAxis: this.option.yAxis,
        series: this.option.series
      });
    }
  },
  beforeMount() {
    this.getChart();
  },
  mounted() {
    // console.log(this.option);
    setTimeout(() => {
      this.drawLine();
    }, 1000);
  },
  watch: {},
  computed: {
    ...reportsState(["option"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>