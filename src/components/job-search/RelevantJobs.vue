<template>
  <q-page padding class="column items-center">
    <div :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }" class="column q-gutter-y-lg max-width">
      <div class="self-start text-subtitle1 text-grey-8">Jobs best match your resume</div>
      <s-job-item v-for="(job, index) in teacherStore.relevantJobs" :job="job" :key="index" />
    </div>
  </q-page>
</template>

<script>
import SJobItem from 'components/job-search/SJobItem';
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';
export default {
  name: 'RelevantJobs',
  components: { SJobItem },
  computed: {
    ...mapStores(useTeacherStore),
  },
  beforeMount() {
    this.teacherStore.getRelevantJobs();
  },
};
</script>

<style scoped>
</style>
