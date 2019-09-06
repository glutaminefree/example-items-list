import Schema from 'async-validator';

export default {
  data() {
    return {
      validator: null,
      formErrors: {},
      submitTriggered: false,

      ruMessages: {
        required: 'Поле %s обязательное',
        types: {
          string: '%s не является валидной строкой',
          email: 'Не валидный E-mail',
        },
      },
    };
  },
  computed: {
    showFormErrors() {
      return Object.keys(this.formErrors).length > 0;
    },
  },
  created() {
    this.initValidator();
  },
  methods: {
    initValidator() {
      if (this.validationRules) {
        this.validator = new Schema(this.validationRules);
        this.validator.messages(this.ruMessages);
      }
    },
    mayBeValidate() {
      if (this.submitTriggered) {
        this.validate();
      }
    },
    validate(goodCb = () => {}, badCb = () => {}) {
      this.submitTriggered = true;

      this.validator.validate(this.form, (errors) => {
        if (errors) {
          this.handleErrors(errors);
          badCb();
        } else {
          this.clearErrors();
          goodCb();
        }
      });
    },
    handleErrors(errors) {
      this.clearErrors();

      errors.forEach((error) => {
        const errorMessage = error.message.replace(
          error.field,
          `"${this.validationRules[error.field].name}"`
        );

        this.formErrors[error.field] = errorMessage;
      });
    },
    clearErrors() {
      this.formErrors = {};
    },
  },
};
