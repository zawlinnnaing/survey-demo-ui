<template>
  <div>
    <generate-links :formId="formId" v-if="loggedIn"></generate-links>
    <section class="form-section">
      <h4>{{ title }}</h4>
      <hr />
      <p v-show="description != ''">{{ description }}</p>
      <div v-if="loggedIn" class="answer-links-section">
        <button class="btn btn-primary" @click="generateLinks">
          Generate share links
        </button>
      </div>
    </section>
    <div class="questions">
      <form action="#" @submit="submitAnswers" method="POST">
        <div v-for="question in questions" :key="question.id">
          <text-question
            v-if="
              question.type == textQuestionTypes[0] ||
                question.type == textQuestionTypes[1]
            "
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
            <button type="cancel" class="btn btn-secondary" @click="goBack">
              Cancel
            </button>
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
import GenerateLinks from "./modals/GenerateLinks";
import questionTypes from "../../config/app";
export default {
  components: {
    TextQuestion,
    ListQuestion,
    GenerateLinks
  },
  data() {
    return {
      title: "",
      description: "",
      questions: "",
      textQuestionTypes: questionTypes.textQuestionTypes,
      formId: this.$route.params.formId
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    }
  },
  async created() {
    let url = "/forms/" + this.$route.params.formId;
    let { data } = await axios.get(url);
    this.$store.commit("answer/populateAnswers", data.questions);
    this.title = data.title;
    this.description = data.description;
    this.questions = data.questions;
  },
  methods: {
    async submitAnswers(e) {
      e.preventDefault();
      try {
        this.$emit("submit-form");
        let token = this.$route.query.token;
        if (!token) {
          this.$swal({
            icon: "error",
            text: "You cannot answer form without acesss token."
          });
          return;
        }
        let payload = {
          formId: this.$route.params.formId,
          token: this.$route.query.token
        };

        await this.$store.dispatch("answer/submitAnswers", payload);
        this.$swal({
          icon: "success",
          title: "Answer submitted successfully."
        });
      } catch (e) {
        console.log(e);
        this.$swal({
          icon: "error",
          title: "Form submittion failed."
        });
        return;
      }
    },
    generateLinks() {
      $("#generateLinkModal").modal("show");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
