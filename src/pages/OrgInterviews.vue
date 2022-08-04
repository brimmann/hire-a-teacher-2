<template>
  <q-page padding class="column items-center" v-if="status === 'main'">
    <div
      class="text-subtitle1 text-grey-8 text-center"
      v-if="orgStore.interviews.length < 1"
    >
      <span class="text-bold">No interviews</span>
    </div>
    <div style="width: 80%; max-width: 800px" v-else>
      <interview-item-org
        class="q-mb-lg"
        v-for="(interview, index) in orgStore.interviews"
        :job="interview.job"
        :interview="interview.interview"
        :key="index"
        @view-resume="viewResume"
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
      <div class="text-body1 text-grey-7">Interview scheduled {{ viewingInterview.time }}</div>
    </div>
    <resume-public-view :resume-id="viewingInterview.teacher" />
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
      viewingInterview: null
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
    viewResume(interview) {
      this.viewingInterview = interview;
      this.status = "resume";
    }
  },
  created() {
    this.orgStore.getInterviews();
  },
};
</script>

<style scoped></style>
