<template>
  <div class="individual-question card">
    <div class="question-header">
      <h4>{{ question }}</h4>
    </div>
    <div class="question-body">
      <div v-if="type == 'short'">
        <div class="form-group">
          <input class="form-control" placeholder="Enter short answer" />
        </div>
      </div>
      <div v-else-if="type == 'long'">
        <div class="form-group">
          <textarea
            class="form-control"
            placeholder="Enter long answer"
            rows="3"
            cols="15"
          ></textarea>
        </div>
      </div>
      <div v-else-if="type == 'checkbox' || type == 'radio'">
        <div
          v-for="(item, index) in items"
          class="form-check form-check-inline"
          :key="index"
        >
          <input
            class="form-check-input"
            :type="type"
            :name="question"
            :id="'inputCheck' + index"
          />
          <label :for="'inputCheck' + index">{{ item.itemName }}</label>
        </div>
      </div>
      <div v-else>
        <select class="custom-select">
          <option v-for="(item, index) in items" :key="index">{{
            item.itemName
          }}</option>
        </select>
      </div>
    </div>
    <hr />
    <div class="question-footer">
      <div v-if="Boolean(required)" class="required-text">*Required</div>
      <button
        class="btn btn-danger"
        :data-question-id="order"
        @click="deleteQuestion(order)"
      >
        Delete
      </button>
      <button
        class="btn btn-secondary"
        :data-question-id="order"
        @click="editQuestion()"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  // props: ["question", "type", "required", "items", "order"],
  props: ["order"],
  computed: {
    questionObj() {
      return this.$store.getters.getQuestionFromOrder(this.order);
    },
    question() {
      return this.questionObj.question;
    },
    type() {
      return this.questionObj.type;
    },
    required() {
      return this.questionObj.required;
    },
    items() {
      return this.questionObj.listItems;
    }
  },
  methods: {
    deleteQuestion(order) {
      this.$store.commit("deleteQuestion", order);
    },
    editQuestion() {
      let questionObj = {
        question: this.question,
        type: this.type,
        required: this.required,
        items: this.items,
        order: this.order
      };
      if (this.items && this.items.length > 0) {
        this.$store.commit("setItems", this.items);
      }
      this.$store.commit("tmpQuestion/setObj", questionObj);
      this.$emit("editQuestion", questionObj);
    }
  }
};
</script>
