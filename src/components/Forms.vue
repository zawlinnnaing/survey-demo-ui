<template>
  <div class="forms">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in forms" :key="form.id">
          <td>{{ form.title }}</td>
          <td>{{ form.description }}</td>
          <td>
            <router-link :to="{ name: 'ShowForm', params: { formId: form.id } }"
              >Form</router-link
            >
            <router-link
              :to="{ name: 'ShowChart', params: { formId: form.id } }"
              v-show="loggedIn"
              >Chart</router-link
            >
            <a
              class="badge badge-danger"
              href="#"
              @click.prevent="deleteForm(form.id)"
            >
              Delete
            </a>
            <a
              :href="server_url + '/charts/' + form.id"
              v-show="loggedIn"
              class="badge badge-primary"
              target="blank"
              >Download answers</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  color: #888 !important;
}

tr {
  margin: 2rem;
}

tr :last-child a {
  margin: 0 2rem;
}
</style>

<script>
import axios from "../../modules/app-axios.js";
export default {
  data() {
    return {
      server_url: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    forms() {
      return this.$store.state.form.forms;
    }
  },
  async created() {
    try {
      await this.$store.dispatch("form/fetchAllForms");
      this.server_url = process.env.VUE_APP_SERVER_URL;
    } catch (e) {
      alert("Failed to fetch forms");
      return;
    }
  },
  methods: {
    async deleteForm(formId) {
      try {
        await this.$store.dispatch("form/deleteForm", formId);
      } catch (e) {
        alert("Failed to delete form.");
        return;
      }
    }
  }
};
</script>
