<template>
  <div id="vue-form">
    <transition name="fade">
      <form
        v-if="'input' === mode"
        :key="'input'"
        id="form-input"
        @submit.prevent="confirm"
      >
        <table class="table-group white">
          <tr
            class="table-list"
            v-for="(form, index) in formList"
            :key="`${mode}-${form.key}`"
          >
            <th>
              {{ form.label }}
              <span class="form-require-label" v-if="form.require">※</span>
            </th>
            <td>
              <CustomInput
                :formElement="form"
                v-model="formValues[index]"
                :ref="`CustomInput-${form.key}`"
              />
            </td>
          </tr>
        </table>

        <button
          type="submit"
          class="btn btn-more r-fonts white rect has-border"
        >
          <span>SUBMIT - NEXT STEP</span>
        </button>
      </form>

      <form
        v-if="'confirm' === mode"
        :key="'confirm'"
        id="form-confirm"
        @submit.prevent="send"
      >
        <table class="table-group white">
          <tr
            class="table-list"
            v-for="formValue in formValues"
            :key="formValue.key"
          >
            <th>{{ formValue.label }}</th>
            <td>
              <pre>{{ formValue.value }}</pre>
            </td>
          </tr>
        </table>

        <button
          type="submit"
          class="btn btn-more r-fonts white rect has-border has-arrow"
        >
          <span>SUBMIT - NEXT STEP</span>
        </button>

        <button
          type="button"
          @click="back"
          class="btn btn-more r-fonts white rect has-border back"
        >
          <span>BACK</span>
        </button>
      </form>

      <div v-if="'complete' === mode" :key="'complete'" id="form-complete">
        <div class="block-body">
          <p>THANK YOU FOR YOUR MESSAGE</p>
        </div>
        <footer class="block-foot">
          <a href="/"><span>BACK</span></a>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
import "url-search-params-polyfill";
import axios from "axios";
import CustomInput from "js/vue/form/components/CustomInput.vue";
import config from "js/vue/form/config";

export default {
  name: "Form",
  created() {
    this.formList = config;
    this.formValues = config.map(list => ({
      label: list.label,
      value: "",
      key: list.key,
      require: list.require,
      isValid: !list.require
    }));
  },
  methods: {
    confirm() {
      this.validAll = true;
      const customInputs = Object.keys(this.$refs).filter(v =>
        /^CustomInput/.test(v)
      );
      customInputs.forEach((CustomInput, index) => {
        if (this.formValues[index].require || this.formValues[index].value) {
          this.$refs[CustomInput][0].checkTheValue(
            this.formValues[index].value
          );
        }
        this.validAll = this.formValues[index].isValid;
      });
      if (this.validAll) {
        this.mode = "confirm";
      }
    },
    back() {
      this.mode = "input";
    },
    send() {
      // search mail address
      const mailAddress = this.formValues.find(
        formValue => "mail" === formValue.key
      );
      const data = new URLSearchParams();
      const token = document.getElementById("csrf-token").value;

      axios.defaults.headers["X-CSRF-TOKEN"] = token;

      data.append("csrf_token", token);
      data.append("mail", mailAddress.value);
      data.append("body", JSON.stringify(this.formValues));

      axios({
        method: "post",
        url: "/api/mail/send.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data
      })
        .then(() => {
          this.mode = "complete";
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  data() {
    return {
      formList: [],
      formValues: [],
      validAll: true,
      mode: "input"
    };
  },
  components: {
    CustomInput
  }
};
</script>
