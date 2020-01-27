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
              :value="question"
              class="form-control"
              id="textQuestionInput"
              required
              placeholder="Enter your question"
            />
          </div>
          <div class="form-group">
              
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
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
export default {
  data() {
    return {
      question: ""
    };
  },
  methods: {}
};
</script>
