<template>

  <div
    class="column q-gutter-y-lg items-center"
    style="max-width: 1000px"
    :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }"
  >
    <single-job-item-org :job="orgStore.jobBasedApplication.job"/>
    <div class="text-subtitle1 self-start">Applications submitted for this job</div>
    <q-separator spaced class="full-width"/>
    <div class="full-width q-gutter-md q-mt-sm">
      <job-based-view-app-item v-for="(app, index) in orgStore.jobBasedApplication.apps" :application="app" :key="index" @resume="reviewResume(app)"/>
    </div>
  </div>

</template>

<script>
import SingleJobItemOrg from "components/job-applications/SingleJobItemOrg";
import JobBasedViewAppItem from "components/job-applications/JobBasedViewAppItem";
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
export default {
  name: "JobBasedOrgAppsView",
  components: {JobBasedViewAppItem, SingleJobItemOrg},
  emits: ['resume'],
  computed: {
    ...mapStores(useOrgStore)
  },
  methods: {
    reviewResume(app) {
      this.orgStore.viewingJob = this.orgStore.jobBasedApplication.job;
      this.$emit('resume', app.teacher)
    }
  }
}
</script>

<style scoped>

</style>
