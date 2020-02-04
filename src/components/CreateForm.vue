<template>
  <div>
    <create-text-question
      :edited="edited"
      :questionId="order"
    ></create-text-question>
    <create-list-question
      :edited="edited"
      :questionId="order"
    ></create-list-question>
    <div class="form-header">
      <h3>Create Form</h3>
    </div>
    <div class="form-body">
      <div class="form-group">
        <label for="formTitle">Title</label>
        <input
          type="text"
          id="formTitle"
          :value="title"
          @input="updateTitle"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="formDescription">Description</label>
        <textarea
          id="formDescription"
          class="form-control"
          :value="description"
          @input="updateDescription"
          rows="5"
          cols="15"
        ></textarea>
      </div>
      <div class="button-group">
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Create Questions
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              @click="createTextQuestion"
              data-target="#creatTextQuestionModal"
            >
              Create Text Questions
            </button>
            <hr />
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              @click="createListQuestion"
            >
              Create List Questions
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="questions-field">
      <draggable :value="questions" draggable=".question" @end="sortQuestion">
        <question
          v-for="(question, index) in questions"
          class="question"
          :key="index"
          :order="question.order"
          @editQuestion="editQuestion"
        ></question>
      </draggable>
    </div>
    <div class="buttons-field" v-if="showBtn">
      <button class="btn btn-primary " @click="submitForm">Create Form</button>
    </div>
  </div>
</template>

<style scoped>
div.form-header {
  padding: 2rem 2rem;
}
div h3 {
  color: #0288d1;
}

div.dropdown-menu {
  background-color: white !important;
}
</style>

<script>
import CreateTextQuestion from "./modals/CreateTextQuestion";
import CreateListQuestion from "./modals/CreateListQuestion";
import Question from "./subcomponents/Question";
import questionTypes from "../../config/app";
import draggable from "vuedraggable";
export default {
  components: {
    CreateTextQuestion,
    CreateListQuestion,
    Question,
    draggable
  },
  data() {
    return {
      question: "",
      edited: false,
      required: false,
      items: [],
      type: "",
      order: 0
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    description() {
      return this.$store.state.description;
    },
    questions: {
      get() {
        return this.$store.state.questions;
      }
    },
    showBtn() {
      return this.$store.state.questions.length > 0 ? true : false;
    },
    questionId() {
      return this.$store.state.questionId;
    }
  },
  created() {},
  methods: {
    updateTitle(e) {
      this.$store.commit("setTitle", e.target.value);
    },
    updateDescription(e) {
      this.$store.commit("setDescription", e.target.value);
    },
    async submitForm() {
      try {
        await this.$store.dispatch("submitForm");
        this.$store.dispatch("clearForm");
        this.$router.push({
          name: "CreateFormSuccess",
          params: { message: "Form Created successfully." }
        });
      } catch (e) {
        console.error(e);
        this.$store.commit("error/clearMessages");
        this.$store.commit("error/setMessage", "form submittion failed. ");
        this.$router.push({
          name: "Errors"
        });
        // alert(e.data.message);
      }
    },
    sortQuestion(evt) {
      let payload = {
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex
      };
      this.$store.commit("moveQuestions", payload);
    },
    createTextQuestion(e) {
      e.preventDefault();
      this.clearForQuestion();
      $("#createTextQuestionModal").modal("show");
    },
    createListQuestion(e) {
      e.preventDefault();
      this.clearForQuestion();
      $("#createListQuestionModal").modal("show");
    },
    clearForQuestion() {
      this.question = "";
      this.required = false;
      this.items = [];
      this.type = "";
      this.order = this.questionId;
      this.edited = false;
    },
    editQuestion(obj) {
      this.order = obj.order;
      this.edited = true;
      if (questionTypes.textQuestionTypes.includes(obj.type)) {
        $("#creatTextQuestionModal").modal("show");
      } else {
        $("#createListQuestionModal").modal("show");
      }
    }
  }
};
</script>
