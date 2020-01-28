<template>
  <div class="individual-question card">
    <div class="question-header">
      <h4>{{ question }}</h4>
    </div>
    <div class="question-body">
      <div class="form-group">
        <div v-if="type == 'short'">
          <input
            class="form-control"
            v-bind="{ required: isRequired }"
            v-model="anwser"
            @input="updateAnswer"
            placeholder="Enter short answer"
          />
        </div>
        <div v-else-if="type == 'long'">
          <textarea
            class="form-control"
            v-bind="{ required: isRequired }"
            v-model="answer"
            @input="updateAnswer"
            rows="5"
            cols="15"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="question-footer">
      <div v-if="isRequired" class="required-text">*Required</div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  props: ["question", "type", "isRequired", "id"],
  data() {
    return {
      anwser: ""
    };
  },
  created() {},
  methods: {
    updateAnswer() {
      console.log(this.anwser);
      let payload = {
        questionId: this.id,
        answer: this.anwser,
        type: this.type
      };
      if (this.$store.getters["answer/findAnswerByQuestionId"](this.id)) {
        this.$store.commit("answer/findAndUpdateAnswer", payload);
      } else {
        this.$store.commit("answer/pushAnswer", payload);
      }
    }
  }
};
</script>
