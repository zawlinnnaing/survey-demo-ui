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
              :value="question"
              @input="setQuestion"
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
                :value="required"
                @change="setRequired"
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
                @change="setType"
                :value="type"
                v-bind="{ checked: questionType == type ? true : false }"
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
          <button
            type="button"
            v-show="!edited"
            class="btn btn-primary"
            @click="saveQuestion()"
          >
            Create question
          </button>
          <button
            v-show="edited"
            type="button"
            class="btn btn-primary"
            @click="updateQuestion"
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
  props: ["edited", "questionId"],
  data() {
    return {
      types: ["checkbox", "radio", "dropdown"]
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    question() {
      return this.$store.state.tmpQuestion.question;
    },
    questionType() {
      return this.$store.state.tmpQuestion.type;
    },
    required() {
      return this.$store.state.tmpQuestion.required;
    }
  },
  created() {
    this.$store.commit("initItems");
  },
  methods: {
    setQuestion(e) {
      this.$store.commit("tmpQuestion/setQuestion", e.target.value);
    },
    setRequired(e) {
      this.$store.commit("tmpQuestion/setRequired", e.target.value);
    },
    setType(e) {
      this.$store.commit("tmpQuestion/setType", e.target.value);
    },
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
          listItems: this.$store.state.items
        };
        console.log("from create list question", questionObj);
        this.$store.commit("addQuestion", questionObj);
        this.$store.commit("tmpQuestion/clear");
        this.$store.commit("initItems");
      }
    },
    updateQuestion() {
      if (String(this.question) == "" || String(this.questionType) == "") {
        alert("Empty question or question type");
      } else {
        this.$store.commit("reorderItems");
        let questionObj = {
          question: this.question,
          required: this.required,
          type: this.questionType,
          listItems: this.$store.state.items,
          order: this.questionId
        };
        console.log("from update list question", questionObj);
        $("#createListQuestionModal").modal("hide");
        this.$store.commit("editQuestion", questionObj);
        this.$store.commit("tmpQuestion/clear");
        this.$store.commit("initItems");
      }
    }
  }
};
</script>
