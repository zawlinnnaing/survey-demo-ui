<template>
  <div class="individual-question card">
    <div class="question-header">
      <h4>{{ question }}</h4>
    </div>
    <div class="question-body">
      <div class="form-group" v-if="type == 'radio'">
        <div
          class="form-check form-check-inline"
          v-for="item in items"
          :key="item.id"
        >
          <input
            type="radio"
            v-bind="{ required: isRequired }"
            @change="updateSingleAnswer"
            class="form-check-input"
            :name="`question${id}List`"
            v-model="answer"
            :value="item.id"
          />
          <label class="form-check-label">{{ item.itemName }}</label>
        </div>
      </div>
      <div class="form-group" v-else-if="type == 'checkbox'">
        <div
          class="form-check form-check-inline"
          v-for="item in items"
          :key="item.id"
        >
          <input
            type="checkbox"
            class="form-check-input"
            :name="`check-question${id}List`"
            @change="updateMultiAnswers"
            v-model="listAnswers"
            :value="item.id"
          />
          <label class="form-check-label">{{ item.itemName }}</label>
        </div>
      </div>
      <div class="form-group" v-else>
        <select
          v-model="answer"
          @change="updateSingleAnswer"
          v-bind="{ required: isRequired }"
        >
          <option value=""> --- ---- </option>
          <option v-for="item in items" :key="item.id" :value="item.id">{{
            item.itemName
          }}</option>
          ></select
        >
      </div>
    </div>
    <div class="question-footer">
      <div v-if="isRequired" class="required-text">*Required</div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["question", "type", "isRequired", "id", "items"],
  data() {
    return {
      answer: "",
      listAnswers: []
    };
  },
  computed: {
    ...mapGetters(["answer/findAnswerByQuestionId"])
  },
  methods: {
    updateSingleAnswer() {
      let payload = {
        questionId: this.id,
        answer: [
          {
            listItemId: this.answer
          }
        ],
        type: this.type
      };
      this.pushAnswer(payload);
    },
    updateMultiAnswers() {
      let answers = this.listAnswers.map(id => {
        return { listItemId: id };
      });
      let payload = {
        questionId: this.id,
        type: this.type,
        answer: answers
      };
      this.pushAnswer(payload);
    },
    pushAnswer(payload) {
      if (this.$store.getters["answer/findAnswerByQuestionId"](this.id)) {
        this.$store.commit("answer/findAndUpdateAnswer", payload);
      } else {
        this.$store.commit("answer/pushAnswer", payload);
      }
    }
  },
  created() {
    // this.$parent.$on("submit-form", () => {
    //   if (this.isRequired && this.listAnswers.length <= 0) {
    //     alert(`Answer for question ${this.question} has not been submitted.`);
    //     throw new Error(
    //       `Answer for question ${this.question} has not been submitted.`
    //     );
    //   }
    // });
  }
};
</script>
