<template>
  <div>
    <create-text-question></create-text-question>
    <create-list-question></create-list-question>
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
              data-target="#creatTextQuestionModal"
            >
              Create Text Questions
            </button>
            <hr />
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              data-target="#createListQuestionModal"
            >
              Create List Questions
            </button>
          </div>
        </div>
      </div>
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
export default {
  components: {
    CreateTextQuestion,
    CreateListQuestion
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    description() {
      return this.$store.state.description;
    }
  },
  methods: {
    updateTitle(e) {
      this.$store.commit("setTitle", e.target.value);
    }
  }
};
</script>
