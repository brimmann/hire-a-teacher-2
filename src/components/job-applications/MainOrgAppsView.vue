<template>
  <q-page padding class="column items-center">
    <div
      class="text-subtitle1 text-grey-8 text-center"
      v-if="orgStore.applications.length < 1"
    >
      <span class="text-bold">No applications</span>
    </div>
    <div
      class="column q-gutter-y-lg items-center"
      style="max-width: 730px"
      :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }"
      v-else
    >
      <org-application-item
        v-for="(app, index) in orgStore.applications"
        :key="index"
        @resume="$emit('resume', app)"
        :app-data="app"
        @job-based="gotoJobBasedView"
      />
    </div>
  </q-page>
</template>

<script>
import OrgApplicationItem from 'components/job-applications/OrgApplicationItem';
import { mapStores } from 'pinia';
import { useOrgStore } from 'stores/org';
export default {
  name: 'MainOrgAppsView',
  components: { OrgApplicationItem },
  emits: ['resume', 'job-based'],
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    async gotoJobBasedView(job_id) {
      await this.orgStore.getOrgApplicationsJobBased(job_id);
      this.$emit('job-based');
    }
  },
  created() {
    this.orgStore.getOrgApplications();
  },
};
</script>

<style scoped></style>
