<template>
<q-page class="column flex-center">
  <q-icon name="mood" color="info" size="6rem" />
  <div class="text-h4 q-mb-md">
    Opps..., no resume yet!
  </div>
  <q-btn no-caps color="primary" icon-right="start" label="Start building your resume" @click="start" />
</q-page>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useResumeStore} from "stores/resume";
import {useUserStore} from "stores/user";

export default {
  name: "BuildingResume",
  computed: {
    ...mapStores(useResumeStore, useUserStore),
  },
  methods: {
    start() {
      console.log("is start() called")
      this.resumeStore.adding.resume = true;
      this.resumeStore.intro.fullName = this.userStore.userDetails.full_name;
      this.resumeStore.intro.phoneNumber = this.userStore.userDetails.phone_number;
      this.$router.push("resume");
    }
  }
}
</script>

<style scoped>

</style>
