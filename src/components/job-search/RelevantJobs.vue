<template>
  <q-page padding class="column items-center">
    <div style="width: 80%" class="column q-gutter-y-lg">
      <s-job-item v-for="(job, index) in teacherStore.relevantJobs" :job="job" :key="index"/>
    </div>
  </q-page>
</template>

<script>
import SJobItem from "components/job-search/SJobItem";
import {mapStores} from "pinia";
import {useTeacherStore} from "stores/teacher";
export default {
  name: 'RelevantJobs',
  components: {SJobItem},
  computed: {
    ...mapStores(useTeacherStore)
  },
  beforeMount() {
    this.teacherStore.getRelevantJobs();
  }
};
</script>

<style scoped></style>
