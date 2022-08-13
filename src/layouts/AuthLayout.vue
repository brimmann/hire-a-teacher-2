<template>
  <q-layout view="hHh Lpr lfr">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar class="text-white">
        <q-img src="../assets/logo-3.png" width="150px" height="30px" class="cursor-pointer" @click="$router.push('/')"/>
        <q-space />
        <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="yellow"
          :options="options"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      model: "one",
      options: [
        { label: "Login", value: "login" },
        { label: "Register", value: "register" },
      ],
    };
  },
  watch: {
    model(newValue) {
      switch (newValue) {
        case "login":
          this.$router.push("login");
          break;
        case "register":
          this.$router.push("register");
          break;
      }
    },
  },
};
</script>

<style scoped></style>
