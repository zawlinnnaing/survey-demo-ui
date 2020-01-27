<template>
  <div class="individual-question card">
    <div class="question-header">
      <h4>{{ question }}</h4>
    </div>
    <div class="question-body">
      <div class="form-group" v-if="type != 'dropdown'">
        <div
          class="form-check form-check-inline"
          v-for="item in items"
          :key="item.id"
        >
          <input
            :type="type"
            class="form-check-input"
            :name="`question${id}List`"
            v-model="answer"
            :value="item.itemName"
          />
          <label class="form-check-label">{{ item.itemName }}</label>
        </div>
      </div>
      <div class="form-group" v-else>
        <select v-model="answer" v-for="item in items" :key="item.id">
          <option :value="item.itemName">{{ item.itemName }}</option>
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
export default {
  props: ["question", "type", "isRequired", "id", "items"],
  data() {
    return {
      answer: ""
    };
  }
};
</script>
