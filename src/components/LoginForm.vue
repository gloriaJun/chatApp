<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      name="login"
      label="Username"
      placeholder="Input Username"
      solo
      required
    ></v-text-field>

    <v-btn
      type="submit"
      :disabled="!valid"
      color="primary"
      block
      large
    >
      Connect
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'LoginForm',
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
        this.$emit('connect', this.username);
      }
    },
  },
};
</script>

<style>

</style>
