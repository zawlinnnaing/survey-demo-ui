<template>
  <div class="forms">
    <success-modal :message="message"></success-modal>
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
              <font-awesome-icon icon="trash-alt"></font-awesome-icon>
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
  margin: 0rem;
}

tr :last-child a {
  margin: 0 2rem;
}
</style>

<script>
import axios from "../../modules/app-axios.js";
import SuccessModal from "./modals/successModal";
export default {
  components: {
    SuccessModal
  },
  data() {
    return {
      server_url: "",
      message: ""
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
      this.$swal({
        icon: "error",
        title: "Failed to fetch forms. "
      });
      return;
    }
  },
  methods: {
    async deleteForm(formId) {
      try {
        let { value } = await this.$swal({
          icon: "warning",
          title: "Are you sure ?",
          text: "You can't undo this.",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, Delete it!"
        });
        if (value) {
          await this.$store.dispatch("form/deleteForm", formId);
          this.$swal({
            icon: "success",
            title: "Form deleted successfully."
          });
        }
      } catch (e) {
        alert("Failed to delete form.");
        return;
      }
    }
  }
};
</script>
