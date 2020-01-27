<template>
  <div>
    <section class="form-section">
      <h4>{{ title }}</h4>
      <hr />
      <p v-show="description != ''">{{ description }}</p>
    </section>
    <div class="questions">
      <form action="#" @submit="submitAnswers(e)">
        <div v-for="question in questions" :key="question.id">
          <text-question
            v-if="question.type == 'short' || question.type == 'long'"
            :question="question.question"
            :type="question.type"
            :isRequired="question.required"
            :id="question.id"
          ></text-question>
          <list-question
            v-else
            :question="question.question"
            :type="question.type"
            :isRequired="question.required"
            :id="question.id"
            :items="question.listItems"
          ></list-question>
        </div>
        <div
          class="btn-toolbar justify-content-between"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div class="btn-group" role="group" aria-label="First group">
            <button type="submit" class="btn btn-primary">Submit Answer</button>
          </div>
          <div class="btn-group">
            <button type="cancel" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
section.form-section {
  text-align: left;
  padding: 2rem;
  margin: 2rem;
}

.form-section h4 {
  color: #221122 !important;
}
div.questions {
  padding: 2rem;
}
</style>
<script>
import axios from "../../modules/app-axios";
import TextQuestion from "./subcomponents/questions/TextQuestion";
import ListQuestion from "./subcomponents/questions/ListQuestion";
export default {
  components: {
    TextQuestion,
    ListQuestion
  },
  data() {
    return {
      title: "",
      description: "",
      questions: ""
    };
  },
  async created() {
    let url = "/forms/" + this.$route.params.formId;
    let { data } = await axios.get(url);
    this.title = data.title;
    this.description = data.description;
    this.questions = data.questions;
  },
  methods: {
    submitAnswers(e) {
      e.preventDefaul();
    }
  }
};
</script>
