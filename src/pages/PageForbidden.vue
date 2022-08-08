<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <q-page class="column flex-center" padding>
        <q-icon name="lock" size="12em"/>
        <div class="text-h4 q-mb-md">Access denied</div>
        <q-btn v-if="userType === 'teacher'" to="/teacher" unelevated color="primary" label="Go to your panel"/>
        <q-btn v-if="userType === 'org'" to="/org" unelevated color="primary" label="Go to your panel"/>
        <template v-else>
          <q-btn class="q-my-md" to="/" unelevated color="primary" label="Return to home page"/>
          <div class="text-subtitle2 q-mb-sm">You are not authenticated</div>
          <div class="row q-gutter-md items-center">
            <q-btn outline to="/auth/login" unelevated color="primary" label="Login"/>
            <div class="text-body1">OR</div>
            <q-btn outline to="/auth/register" unelevated color="primary" label="Register"/>
          </div>
        </template>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "stores/user";

export default {
  name: "PageForbidden",
  computed: {
    ...mapState(useUserStore, ["userType"])
  }
}
</script>

<style scoped>

</style>
