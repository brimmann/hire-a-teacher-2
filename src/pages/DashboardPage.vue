<template>
  <q-page padding class="column items-center">
    <div style="width: 80%" class="column q-gutter-y-lg" v-if="orgStore.determiners.dashboardState === 'jobs-list'">
      <job-item v-for="(job, index) in orgStore.jobs" :key="index" :job="job" @edit="editingJob(index)"/>
    </div>
    <div style="width: 80%;" v-else-if="orgStore.determiners.dashboardState === 'adding'" class="max-width">
      <adding-job/>
    </div>
    <div style="width: 80%;" v-else-if="orgStore.determiners.dashboardState === 'editing'" class="max-width">
      <editing-job :job-id="editingJobId"/>
    </div>
  </q-page>
</template>

<script>
import JobItem from 'components/dashboard/JobItem';
import {useOrgStore} from "stores/org";
import {mapStores} from "pinia";
import AddingJob from "pages/AddingJob";
import EditingJob from "pages/EditingJob";
export default {
  name: 'DashboardPage',
  components: {EditingJob, AddingJob, JobItem },
  computed: {
    ...mapStores(useOrgStore)
  },
  data() {
    return {
      editingJobId: null
    }
  },
  methods: {
    editingJob(index) {
      this.editingJobId = index;
      this.orgStore.determiners.dashboardState = 'editing';
    }
  }
};
</script>

<style scoped></style>
