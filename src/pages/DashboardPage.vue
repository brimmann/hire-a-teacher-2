<template>
  <waiting-page v-if="orgStore.determiners.jobsLoading">Loading dashboard jobs, please wait...</waiting-page>
  <q-page padding class="column items-center" v-else>
    <div class="column flex-center" style="margin: auto auto;" v-if="orgStore.jobs.length < 1 && orgStore.determiners.dashboardState !== 'adding'">
      <q-icon name="check" size="4em" color="grey"/>
      <div class="text-h4 text-grey">No trending jobs</div>
    </div>
    <div style="width: 70%" class="column q-gutter-y-lg" v-if="orgStore.determiners.dashboardState === 'jobs-list'">
      <job-item v-for="(job, index) in orgStore.jobs" :key="index" :job="job" @delete-job="deleteJob(index)" @edit="editingJob(index)"/>
    </div>
    <div style="width: 70%;" v-else-if="orgStore.determiners.dashboardState === 'adding'" class="max-width">
      <adding-job/>
    </div>
    <div style="width: 70%;" v-else-if="orgStore.determiners.dashboardState === 'editing'" class="max-width">
      <editing-job :job-index="editingJobIndex"/>
    </div>
  </q-page>
</template>

<script>
import JobItem from 'components/dashboard/JobItem';
import {useOrgStore} from "stores/org";
import {mapStores} from "pinia";
import AddingJob from "pages/AddingJob";
import EditingJob from "pages/EditingJob";
import WaitingPage from "pages/WaitingPage";
export default {
  name: 'DashboardPage',
  components: {WaitingPage, EditingJob, AddingJob, JobItem },
  computed: {
    ...mapStores(useOrgStore)
  },
  data() {
    return {
      editingJobIndex: null
    }
  },
  methods: {
    editingJob(index) {
      this.editingJobIndex = index;
      this.orgStore.determiners.dashboardState = 'editing';
    },
    async deleteJob(index) {
      try {
        await this.orgStore.deleteJob(index);
      } catch (e) {
        console.log('delete-error', e.message);
      }
      this.orgStore.jobs.splice(index, 1);
    }
  },
  created() {
    this.orgStore.loadJobs(false);
  },
};
</script>

<style scoped></style>
