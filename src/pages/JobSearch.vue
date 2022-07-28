<template>
  <relevant-jobs v-if="teacherStore.jobSearchStatus === 'rel'"/>
  <search-jobs v-else-if="teacherStore.jobSearchStatus === 'search'"/>
  <apply-for-job v-if="teacherStore.jobSearchStatus === 'applying'" :job="teacherStore.applyingJob.job" />
</template>

<script>
import RelevantJobs from "components/job-search/RelevantJobs";
import {mapStores} from "pinia";
import {useTeacherStore} from "stores/teacher";
import SearchJobs from "components/job-search/SearchJobs";
import ApplyForJob from "components/job-applications/ApplyForJob";
export default {
  name: "JobSearch",
  components: {ApplyForJob, SearchJobs, RelevantJobs},
  computed: {
    ...mapStores(useTeacherStore)
  }
}
</script>

<style scoped>

</style>
