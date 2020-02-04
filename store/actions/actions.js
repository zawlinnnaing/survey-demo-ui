import axios from "../../modules/app-axios";

export default {
  async submitForm(context) {
    try {
      if (
        context.state.title == undefined ||
        String(context.state.title) == ""
      ) {
        throw new Error("Empty Form title");
      }
      context.commit("reorderQuestions");

      let url = "/forms";
      let data = {
        title: context.state.title,
        description: context.state.description,
        questions: context.state.questions
      };
      await axios.post(url, { data });
    } catch (e) {
      throw e;
    }
  }
};
