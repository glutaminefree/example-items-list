<template>
  <div class="field">
    <label class="label" v-if="label.length > 0">{{ label }}</label>
    <div class="control has-icons-right">
      <input
        v-model="localValue"
        class="input"
        :type="passwordVisible ? 'text': 'password'"
        @input="updateValue"
      />
      <a
        class="switcher icon is-small is-right"
        href="#"
        @click.prevent="passwordVisible = !passwordVisible"
      >
        <i class="fas" :class="[passwordVisible ? 'fa-eye-slash' : 'fa-eye']"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordField',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
      passwordVisible: false,
    };
  },
  methods: {
    updateValue() {
      this.$emit('input', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.switcher {
  $this: &;

  .control.has-icons-right &.icon {
    pointer-events: visible;
  }
}
</style>
