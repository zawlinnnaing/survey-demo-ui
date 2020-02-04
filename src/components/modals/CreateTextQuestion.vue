<template>
  <div class="modal" tabindex="-1" role="dialog" id="creatTextQuestionModal">
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Text Question</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input
              :value="question"
              @input="setQuestion"
              class="form-control"
              id="textQuestionInput"
              required
              placeholder="Enter your question"
            />
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :value="required"
                @change="setRequired"
                id="isRequiredCheck"
              />
              <label class="form-check-label" for="isRequiredCheck">
                Required ?
              </label>
            </div>
          </div>
          <div class="form-group">
            <p>Question Type</p>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="questionType"
                value="short"
                @change="setType"
                id="shortQuestionRadio"
                v-bind="{ checked: type == 'short' ? true : false }"
              />
              <label class="form-check-label" for="shortQuestionRadio">
                Short Question
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="questionType"
                value="long"
                @change="setType"
                v-bind="{ checked: type == 'long' ? true : false }"
                id="longQuestionRadio"
              />
              <label class="form-check-label" for="longQuestionRadio">
                Long Question
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            v-show="edited"
            @click="updateTextQuestion"
          >
            Save Changes
          </button>
          <button
            v-show="!edited"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="createTextQuestion"
          >
            Create question
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRadioBtnValue } from "../../../modules/helper.js";
export default {
  props: ["edited", "questionId"],
  computed: {
    order() {
      return this.$store.state.questionId;
    },
    question() {
      return this.$store.state.tmpQuestion.question;
    },
    required() {
      return this.$store.state.tmpQuestion.required;
    },
    type() {
      return this.$store.state.tmpQuestion.type;
    }
  },
  methods: {
    setQuestion(e) {
      this.$store.commit("tmpQuestion/setQuestion", e.target.value);
    },
    setRequired(e) {
      console.log("set required", e.target.checked);
      this.$store.commit("tmpQuestion/setRequired", e.target.checked);
    },
    setType(e) {
      this.$store.commit("tmpQuestion/setType", e.target.value);
    },

    createTextQuestion(e) {
      if (this.validateQuestion()) {
        alert("Empty Question field or question type");
      } else {
        let questionObj = {
          question: this.question,
          required: this.required,
          order: this.order,
          type: this.type
        };
        this.$store.commit("addQuestion", questionObj);
        this.$store.commit("incrementQuestionId");
        this.$store.commit("tmpQuestion/clear");
      }
    },
    updateTextQuestion() {
      if (this.validateQuestion()) {
        alert("Empty Question field or question type");
      } else {
        let questionObj = {
          question: this.question,
          required: this.required,
          order: this.questionId,
          type: this.type
        };
        $("#creatTextQuestionModal").modal("hide");
        // console.log("From update text question", questionObj);
        this.$store.commit("editQuestion", questionObj);
        this.$store.commit("tmpQuestion/clear");
      }
    },
    validateQuestion() {
      return (
        String(this.question) == null ||
        String(this.question) == "" ||
        String(this.type) == null ||
        String(this.type) == ""
      );
    }
  }
};
</script>
