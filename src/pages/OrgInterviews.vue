<template>
  <q-page padding class="column flex-center" v-if="status === 'main'">
    <div style="width: 80%; max-width: 800px">
      <interview-item-org
        class="q-mb-lg"
        :job="orgStore.offeringJob"
        v-for="i in 2"
        :key="i"
        @view-resume="status = 'resume'"
      />
    </div>
  </q-page>
  <q-page v-else padding class="column items-center">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn
        flat
        no-caps
        color="primary"
        icon="arrow_back"
        label="Return back"
        @click="status = 'main'"
      />
      <q-space />
      <div class="text-subtitle1 text-grey-7">Interview scheduled Tuesday, June 14, 2022 3:00 pm </div>
    </div>
    <resume-public-view :resume-id="2" />
    <q-page-sticky @click="scrollToTop" position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        padding="md"
        align="center"
        no-caps
        dense
        icon="keyboard_arrow_up"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useOrgStore } from 'stores/org';
import InterviewItemOrg from 'components/hiring/InterviewItemOrg';
import ResumePublicView from 'components/resume/ResumePublicView';

export default {
  name: 'JobOffersOrg',
  components: { ResumePublicView, InterviewItemOrg },
  data() {
    return {
      status: 'main',
    };
  },
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  }
};
</script>

<style scoped></style>
