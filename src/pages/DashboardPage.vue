<template>
  <q-page padding class="column items-center">
    <div style="width: 80%" class="column q-gutter-y-lg">
      <job-item v-for="i in 10" :key="i"/>
    </div>
  </q-page>
</template>

<script>
import JobItem from 'components/dashboard/JobItem';
export default {
  name: 'DashboardPage',
  components: { JobItem },
};
</script>

<style scoped></style>
