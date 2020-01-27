<template>
  <div class="modal" tabindex="-1" role="dialog" id="createListQuestionModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create List Question</h5>
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
              id="listQuestionInput"
              placeholder="Enter your question"
            />
          </div>
          <div class="form-group">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                id="listQuestionRequired"
                type="checkbox"
                v-model="required"
              />
              <label for="listQuestionRequired" class="form-check-label"
                >Required ?
              </label>
            </div>
          </div>
          <div class="form-group">
            <div
              class="form-check form-check-inline"
              v-for="(type, index) in types"
              :key="index"
            >
              <input
                type="radio"
                name="listQuestionType"
                v-model="questionType"
                :value="type"
                checked
              />
              <label class="form-check-label">{{ type }}</label>
            </div>
          </div>
          <div class="options-field">
            <div class="option" v-for="(item, index) in items" :key="index">
              <input
                class="form-control-sm"
                type="text"
                :value="item.itemName"
                @input="editItem"
                :data-id="index"
              />
              <button class="btn btn-primary" @click="pushItem(index)">
                Add
              </button>
              <button class="btn btn-danger" @click="deleteItem(index)">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveQuestion()">
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

<style scoped>
div.option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
}
</style>

<script>
export default {
  data() {
    return {
      question: "",
      questionType: "",
      required: false,
      types: ["checkbox", "radio", "dropdown"]
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  created() {
    this.$store.commit("initItems");
  },
  methods: {
    editItem(e) {
      let payload = {
        itemName: e.target.value,
        index: e.target.dataset.id
      };
      this.$store.commit("editItems", payload);
    },
    pushItem(index) {
      let obj = {
        itemName: "New Option",
        order: ++index
      };
      this.$store.commit("pushItem", obj);
    },
    deleteItem(index) {
      this.$store.commit("deleteItemFromItems", index);
    },
    saveQuestion() {
      if (String(this.question) == "" || String(this.questionType) == "") {
        alert("Empty question or question type");
      } else {
        $("#createListQuestionModal").modal("hide");
        this.$store.commit("reorderItems");
        let questionObj = {
          question: this.question,
          required: this.required,
          type: this.questionType,
          items: this.$store.state.items
        };
        this.$store.commit("addQuestion", questionObj);
        this.$store.commit("initItems");
      }
    },
    clearModal() {
      this.question = "";
      this.questionType = "";
      this.required = false;
    }
  }
};
</script>
