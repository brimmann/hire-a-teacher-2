<template>
  <q-page padding class="column items-center" v-if="teacherStore.searchResultOrig.length > 0">
    <the-filters/>
    <q-separator spaced class="full-width" />
    <div
      :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }"
      class="column q-gutter-y-lg max-width q-mt-xs"
    >
      <div class="self-start text-subtitle1 text-grey-8" v-if="teacherStore.searchJobResult.length > 0">
        <span class="text-bold">Search result</span> - Jobs best match your query
      </div>
      <div class="self-start text-subtitle1 text-grey-8" v-else>No job found with current filter</div>
      <s-job-item v-for="(job, index) in teacherStore.searchJobResult" :job="job" :key="index" />
    </div>
  </q-page>
  <q-page padding class="column q-mt-lg items-center" v-else>
    <!--    <q-icon name="mood" color="info" size="6rem" />-->
    <div class="text-body1 q-mb-sm" style="max-width: 300px">
      Opps..., empty result try other keyword and places, make sure to use relevant words
    </div>
  </q-page>
</template>

<script>
import SJobItem from 'components/job-search/SJobItem';
import { mapStores } from 'pinia/dist/pinia';
import { useTeacherStore } from 'stores/teacher';
import TheFilters from "components/job-search/TheFilters";

export default {
  name: 'SearchJobs',
  components: {TheFilters, SJobItem },
  computed: {
    ...mapStores(useTeacherStore),
  },
};
</script>

<style scoped></style>
