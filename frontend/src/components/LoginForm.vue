<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      name="login"
      label="Username"
      placeholder="example"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="primary"
      block
      @click="submit"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: '',
    usernameRules: [
      v => !!v || 'username is required',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit-login', { username: this.username });
      }
    },
  },
};
</script>

<style>

</style>
