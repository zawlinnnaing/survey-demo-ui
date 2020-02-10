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
        <form @submit.prevent="generateLinks">
          <div class="modal-body">
            <div class="form-group">
              <label>Number of links to Generate</label>
              <input
                type="number"
                class="form-control"
                min="1"
                max="10000"
                v-model="count"
                required
              />
            </div>
          </div>
          <div class="links-section">
            <div
              class="link row"
              v-for="(link, index) in answerLinks"
              :key="index"
            >
              <div class="col-sm">
                <input
                  type="text"
                  :id="`link-select-${index}`"
                  :value="link.link"
                  class="form-control"
                />
              </div>
              <div class="col-sm">
                <font-awesome-icon
                  :icon="
                    link.answered ? ['fa', 'check'] : ['fa', 'times-circle']
                  "
                  :style="
                    link.answered ? { color: '#B2FF59' } : { color: '#F44336' }
                  "
                ></font-awesome-icon>
              </div>
              <div class="col-sm">
                <button
                  class="btn btn-secondary"
                  @click.prevent="copyLink(index)"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">
              Generate Links
            </button>
            <button
              type="button"
              class="btn btn-info"
              @click.prevent="showAnswerLinks"
            >
              Show Answer Links
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  text-align: left;
}
.link {
  margin: 2rem;
}
</style>

<script>
export default {
  props: ["formId"],
  data() {
    return {
      count: 1
    };
  },
  created() {
    console.log(this);
  },
  computed: {
    answerLinks() {
      return this.$store.state.form.answerLinks;
    }
  },
  methods: {
    async generateLinks() {
      let baseUrl = `${location.host}/show-form/${this.formId}/?token=`;
      try {
        await this.$store.dispatch("form/generateAnswerLinks", {
          formId: this.formId,
          count: this.count,
          baseUrl
        });
      } catch (e) {
        console.log(e);
      }
    },
    async showAnswerLinks() {
      let baseUrl = `${location.host}/show-form/${this.formId}/?token=`;
      try {
        await this.$store.dispatch("form/getAnswerLinks", {
          formId: this.formId,
          baseUrl
        });
      } catch (e) {
        this.$swal({
          icon: "error",
          text: "Get answer links failed."
        });
      }
    },
    copyLink(id) {
      let linkBox = document.getElementById("link-select-" + id);
      linkBox.select();
      linkBox.setSelectionRange(0, 9999999);
      document.execCommand("copy");
      this.$swal({
        icon: "success",
        text: "Copied to clipboard"
      });
    }
  }
};
</script>
