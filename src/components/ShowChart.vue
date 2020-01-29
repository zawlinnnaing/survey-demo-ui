<template>
  <div>
    <div
      v-for="question in result.questions"
      :key="question.id"
      class="card question"
    >
      <h4 class="question-header">{{ question.question }}</h4>
      <div class="question-body">
        <bar-chart
          v-if="loaded == true && listQuestionTypes.includes(question.type)"
          :chartData="question"
          :option="option"
        ></bar-chart>
        <div v-else class="text-answers">
          <div
            class="answer"
            v-for="answer in question.answers"
            :key="answer.id"
          >
            {{ answer.answer ? answer.answer : "No answer" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-answers {
  height: 300px;
  overflow: scroll;
}

div.question-body {
  background-color: white;
  padding: 1.5rem;
}

div.question {
  background-color: #e0e0e0;
  padding: 2rem 0;
  margin: 2rem 0;
}
div.text-answers .answer {
  padding: 2rem 0;
  text-align: center;
  border-bottom: 1px solid gray;
}
</style>

<script>
import axios from "../../modules/app-axios";
import BarChart from "./subcomponents/charts/BarChart";
import questionTypes from "../../config/app";
export default {
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      result: {},
      listQuestionTypes: questionTypes.listQuestionTypes,
      option: {
        scales: {
          yAxes: [
            {
              offset: true
            }
          ]
        }
      }
    };
  },
  async created() {
    console.log(this.listQuestionTypes);
    let url =
      process.env.VUE_APP_SERVER_URL +
      "/analytics/data/" +
      this.$route.params.formId;
    let { data } = await axios.get(url);

    this.result = data;
    this.loaded = true;
    // console.log(this.result);
  }
};
</script>
