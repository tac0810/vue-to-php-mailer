import FormElement from "js/vue/form/utils/FormElement";
import Validator from "js/vue/form/utils/Validator";
import { forms } from "~/public/api/mail/_inc_/config.mail.json";

export default forms.map(form => {
  if (form?.validation) {
    form.validation = Validator[(form?.validation)];
  }

  return new FormElement(form);
});
