<template>
  <relevant-jobs v-if="teacherStore.jobSearchStatus === 'rel'"/>
  <search-jobs v-else-if="teacherStore.jobSearchStatus === 'search'"/>
</template>

<script>
import RelevantJobs from "components/job-search/RelevantJobs";
import {mapStores} from "pinia";
import {useTeacherStore} from "stores/teacher";
import SearchJobs from "components/job-search/SearchJobs";
export default {
  name: "JobSearch",
  components: {SearchJobs, RelevantJobs},
  computed: {
    ...mapStores(useTeacherStore)
  }
}
</script>

<style scoped>

</style>
