<template>
  <b-form-group
    :id="`form_${input_infor.name}_group`"
    :label="input_infor.label"
    :label-for="input_infor.name"
  >
    <b-form-input
      :id="input_infor.name"
      :name="input_infor.name"
      :aria-describedby="`${input_infor.name}-live-feedback`"
      v-model="$v[input_infor.own][input_infor.name].$model"
      :state="validateState(`${input_infor.name}`)"
      :disabled="disabled"
    ></b-form-input>
    <b-form-invalid-feedback :id="`${input_infor.name}-live-feedback`">{{
      input_infor.feedback
    }}</b-form-invalid-feedback>
  </b-form-group>
</template>
<script>
export default {
  name: "InputComponent",
  inject: ["$v"],
  props: {
    input_infor: {
      name: String,
      label: String,
      own:String,
      feedback: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods:{
    validateState(name) {
      const { $dirty, $error } = this.$v[this.input_infor.own][name];
      return $dirty ? !$error : null;
    },
  }
};
</script>