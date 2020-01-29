<script>
import { Bar, mixins } from "vue-chartjs";
import { randomColorRgba } from "../../../../modules/helper";
const { reactiveProp } = mixins;
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["option"],
  computed: {
    labels() {
      return this.chartData.listItems.map(ele => {
        return ele.itemName;
      });
    },
    answerCount() {
      return this.chartData.listItems.map(ele => {
        return ele.Answers.length;
      });
    },
    backgroundColors() {
      return this.chartData.listItems.map(ele => {
        return randomColorRgba();
      });
    }
  },
  mounted() {
    let data = { datasets: [] };
    let dataset = {};
    data.labels = this.labels;
    dataset.data = this.answerCount;
    dataset.label = "# of answers";
    data.borderWidth = 0.5;
    // dataset.color = function(context) {
    //   let index = context.dataIndex;
    //   let value = context.dataset.data[index];
    //   console.log(index);
    //   return index % 2
    //     ? "rgb(128, 216, 255)" // else, alternate values in blue and green
    //     : "rgb(0, 176, 255)";
    // };
    dataset.backgroundColor = this.backgroundColors;
    data.datasets.push(dataset);
    console.log("chart data", data);
    this.renderChart(data, this.option);
  },
  methods: {}
};
</script>
