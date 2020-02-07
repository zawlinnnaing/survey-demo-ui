<template>
  <div
    class="modal fade bd-example-modal-sm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="mySmallModalLabel"
    id="successModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  padding: 3rem;
  background-color: #56baed;
  color: #e0e0e0;
  font-size: 1.4rem;
}
</style>

<script>
export default {
  props: ["message"]
};
</script>
