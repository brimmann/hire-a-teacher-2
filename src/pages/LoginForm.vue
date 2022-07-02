<template>
  <q-page padding class="row flex-center">
    <q-card flat bordered class="my-card" :class="{ 'q-pa-lg': $q.screen.sm }">
      <q-card-section>
        <div class="text-body1 text-center">
          Please enter your login information
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent.stop="login" class="column q-col-gutter-md">
          <q-input
            outlined
            v-model="email"
            label="Email Address"
            maxlength="500"
            style="width: 300px"
            :rules="requiredRules"
          />
          <q-input
            outlined
            v-model="password"
            label="Password"
            type="password"
            :rules="requiredRules"
          />
          <q-btn
            flat
            dense
            color="secondary"
            label="Forgot password?"
            class="self-end"
            padding="xs"
          />
          <div class="text-center">
            <q-btn-toggle
              v-model="loginMode"
              class="my-custom-toggle q-mb-sm"
              no-caps
              rounded
              unelevated
              spread
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Teacher', value: 'teacher' },
                { label: 'Organization', value: 'org' },
              ]"
            />
          </div>
          <div>
            <q-btn
              unelevated
              color="primary"
              label="Login"
              type="submit"
              style="width: 100%"
              @click="login"
              :loading="loggingIn"

            >
              <template v-slot:loading>
                <q-spinner-bars class="on-left" />
                Logging in...
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapStores } from "pinia/dist/pinia.esm-browser";
import { useUserStore } from "stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      loginMode: "teacher",
      email: "",
      password: "",
      requiredRules: [(val) => !!val || "Field is required"],
      loggingIn: false,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async login() {
      this.loggingIn = true;
      await this.userStore.login({
        email: this.email,
        password: this.password,
        type: this.loginMode,
      });
      this.loggingIn = false;
      this.$router.push("/teacher");
    },
  },
};
</script>

<style scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
