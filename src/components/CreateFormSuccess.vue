<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">{{ $route.params.message }}</h1>
    </div>
  </div>
</template>

<style scoped>
div.jumbotron {
  background-color: #69f0ae;
}
h1 {
  color: whitesmoke;
}
</style>

<script>
export default {};
</script>
