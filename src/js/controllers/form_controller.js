import Controller from "./_controller";
import Vue from "vue";
import Form from "@/form/Form.vue";

export default class extends Controller {
  connect() {
    new Vue({
      el: "#vue-form",
      components: { Form },
      template: "<Form/>"
    });
  }
}
