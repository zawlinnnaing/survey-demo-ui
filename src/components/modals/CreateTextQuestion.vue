<template>
  <div class="modal" tabindex="-1" role="dialog" id="creatTextQuestionModal">
    <div class="modal-dialog" role="document">
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
              v-model="question"
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
                v-model="required"
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
                id="shortQuestionRadio"
                checked
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
            @click="createTextQuestion"
          >
            Save changes
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
  data() {
    return {
      question: "",
      required: false
    };
  },
  computed: {
    order() {
      return this.$store.state.questionId;
    }
  },
  methods: {
    createTextQuestion(e) {
      if (String(this.question) == null || String(this.question) == "") {
        alert("Empty Question field");
      } else {
        let type = getRadioBtnValue($("input[name='questionType']"));
        let questionObj = {
          question: this.question,
          required: this.required,
          order: this.order,
          type: type
        };
        this.$store.commit("addQuestion", questionObj);
        this.$store.commit("incrementQuestionId");
        this.clearModal();
      }
    },
    clearModal() {
      this.question = "";
      this.required = false;
    }
  }
};
</script>
