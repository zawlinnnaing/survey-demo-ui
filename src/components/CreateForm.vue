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
      <h3 style="text-align: left">Create Form</h3>
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
      <button class="btn btn-primary submit-btn" @click="submitForm">
        Create Form
      </button>
    </div>
    <!---   Fab   -->
    <div
      class="btn-group-fab"
      @click="openFab"
      role="group"
      aria-label="FAB Menu"
    >
      <div>
        <button
          type="button"
          class="btn btn-main btn-primary has-tooltip"
          data-placement="left"
          title="Create Question"
        >
          <!-- <i class="fa fa-bars"></i> -->
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <button
          type="button"
          class="btn btn-sub btn-primary has-tooltip"
          data-placement="left"
          title="Short question"
          @click="createTextQuestion('short')"
        >
          <font-awesome-icon icon="align-justify"></font-awesome-icon>
        </button>
        <button
          type="button"
          class="btn btn-sub btn-primary has-tooltip"
          data-placement="left"
          title="Long Question"
          @click="createTextQuestion('long')"
        >
          <font-awesome-icon icon="paragraph"></font-awesome-icon>
        </button>
        <button
          type="button"
          class="btn btn-sub btn-primary has-tooltip"
          data-placement="left"
          title="Checkbox question"
          @click="createListQuestion('checkbox')"
        >
          <font-awesome-icon icon="check-square" />
        </button>
        <button
          type="button"
          class="btn btn-sub btn-primary has-tooltip"
          data-placement="left"
          title="Radio question"
          @click="createListQuestion('radio')"
        >
          <font-awesome-icon icon="dot-circle" />
        </button>
        <button
          type="button"
          class="btn btn-sub btn-primary has-tooltip"
          data-placement="left"
          title="Dropdown"
          @click="createListQuestion('dropdown')"
        >
          <font-awesome-icon icon="caret-square-down" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.form-header {
  padding: 2rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
div h3 {
  color: #0288d1;
}

div.dropdown-menu {
  background-color: white !important;
}
.buttons-field {
  position: relative;
  top: 15px;
}

label {
  color: #888 !important;
  font-size: 1rem;
  float: left;
  margin: 0 2rem;
}

/*** Fab style *******************/
.btn-main,
.btn-sub {
  padding: 0rem;
}
svg {
  font-size: 1.5rem;
}
.btn-group-fab {
  position: fixed;
  width: 50px;
  height: auto;
  right: 20px;
  bottom: 20px;
}
.btn-group-fab div {
  position: relative;
  width: 100%;
  height: auto;
}
.btn-group-fab .btn {
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  display: block;
  margin-bottom: 4px;
  width: 40px;
  height: 40px;
  margin: 4px auto;
}
.btn-group-fab .btn-main {
  width: 50px;
  height: 50px;
  right: 50%;
  margin-right: -25px;
  z-index: 9;
}
.btn-group-fab .btn-sub {
  bottom: 0;
  z-index: 8;
  right: 50%;
  margin-right: -20px;
  -webkit-transition: all 2s;
  transition: all 0.5s;
}
.btn-group-fab.active .btn-sub:nth-child(2) {
  bottom: 60px;
}
.btn-group-fab.active .btn-sub:nth-child(3) {
  bottom: 110px;
}
.btn-group-fab.active .btn-sub:nth-child(4) {
  bottom: 160px;
}
.btn-group-fab.btn-group-fab.active .btn-sub:nth-child(5) {
  bottom: 210px;
}
.btn-group-fab.active .btn-sub:nth-child(6) {
  bottom: 260px;
}
.btn-group-fab.active .btn-sub:nth-child(7) {
  bottom: 310px;
}
</style>

<script>
import CreateTextQuestion from "./modals/CreateTextQuestion";
import CreateListQuestion from "./modals/CreateListQuestion";
import Question from "./subcomponents/Question";
import questionTypes from "../../config/app";
import draggable from "vuedraggable";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faAlignJustify,
  faParagraph,
  faCheckSquare,
  faDotCircle,
  faCaretSquareDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  components: {
    CreateTextQuestion,
    CreateListQuestion,
    Question,
    draggable,
    FontAwesomeIcon
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
  beforeMount() {
    library.add([
      faPlus,
      faAlignJustify,
      faCaretSquareDown,
      faCheckSquare,
      faDotCircle,
      faParagraph
    ]);
  },
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
        return;
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
    createTextQuestion(type) {
      this.clearForQuestion(type);
      $("#creatTextQuestionModal").modal("show");
    },
    createListQuestion(type) {
      this.clearForQuestion(type);
      $("#createListQuestionModal").modal("show");
    },
    clearForQuestion(type) {
      this.question = "";
      this.required = false;
      this.items = [];
      this.type = "";
      this.order = this.questionId;
      this.edited = false;
      this.$store.commit("tmpQuestion/setType", type);
    },
    editQuestion(obj) {
      this.order = obj.order;
      this.edited = true;
      if (questionTypes.textQuestionTypes.includes(obj.type)) {
        $("#creatTextQuestionModal").modal("show");
      } else {
        $("#createListQuestionModal").modal("show");
      }
    },
    openFab() {
      $(".btn-group-fab").toggleClass("active");
      $("has-tooltip").tooltip();
    }
  }
};
</script>
