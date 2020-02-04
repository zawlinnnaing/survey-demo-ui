<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <ul class="list-group">
        <li
          class="list-group-item list-group-danger"
          v-for="(message, index) in messages"
          :key="index"
        >
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  computed() {
    return {
      messages() {
        return this.$store.state.error.messages;
      }
    };
  }
};
</script>
