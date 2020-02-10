<template>
  <div class="modal" tabindex="-1" role="dialog" id="generateLinkModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Generate Links for form</h5>
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
            <input type="number" class="form-control" min="1" max="1000" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Generate Links</button>
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
  props: ["formId"]
};
</script>
